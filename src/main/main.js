const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const {
  app,
  BrowserWindow,
  dialog,
  globalShortcut,
  ipcMain,
  Menu,
  Notification,
  screen,
  shell,
  Tray,
  nativeImage
} = require('electron');
const { AppStore, normalizeCategory, normalizeSettings, normalizeTask } = require('./store');

const APP_NAME = 'Velvet';
const WINDOWS_APP_USER_MODEL_ID = 'com.velvet.desktop';
const ICON_FILE = 'velvet_tasks_icon.ico';
const DEV_ICON_PATH = path.join(__dirname, '..', '..', 'build', 'icons', ICON_FILE);
const ROOT_ICON_PATH = path.join(__dirname, '..', '..', ICON_FILE);
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.svg', '.ico']);
const QUICK_ADD_SHORTCUT_ACCELERATOR_MAP = Object.freeze({
  'Ctrl+Alt+V': 'CommandOrControl+Alt+V',
  'Ctrl+Shift+Space': 'CommandOrControl+Shift+Space',
  'Ctrl+Shift+K': 'CommandOrControl+Shift+K',
  'Ctrl+K': 'CommandOrControl+K',
  'Alt+Space': 'Alt+Space'
});
const DEFAULT_QUICK_ADD_SHORTCUT = 'Ctrl+Alt+V';
const QUICK_ADD_WINDOW_WIDTH = 780;
const QUICK_ADD_WINDOW_HEIGHT = 340;
const PRIORITY_SET = new Set(['low', 'medium', 'high', 'urgent']);
const WEEKDAY_INDEX = {
  sunday: 0,
  sun: 0,
  monday: 1,
  mon: 1,
  tuesday: 2,
  tue: 2,
  wednesday: 3,
  wed: 3,
  thursday: 4,
  thu: 4,
  friday: 5,
  fri: 5,
  saturday: 6,
  sat: 6
};

let mainWindow = null;
let quickAddWindow = null;
let quickAddWindowReady = false;
let quickAddRendererReady = false;
let pendingQuickAddShow = false;
let appStore = null;
let tray = null;
let reminderTimer = null;
let isQuitting = false;
let currentGlobalQuickAddAccelerator = '';
let currentGlobalQuickAddShortcutSetting = '';
let hasShownCloseToTrayNotice = false;
let hasAttemptedShortcutRegistration = false;
let shortcutRegistrationStatus = {
  requested: DEFAULT_QUICK_ADD_SHORTCUT,
  active: '',
  registered: false,
  error: ''
};

function getIconPathCandidates() {
  return [
    app.isPackaged ? path.join(process.resourcesPath, 'icons', ICON_FILE) : '',
    DEV_ICON_PATH,
    ROOT_ICON_PATH
  ].filter(Boolean);
}

function resolveIconPath() {
  return getIconPathCandidates().find((candidate) => fs.existsSync(candidate));
}

function normalizeWhitespace(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function normalizeQuickAddShortcutSetting(rawShortcut) {
  const safe = String(rawShortcut || '').trim();
  return QUICK_ADD_SHORTCUT_ACCELERATOR_MAP[safe] ? safe : DEFAULT_QUICK_ADD_SHORTCUT;
}

function getShortcutAcceleratorFromSetting(shortcutSetting) {
  return QUICK_ADD_SHORTCUT_ACCELERATOR_MAP[normalizeQuickAddShortcutSetting(shortcutSetting)];
}

function toDateKey(dateObject) {
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');
  return `${dateObject.getFullYear()}-${month}-${day}`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function parseDetectedDateToken(lineLower) {
  const explicitDateMatch = lineLower.match(/\b(\d{4}-\d{2}-\d{2})\b/);
  if (explicitDateMatch) {
    return {
      dueDate: explicitDateMatch[1],
      token: explicitDateMatch[0]
    };
  }

  if (lineLower.includes('tomorrow')) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return { dueDate: toDateKey(tomorrow), token: 'tomorrow' };
  }

  if (lineLower.includes('today')) {
    return { dueDate: toDateKey(new Date()), token: 'today' };
  }

  const weekdayEntries = Object.keys(WEEKDAY_INDEX).sort((left, right) => right.length - left.length);
  for (const weekday of weekdayEntries) {
    const regex = new RegExp(`\\b${weekday}\\b`, 'i');
    if (!regex.test(lineLower)) {
      continue;
    }
    const now = new Date();
    const target = WEEKDAY_INDEX[weekday];
    let diff = target - now.getDay();
    if (diff < 0) diff += 7;
    const detected = new Date(now);
    detected.setDate(now.getDate() + diff);
    return { dueDate: toDateKey(detected), token: weekday };
  }

  return { dueDate: '', token: '' };
}

function parseDetectedTimeToken(lineLower) {
  const twentyFourHour = lineLower.match(/\b([01]?\d|2[0-3]):([0-5]\d)\b/);
  if (twentyFourHour) {
    const hour = String(twentyFourHour[1]).padStart(2, '0');
    const minute = String(twentyFourHour[2]).padStart(2, '0');
    return {
      dueTime: `${hour}:${minute}`,
      token: twentyFourHour[0]
    };
  }

  const amPm = lineLower.match(/\b(1[0-2]|0?[1-9])(?::([0-5]\d))?\s?(am|pm)\b/i);
  if (!amPm) {
    return { dueTime: '', token: '' };
  }
  const rawHour = Number(amPm[1]);
  const minute = Number(amPm[2] || '0');
  const meridiem = amPm[3].toLowerCase();
  const hour24 = meridiem === 'pm' ? (rawHour % 12) + 12 : rawHour % 12;
  return {
    dueTime: `${String(hour24).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    token: amPm[0]
  };
}

function parseQuickAddLine(line, currentState) {
  const raw = normalizeWhitespace(line);
  if (!raw) {
    return null;
  }

  let workingTitle = ` ${raw} `;
  const tags = [...raw.matchAll(/(^|\s)#([a-z0-9_-]{1,32})/gi)].map((entry) => entry[2]);
  for (const tag of tags) {
    const regex = new RegExp(`(^|\\s)#${tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=\\s|$)`, 'i');
    workingTitle = workingTitle.replace(regex, ' ');
  }

  const lower = raw.toLowerCase();
  const priorityMatches = [...lower.matchAll(/\b(urgent|high|medium|low)\b/g)];
  const priority = priorityMatches.at(-1)?.[1] || 'medium';
  if (priorityMatches.length) {
    workingTitle = workingTitle.replace(new RegExp(`\\b${priority}\\b`, 'i'), ' ');
  }

  const { dueDate, token: dateToken } = parseDetectedDateToken(lower);
  if (dateToken) {
    workingTitle = workingTitle.replace(new RegExp(`\\b${dateToken}\\b`, 'i'), ' ');
  }

  const { dueTime, token: timeToken } = parseDetectedTimeToken(lower);
  if (timeToken) {
    workingTitle = workingTitle.replace(new RegExp(`\\b${timeToken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'), ' ');
  }

  let categoryId = '';
  const categories = Array.isArray(currentState?.categories) ? currentState.categories : [];
  const sortedCategories = [...categories].sort((left, right) => right.name.length - left.name.length);
  for (const category of sortedCategories) {
    const escapedName = category.name
      .trim()
      .split(/\s+/)
      .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('\\s+');
    const regex = new RegExp(`\\b${escapedName}\\b`, 'i');
    if (!regex.test(workingTitle)) {
      continue;
    }
    categoryId = category.id;
    workingTitle = workingTitle.replace(regex, ' ');
    break;
  }

  const title = normalizeWhitespace(workingTitle).slice(0, 120) || raw.slice(0, 120);
  const finalDueDate = dueDate || (dueTime ? toDateKey(new Date()) : '');

  return {
    title,
    dueDate: finalDueDate,
    dueTime,
    priority: PRIORITY_SET.has(priority) ? priority : 'medium',
    status: 'normal',
    categoryId,
    reminderEnabled: false,
    reminderAt: '',
    notes: '',
    tags: [...new Set(tags)].slice(0, 12),
    attachments: []
  };
}

function createTaskFromQuickAddLine(line) {
  const currentState = readState();
  const parsed = parseQuickAddLine(line, currentState);
  if (!parsed || !parsed.title) {
    return { ok: false, error: 'Unable to parse Quick Add input.' };
  }

  const task = buildTaskPayload(parsed, currentState);
  currentState.tasks.unshift(task);
  const savedState = writeState(currentState);

  return {
    ok: true,
    taskId: task.id,
    parsed,
    state: savedState
  };
}

function readState() {
  return appStore.readState();
}

function emitToWindow(windowRef, channel, payload) {
  if (!windowRef || windowRef.isDestroyed()) {
    return;
  }
  windowRef.webContents.send(channel, payload);
}

function getShortcutRegistrationStatus() {
  return { ...shortcutRegistrationStatus };
}

function buildQuickAddContext(currentState = readState()) {
  return {
    categories: (currentState.categories || []).map((category) => ({
      id: category.id,
      name: category.name,
      color: category.color
    })),
    settings: currentState.settings || {},
    shortcut: getShortcutRegistrationStatus()
  };
}

function broadcastShortcutStatus() {
  const status = getShortcutRegistrationStatus();
  emitToWindow(mainWindow, 'quick-add:shortcut-status', status);
  emitToWindow(quickAddWindow, 'quick-add:shortcut-status', status);
}

function broadcastState(savedState) {
  emitToWindow(mainWindow, 'state:changed', savedState);
  emitToWindow(quickAddWindow, 'quick-add:context', buildQuickAddContext(savedState));
}

function registerGlobalQuickAddShortcut(shortcutSetting, options = {}) {
  const allowFallback = options.allowFallback !== false;
  const forceRetry = options.forceRetry === true;
  const normalizedSetting = normalizeQuickAddShortcutSetting(shortcutSetting);
  if (
    hasAttemptedShortcutRegistration &&
    !forceRetry &&
    shortcutRegistrationStatus.requested === normalizedSetting
  ) {
    const activeAccelerator = shortcutRegistrationStatus.active
      ? getShortcutAcceleratorFromSetting(shortcutRegistrationStatus.active)
      : '';
    if (
      shortcutRegistrationStatus.registered &&
      activeAccelerator &&
      globalShortcut.isRegistered(activeAccelerator)
    ) {
      return getShortcutRegistrationStatus();
    }
    if (!shortcutRegistrationStatus.registered) {
      return getShortcutRegistrationStatus();
    }
  }

  if (
    currentGlobalQuickAddShortcutSetting === normalizedSetting &&
    currentGlobalQuickAddAccelerator &&
    globalShortcut.isRegistered(currentGlobalQuickAddAccelerator)
  ) {
    return getShortcutRegistrationStatus();
  }

  if (currentGlobalQuickAddAccelerator) {
    globalShortcut.unregister(currentGlobalQuickAddAccelerator);
    currentGlobalQuickAddAccelerator = '';
    currentGlobalQuickAddShortcutSetting = '';
  }

  const attemptAccelerator = getShortcutAcceleratorFromSetting(normalizedSetting);
  let registered = false;
  let activeSetting = normalizedSetting;
  let error = '';
  hasAttemptedShortcutRegistration = true;

  try {
    registered = globalShortcut.register(attemptAccelerator, () => {
      showQuickAddWindow();
    });
  } catch (registerError) {
    error = registerError?.message || 'Shortcut registration failed.';
    registered = false;
  }

  if (!registered && !error) {
    error = `Shortcut "${normalizedSetting}" could not be registered. It may be in use by another application.`;
  }
  // Fallback intentionally disabled: silently binding a different shortcut than
  // the user selected is confusing. Surface the error instead.
  void allowFallback;

  if (registered && !currentGlobalQuickAddAccelerator) {
    currentGlobalQuickAddAccelerator = getShortcutAcceleratorFromSetting(activeSetting);
    currentGlobalQuickAddShortcutSetting = activeSetting;
  }

  shortcutRegistrationStatus = {
    requested: normalizedSetting,
    active: registered ? activeSetting : '',
    registered,
    error: registered ? '' : error || `Shortcut "${normalizedSetting}" is unavailable.`
  };

  broadcastShortcutStatus();
  return getShortcutRegistrationStatus();
}

function syncRuntimeWithSettings(settings, options = {}) {
  syncTrayMode(settings);
  registerGlobalQuickAddShortcut(settings?.quickAddShortcut, options);
}

function writeState(nextState, options = {}) {
  const saved = appStore.writeState(nextState);
  syncRuntimeWithSettings(saved.settings, {
    allowFallback: options.allowFallback !== false,
    forceRetry: Boolean(options.forceShortcutRetry)
  });
  broadcastState(saved);
  return saved;
}

function migrateLegacyStateFile(targetUserDataPath) {
  const targetStatePath = path.join(targetUserDataPath, 'app-state.json');
  if (fs.existsSync(targetStatePath)) {
    return;
  }

  const appDataPath = app.getPath('appData');
  const legacyDirs = ['Velvet Tasks', 'velvet-tasks', 'VelvetTasks'];
  for (const folder of legacyDirs) {
    const sourcePath = path.join(appDataPath, folder, 'app-state.json');
    if (!fs.existsSync(sourcePath)) {
      continue;
    }

    fs.mkdirSync(targetUserDataPath, { recursive: true });
    fs.copyFileSync(sourcePath, targetStatePath);
    break;
  }
}

function showMainWindow() {
  if (!mainWindow) {
    createWindow();
    return;
  }

  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  }

  mainWindow.show();
  mainWindow.focus();
}

function positionQuickAddWindow(windowRef) {
  if (!windowRef || windowRef.isDestroyed()) {
    return;
  }
  const display = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
  const workArea = display.workArea;
  const bounds = windowRef.getBounds();
  const edgePadding = 8;
  const minX = workArea.x + edgePadding;
  const minY = workArea.y + edgePadding;
  const maxX = Math.max(minX, workArea.x + workArea.width - bounds.width - edgePadding);
  const maxY = Math.max(minY, workArea.y + workArea.height - bounds.height - edgePadding);
  const centeredX = workArea.x + (workArea.width - bounds.width) / 2;
  const centeredY = workArea.y + (workArea.height - bounds.height) / 2;
  const x = Math.round(clamp(centeredX, minX, maxX));
  const y = Math.round(clamp(centeredY, minY, maxY));
  windowRef.setPosition(x, y, false);
}

function hideQuickAddWindow() {
  if (!quickAddWindow || quickAddWindow.isDestroyed()) {
    return;
  }
  pendingQuickAddShow = false;
  quickAddWindow.hide();
  emitToWindow(quickAddWindow, 'quick-add:close', null);
}

function revealQuickAddWindow(windowRef) {
  if (!windowRef || windowRef.isDestroyed()) {
    return;
  }
  pendingQuickAddShow = false;
  positionQuickAddWindow(windowRef);
  emitToWindow(windowRef, 'quick-add:context', buildQuickAddContext());
  windowRef.show();
  windowRef.focus();
  emitToWindow(windowRef, 'quick-add:focus', null);
}

function createQuickAddWindow() {
  if (quickAddWindow && !quickAddWindow.isDestroyed()) {
    return quickAddWindow;
  }

  const iconPath = process.platform === 'win32' ? resolveIconPath() : undefined;
  quickAddWindowReady = false;
  quickAddRendererReady = false;
  pendingQuickAddShow = false;
  quickAddWindow = new BrowserWindow({
    width: QUICK_ADD_WINDOW_WIDTH,
    height: QUICK_ADD_WINDOW_HEIGHT,
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    show: false,
    frame: false,
    roundedCorners: true,
    skipTaskbar: true,
    alwaysOnTop: true,
    title: `${APP_NAME} Quick Add`,
    backgroundColor: '#00000000',
    transparent: true,
    hasShadow: false,
    ...(iconPath ? { icon: iconPath } : {}),
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload', 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  quickAddWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  quickAddWindow.setAlwaysOnTop(true, 'screen-saver');
  quickAddWindow.setMenuBarVisibility(false);
  quickAddWindow.on('blur', () => {
    if (!isQuitting) {
      hideQuickAddWindow();
    }
  });
  quickAddWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      hideQuickAddWindow();
    }
  });
  quickAddWindow.on('closed', () => {
    quickAddWindow = null;
    quickAddWindowReady = false;
    quickAddRendererReady = false;
    pendingQuickAddShow = false;
  });
  quickAddWindow.once('ready-to-show', () => {
    quickAddWindowReady = true;
    if (quickAddWindow && pendingQuickAddShow && quickAddRendererReady) {
      revealQuickAddWindow(quickAddWindow);
    }
  });
  quickAddWindow.webContents.on('did-finish-load', () => {
    emitToWindow(quickAddWindow, 'quick-add:context', buildQuickAddContext());
    emitToWindow(quickAddWindow, 'quick-add:shortcut-status', getShortcutRegistrationStatus());
    if (quickAddWindow && quickAddWindow.isVisible()) {
      emitToWindow(quickAddWindow, 'quick-add:focus', null);
    }
  });
  quickAddWindow.loadFile(path.join(__dirname, '..', 'renderer', 'quick-add.html'));

  return quickAddWindow;
}

function showQuickAddWindow() {
  const win = createQuickAddWindow();
  if (!win || win.isDestroyed()) {
    return;
  }
  pendingQuickAddShow = true;
  if (quickAddWindowReady && quickAddRendererReady) {
    revealQuickAddWindow(win);
  }
}

function toDateAtMidnight(dateValue) {
  if (!dateValue || !/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    return null;
  }
  const [year, month, day] = dateValue.split('-').map((value) => Number(value));
  return new Date(year, month - 1, day);
}

function isDateTodayOrFuture(dateValue) {
  const target = toDateAtMidnight(dateValue);
  if (!target) {
    return false;
  }
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return target >= today;
}

function getNextTaskOrder(tasks) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return 0;
  }
  return tasks.reduce((maxOrder, task) => {
    const value = Number.isFinite(Number(task.order)) ? Number(task.order) : maxOrder;
    return Math.max(maxOrder, value);
  }, 0) + 10;
}

function buildTaskPayload(input, currentState) {
  const categoryIds = new Set(currentState.categories.map((category) => category.id));
  const existingTask = currentState.tasks.find((task) => task.id === input.id);

  const normalizedTask = normalizeTask(
    {
      ...existingTask,
      ...input,
      id: existingTask?.id || crypto.randomUUID(),
      order: Number.isFinite(Number(input?.order))
        ? Number(input.order)
        : existingTask?.order ?? getNextTaskOrder(currentState.tasks),
      createdAt: existingTask?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    categoryIds
  );

  if (!normalizedTask) {
    throw new Error('Invalid task payload.');
  }

  if (
    existingTask &&
    existingTask.status === 'delayed' &&
    normalizedTask.status === 'delayed' &&
    existingTask.dueDate !== normalizedTask.dueDate &&
    normalizedTask.dueDate &&
    isDateTodayOrFuture(normalizedTask.dueDate)
  ) {
    normalizedTask.status = 'normal';
  }

  if (!normalizedTask.reminderEnabled) {
    normalizedTask.reminderAt = '';
    normalizedTask.reminderNotifiedAt = '';
  } else if (
    existingTask &&
    (existingTask.reminderAt !== normalizedTask.reminderAt || !existingTask.reminderEnabled)
  ) {
    normalizedTask.reminderNotifiedAt = '';
  }

  return normalizedTask;
}

function buildCategoryPayload(input) {
  const category = normalizeCategory(input);
  if (!category) {
    throw new Error('Invalid category payload.');
  }
  return category;
}

function getSettings() {
  return readState().settings;
}

function shouldTrayHandle(eventName) {
  const settings = getSettings();
  if (eventName === 'close') {
    return Boolean(settings.trayOnClose);
  }
  if (eventName === 'minimize') {
    return Boolean(settings.trayOnMinimize);
  }
  return false;
}

function maybeShowCloseToTrayNotice() {
  if (hasShownCloseToTrayNotice || !Notification.isSupported()) {
    return;
  }
  hasShownCloseToTrayNotice = true;
  const iconPath = resolveIconPath();
  const notice = new Notification({
    title: APP_NAME,
    body: 'Velvet is still running in the system tray. Use tray menu > Quit to exit.',
    ...(iconPath ? { icon: iconPath } : {})
  });
  notice.show();
}

function createTray() {
  if (tray) {
    return tray;
  }

  const iconPath = resolveIconPath();
  const trayImage = iconPath ? nativeImage.createFromPath(iconPath) : nativeImage.createEmpty();
  tray = new Tray(trayImage);
  tray.setToolTip(APP_NAME);
  tray.on('double-click', showMainWindow);
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Open Velvet',
        click: () => showMainWindow()
      },
      {
        label: 'Add Task',
        click: () => {
          showQuickAddWindow();
        }
      },
      { type: 'separator' },
      {
        label: 'Quit',
        click: () => {
          isQuitting = true;
          app.quit();
        }
      }
    ])
  );

  return tray;
}

function syncTrayMode(settings) {
  const trayEnabled = Boolean(settings?.trayOnClose || settings?.trayOnMinimize);
  if (trayEnabled) {
    createTray();
    return;
  }

  if (tray) {
    tray.destroy();
    tray = null;
  }
}

function createWindow() {
  const iconPath = process.platform === 'win32' ? resolveIconPath() : undefined;
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 960,
    minHeight: 620,
    backgroundColor: '#0b1220',
    title: APP_NAME,
    autoHideMenuBar: true,
    show: false,
    ...(iconPath ? { icon: iconPath } : {}),
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload', 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.on('close', (event) => {
    if (!isQuitting && shouldTrayHandle('close')) {
      event.preventDefault();
      createTray();
      mainWindow.hide();
      maybeShowCloseToTrayNotice();
    }
  });

  mainWindow.on('minimize', (event) => {
    if (shouldTrayHandle('minimize')) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    emitToWindow(mainWindow, 'quick-add:shortcut-status', getShortcutRegistrationStatus());
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
}

function toTaskDueLabel(task) {
  if (!task.dueDate) {
    return '';
  }
  return task.dueTime ? `Due ${task.dueDate} ${task.dueTime}` : `Due ${task.dueDate}`;
}

function parseReminderDate(value) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return parsed;
}

function shouldNotifyReminder(task, nowDate) {
  if (!task || !task.reminderEnabled || task.status === 'done' || !task.reminderAt) {
    return false;
  }

  const reminderDate = parseReminderDate(task.reminderAt);
  if (!reminderDate) {
    return false;
  }

  if (reminderDate > nowDate) {
    return false;
  }

  if (!task.reminderNotifiedAt) {
    return true;
  }

  const notifiedAt = new Date(task.reminderNotifiedAt);
  if (Number.isNaN(notifiedAt.getTime())) {
    return true;
  }

  return notifiedAt < reminderDate;
}

function sendReminderNotification(task) {
  if (!Notification.isSupported()) {
    return;
  }

  const iconPath = resolveIconPath();
  const notification = new Notification({
    title: `Reminder: ${task.title}`,
    body: toTaskDueLabel(task) || 'Task reminder',
    ...(iconPath ? { icon: iconPath } : {})
  });

  notification.on('click', () => {
    showMainWindow();
    if (mainWindow) {
      mainWindow.webContents.send('reminder:open-task', task.id);
    }
  });

  notification.show();
}

function runReminderSweep() {
  const state = readState();
  const now = new Date();
  let changed = false;

  for (const task of state.tasks) {
    if (!shouldNotifyReminder(task, now)) {
      continue;
    }
    sendReminderNotification(task);
    task.reminderNotifiedAt = new Date().toISOString();
    changed = true;
  }

  if (changed) {
    writeState(state);
  }
}

function startReminderTimer() {
  if (reminderTimer) {
    clearInterval(reminderTimer);
  }
  reminderTimer = setInterval(runReminderSweep, 30000);
  setTimeout(runReminderSweep, 2000);
}

function getMimeForPath(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const table = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.bmp': 'image/bmp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.zip': 'application/zip'
  };
  return table[ext] || 'application/octet-stream';
}

function registerIpcHandlers() {
  ipcMain.handle('app:bootstrap', () => {
    const state = readState();
    return {
      state,
      meta: {
        version: app.getVersion(),
        userDataPath: app.getPath('userData'),
        appName: APP_NAME,
        shortcutStatus: getShortcutRegistrationStatus()
      }
    };
  });

  ipcMain.handle('app:get-shortcut-status', () => getShortcutRegistrationStatus());
  ipcMain.handle('app:open-quick-add', () => {
    showQuickAddWindow();
    return { ok: true };
  });
  ipcMain.handle('quickAdd:get-context', () => buildQuickAddContext());
  ipcMain.handle('quickAdd:preview', (event, line) => {
    const state = readState();
    const parsed = parseQuickAddLine(line, state);
    return { ok: Boolean(parsed?.title), parsed: parsed || null };
  });
  ipcMain.handle('quickAdd:create', (event, line) => {
    const result = createTaskFromQuickAddLine(line);
    if (result.ok) {
      hideQuickAddWindow();
    }
    return result;
  });
  ipcMain.handle('quickAdd:close', () => {
    hideQuickAddWindow();
    return { ok: true };
  });
  ipcMain.on('quickAdd:renderer-ready', (event) => {
    if (!quickAddWindow || quickAddWindow.isDestroyed()) {
      return;
    }
    if (event.sender !== quickAddWindow.webContents) {
      return;
    }
    quickAddRendererReady = true;
    if (pendingQuickAddShow && quickAddWindowReady) {
      revealQuickAddWindow(quickAddWindow);
    }
  });

  ipcMain.handle('tasks:save', (event, payload) => {
    const state = readState();
    const task = buildTaskPayload(payload, state);
    const index = state.tasks.findIndex((item) => item.id === task.id);

    if (index === -1) {
      state.tasks.unshift(task);
    } else {
      state.tasks[index] = task;
    }

    return writeState(state);
  });

  ipcMain.handle('tasks:delete', (event, taskId) => {
    const state = readState();
    state.tasks = state.tasks.filter((task) => task.id !== taskId);
    return writeState(state);
  });

  ipcMain.handle('tasks:clear-done', () => {
    const state = readState();
    state.tasks = state.tasks.filter((task) => task.status !== 'done');
    return writeState(state);
  });

  ipcMain.handle('tasks:delete-many', (event, taskIds) => {
    const ids = new Set(Array.isArray(taskIds) ? taskIds : []);
    const state = readState();
    state.tasks = state.tasks.filter((task) => !ids.has(task.id));
    state.tasks = state.tasks
      .slice()
      .sort((left, right) => left.order - right.order)
      .map((task, index) => ({
        ...task,
        order: index * 10
      }));
    return writeState(state);
  });

  ipcMain.handle('tasks:reorder', (event, orderedTaskIds) => {
    const ids = Array.isArray(orderedTaskIds) ? orderedTaskIds : [];
    const state = readState();
    if (!ids.length) {
      return state;
    }

    const indexMap = new Map(ids.map((id, index) => [id, index]));
    state.tasks = state.tasks
      .slice()
      .sort((left, right) => {
        const leftIndex = indexMap.has(left.id) ? indexMap.get(left.id) : Number.MAX_SAFE_INTEGER;
        const rightIndex = indexMap.has(right.id) ? indexMap.get(right.id) : Number.MAX_SAFE_INTEGER;
        if (leftIndex !== rightIndex) {
          return leftIndex - rightIndex;
        }
        return left.order - right.order;
      })
      .map((task, index) => ({
        ...task,
        order: index * 10
      }));

    return writeState(state);
  });

  ipcMain.handle('tasks:bulk-status', (event, payload) => {
    const state = readState();
    const taskIds = new Set(Array.isArray(payload?.taskIds) ? payload.taskIds : []);
    const targetStatus = payload?.status;
    const nextState = { ...state, tasks: [] };

    nextState.tasks = state.tasks.map((task) => {
      if (!taskIds.has(task.id)) {
        return task;
      }
      return buildTaskPayload(
        {
          ...task,
          status: targetStatus
        },
        state
      );
    });

    return writeState(nextState);
  });

  ipcMain.handle('categories:save', (event, payload) => {
    const state = readState();
    const existing = state.categories.find((category) => category.id === payload.id);
    const category = buildCategoryPayload({
      ...existing,
      ...payload,
      id: existing?.id || crypto.randomUUID(),
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    const index = state.categories.findIndex((item) => item.id === category.id);

    if (index === -1) {
      state.categories.push(category);
    } else {
      state.categories[index] = category;
    }

    return writeState(state);
  });

  ipcMain.handle('categories:delete', (event, categoryId) => {
    const state = readState();
    state.categories = state.categories.filter((category) => category.id !== categoryId);
    state.tasks = state.tasks.map((task) =>
      task.categoryId === categoryId
        ? {
            ...task,
            categoryId: '',
            updatedAt: new Date().toISOString()
          }
        : task
    );
    return writeState(state);
  });

  ipcMain.handle('settings:update', (event, partialSettings) => {
    const state = readState();
    state.settings = normalizeSettings({
      ...state.settings,
      ...partialSettings
    });
    return writeState(state, { forceShortcutRetry: true });
  });

  ipcMain.handle('attachments:pick-file', async (event) => {
    const ownerWindow = BrowserWindow.fromWebContents(event.sender) || mainWindow || quickAddWindow;
    const dialogOptions = {
      properties: ['openFile']
    };
    const result = ownerWindow
      ? await dialog.showOpenDialog(ownerWindow, dialogOptions)
      : await dialog.showOpenDialog(dialogOptions);

    if (result.canceled || !result.filePaths.length) {
      return null;
    }

    const selectedPath = result.filePaths[0];
    let size = 0;
    try {
      size = fs.statSync(selectedPath).size;
    } catch (error) {
      size = 0;
    }

    const ext = path.extname(selectedPath).toLowerCase();
    const type = IMAGE_EXTENSIONS.has(ext) ? 'image' : 'file';
    return {
      id: `att-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      type,
      name: path.basename(selectedPath),
      path: selectedPath,
      url: '',
      mime: getMimeForPath(selectedPath),
      size,
      addedAt: new Date().toISOString()
    };
  });

  ipcMain.handle('attachments:open', async (event, attachment) => {
    if (!attachment || typeof attachment !== 'object') {
      return { ok: false, error: 'Invalid attachment.' };
    }

    if (attachment.type === 'url' && attachment.url) {
      await shell.openExternal(attachment.url);
      return { ok: true };
    }

    const filePath = attachment.path;
    if (!filePath || !fs.existsSync(filePath)) {
      return { ok: false, error: 'File not found.' };
    }

    const openError = await shell.openPath(filePath);
    return openError ? { ok: false, error: openError } : { ok: true };
  });

  ipcMain.handle('app:open-storage-folder', async () => {
    const folder = app.getPath('userData');
    const openError = await shell.openPath(folder);
    return openError ? { ok: false, error: openError } : { ok: true };
  });
}

app.whenReady().then(() => {
  app.setName(APP_NAME);

  if (process.platform === 'win32') {
    app.setAppUserModelId(WINDOWS_APP_USER_MODEL_ID);
  }

  const userDataPath = app.getPath('userData');
  migrateLegacyStateFile(userDataPath);
  appStore = new AppStore(userDataPath);
  const initialState = readState();
  registerIpcHandlers();
  createWindow();
  createQuickAddWindow();
  syncRuntimeWithSettings(initialState.settings, { allowFallback: true });
  startReminderTimer();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else {
      showMainWindow();
    }
  });
});

app.on('before-quit', () => {
  isQuitting = true;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  if (tray) {
    tray.destroy();
    tray = null;
  }
  if (quickAddWindow && !quickAddWindow.isDestroyed()) {
    quickAddWindow.destroy();
    quickAddWindow = null;
  }
  if (reminderTimer) {
    clearInterval(reminderTimer);
    reminderTimer = null;
  }
});
