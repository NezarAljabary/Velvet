const fs = require('fs');
const path = require('path');

const SETTINGS_DEFAULTS = {
  themeMode: 'dark',
  accent: 'violet',
  surface: 'glass',
  density: 'comfortable',
  font: 'segoe',
  radius: 'medium',
  shadow: 'balanced',
  motion: 'normal',
  sidebarWidth: 'normal',
  quickAddShortcut: 'Ctrl+Alt+V',
  trayOnClose: false,
  trayOnMinimize: false
};

const DEFAULT_STATE = {
  tasks: [],
  categories: [],
  settings: SETTINGS_DEFAULTS,
  meta: {
    schemaVersion: 5
  }
};

const PRIORITIES = new Set(['low', 'medium', 'high', 'urgent']);
const STATUSES = new Set(['normal', 'delayed', 'done']);
const ACCENTS = new Set(['coral', 'ocean', 'moss', 'sunset', 'violet', 'pink', 'black', 'mono']);
const SURFACES = new Set(['glass', 'solid', 'elevated']);
const DENSITIES = new Set(['comfortable', 'compact']);
const THEMES = new Set(['dark', 'light']);
const FONTS = new Set(['segoe', 'bahnschrift', 'calibri', 'cambria']);
const RADII = new Set(['compact', 'medium', 'soft']);
const SHADOWS = new Set(['subtle', 'balanced', 'vivid']);
const MOTIONS = new Set(['off', 'soft', 'normal', 'vivid']);
const SIDEBAR_WIDTHS = new Set(['narrow', 'normal', 'wide']);
const QUICK_ADD_SHORTCUTS = new Set(['Ctrl+Alt+V', 'Ctrl+Shift+Space', 'Ctrl+Shift+K', 'Ctrl+K', 'Alt+Space']);
const ATTACHMENT_TYPES = new Set(['url', 'image', 'file']);

function nowIso() {
  return new Date().toISOString();
}

function cleanString(value, maxLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function cleanBoolean(value, fallback = false) {
  return typeof value === 'boolean' ? value : fallback;
}

function isValidDateValue(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidTimeValue(value) {
  return /^\d{2}:\d{2}$/.test(value);
}

function isValidDateTimeLocal(value) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value);
}

function normalizeDate(value) {
  const safe = cleanString(value, 32);
  return isValidDateValue(safe) ? safe : '';
}

function normalizeTime(value) {
  const safe = cleanString(value, 8);
  return isValidTimeValue(safe) ? safe : '';
}

function normalizeDateTime(value) {
  const safe = cleanString(value, 32);
  return isValidDateTimeLocal(safe) ? safe : '';
}

function normalizeUrl(value) {
  const safe = cleanString(value, 2048);
  if (!safe) {
    return '';
  }

  try {
    const parsed = new URL(safe);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return '';
    }
    return parsed.toString();
  } catch (error) {
    return '';
  }
}

function normalizeHexColor(color, fallback = '#7da6ff') {
  const safe = cleanString(color, 16);
  if (!safe || safe === 'default') {
    return fallback;
  }
  return /^#([a-f0-9]{6})$/i.test(safe) ? safe.toLowerCase() : fallback;
}

function normalizeTags(tags) {
  if (!Array.isArray(tags)) {
    return [];
  }
  return [...new Set(tags.map((tag) => cleanString(String(tag), 32)).filter(Boolean))].slice(0, 12);
}

function normalizeAttachment(attachment) {
  if (!attachment || typeof attachment !== 'object') {
    return null;
  }

  let type = cleanString(attachment.type, 16).toLowerCase();
  const url = normalizeUrl(attachment.url || attachment.href || '');
  const rawPath = cleanString(attachment.path || attachment.filePath || '', 2048);
  const mime = cleanString(attachment.mime, 120).toLowerCase();

  if (!ATTACHMENT_TYPES.has(type)) {
    if (url) {
      type = 'url';
    } else if (mime.startsWith('image/')) {
      type = 'image';
    } else if (rawPath) {
      const ext = path.extname(rawPath).toLowerCase();
      type = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.svg', '.ico'].includes(ext) ? 'image' : 'file';
    } else {
      return null;
    }
  }

  const base = {
    id: cleanString(attachment.id, 64) || `att-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    type,
    addedAt: cleanString(attachment.addedAt, 64) || nowIso()
  };

  if (type === 'url') {
    if (!url) {
      return null;
    }
    let host = '';
    try {
      host = new URL(url).hostname.replace(/^www\./, '');
    } catch (error) {
      host = '';
    }
    return {
      ...base,
      type: 'url',
      url,
      name: cleanString(attachment.name, 120) || host || url,
      path: '',
      mime: '',
      size: 0
    };
  }

  if (!rawPath) {
    return null;
  }

  const isImage = type === 'image';
  return {
    ...base,
    type: isImage ? 'image' : 'file',
    url: '',
    path: rawPath,
    name: cleanString(attachment.name, 120) || path.basename(rawPath),
    mime,
    size: Number.isFinite(attachment.size) ? Math.max(0, Number(attachment.size)) : 0
  };
}

function normalizeAttachmentList(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  const seen = new Set();
  const attachments = [];
  for (const item of value) {
    const normalized = normalizeAttachment(item);
    if (!normalized) {
      continue;
    }
    const dedupeKey = normalized.type === 'url' ? `${normalized.type}:${normalized.url}` : `${normalized.type}:${normalized.path}`;
    if (seen.has(dedupeKey)) {
      continue;
    }
    seen.add(dedupeKey);
    attachments.push(normalized);
    if (attachments.length >= 12) {
      break;
    }
  }

  return attachments;
}

function normalizeSettings(settings) {
  const safe = settings && typeof settings === 'object' ? settings : {};
  return {
    themeMode: THEMES.has(safe.themeMode) ? safe.themeMode : SETTINGS_DEFAULTS.themeMode,
    accent: ACCENTS.has(safe.accent) ? safe.accent : SETTINGS_DEFAULTS.accent,
    surface: SURFACES.has(safe.surface) ? safe.surface : SETTINGS_DEFAULTS.surface,
    density: DENSITIES.has(safe.density) ? safe.density : SETTINGS_DEFAULTS.density,
    font: FONTS.has(safe.font) ? safe.font : SETTINGS_DEFAULTS.font,
    radius: RADII.has(safe.radius) ? safe.radius : SETTINGS_DEFAULTS.radius,
    shadow: SHADOWS.has(safe.shadow) ? safe.shadow : SETTINGS_DEFAULTS.shadow,
    motion: MOTIONS.has(safe.motion) ? safe.motion : SETTINGS_DEFAULTS.motion,
    sidebarWidth: SIDEBAR_WIDTHS.has(safe.sidebarWidth) ? safe.sidebarWidth : SETTINGS_DEFAULTS.sidebarWidth,
    quickAddShortcut: QUICK_ADD_SHORTCUTS.has(safe.quickAddShortcut)
      ? safe.quickAddShortcut
      : SETTINGS_DEFAULTS.quickAddShortcut,
    trayOnClose: cleanBoolean(safe.trayOnClose, SETTINGS_DEFAULTS.trayOnClose),
    trayOnMinimize: cleanBoolean(safe.trayOnMinimize, SETTINGS_DEFAULTS.trayOnMinimize)
  };
}

function normalizeCategory(category) {
  if (!category || typeof category !== 'object') {
    return null;
  }

  const normalized = {
    id: cleanString(category.id, 64),
    name: cleanString(category.name, 48),
    color: normalizeHexColor(category.color),
    attachments: normalizeAttachmentList(category.attachments),
    createdAt: cleanString(category.createdAt, 64) || nowIso(),
    updatedAt: cleanString(category.updatedAt, 64) || nowIso()
  };

  if (!normalized.id || !normalized.name) {
    return null;
  }

  return normalized;
}

function normalizeTask(task, categoryIds = new Set()) {
  if (!task || typeof task !== 'object') {
    return null;
  }

  const normalizedStatus = task.completed ? 'done' : task.status;
  const categoryId = cleanString(task.categoryId || '', 64);
  const dueDate = normalizeDate(task.dueDate);
  const dueTime = dueDate ? normalizeTime(task.dueTime) : '';
  const reminderAt = normalizeDateTime(task.reminderAt || task.reminderDateTime || '');
  const reminderEnabled = cleanBoolean(task.reminderEnabled, false) && Boolean(reminderAt);

  const normalized = {
    id: cleanString(task.id, 64),
    title: cleanString(task.title, 120),
    notes: cleanString(task.notes, 3000),
    dueDate,
    dueTime,
    priority: PRIORITIES.has(task.priority) ? task.priority : 'medium',
    status: STATUSES.has(normalizedStatus) ? normalizedStatus : 'normal',
    tags: normalizeTags(task.tags),
    categoryId: categoryIds.has(categoryId) ? categoryId : '',
    reminderEnabled,
    reminderAt: reminderEnabled ? reminderAt : '',
    reminderNotifiedAt: reminderEnabled ? cleanString(task.reminderNotifiedAt || task.remindedAt, 64) : '',
    order: Number.isFinite(Number(task.order)) ? Number(task.order) : Number.NaN,
    attachments: normalizeAttachmentList(task.attachments),
    createdAt: cleanString(task.createdAt, 64) || nowIso(),
    updatedAt: cleanString(task.updatedAt, 64) || nowIso()
  };

  if (!normalized.id || !normalized.title) {
    return null;
  }

  return normalized;
}

function normalizeState(rawState) {
  const state = rawState && typeof rawState === 'object' ? rawState : {};
  const categories = Array.isArray(state.categories) ? state.categories.map(normalizeCategory).filter(Boolean) : [];
  const categoryIds = new Set(categories.map((category) => category.id));
  const rawTasks = Array.isArray(state.tasks) ? state.tasks : [];
  const tasks = rawTasks
    .map((task, index) => {
      const normalizedTask = normalizeTask(
        {
          ...task,
          order: Number.isFinite(Number(task?.order)) ? Number(task.order) : index * 10
        },
        categoryIds
      );
      return normalizedTask;
    })
    .filter(Boolean)
    .sort((left, right) => left.order - right.order)
    .map((task, index) => ({
      ...task,
      order: index * 10
    }));

  return {
    tasks,
    categories,
    settings: normalizeSettings(state.settings),
    meta: {
      schemaVersion: DEFAULT_STATE.meta.schemaVersion
    }
  };
}

function createDefaultState() {
  return {
    tasks: [],
    categories: [],
    settings: { ...SETTINGS_DEFAULTS },
    meta: {
      schemaVersion: DEFAULT_STATE.meta.schemaVersion
    }
  };
}

class AppStore {
  constructor(userDataPath) {
    this.filePath = path.join(userDataPath, 'app-state.json');
    this.ensureDirectory();
  }

  ensureDirectory() {
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
  }

  readState() {
    try {
      if (!fs.existsSync(this.filePath)) {
        return createDefaultState();
      }

      const raw = fs.readFileSync(this.filePath, 'utf8');
      const parsed = JSON.parse(raw);
      return normalizeState(parsed);
    } catch (error) {
      try {
        if (fs.existsSync(this.filePath)) {
          const corruptCopy = `${this.filePath}.corrupt-${Date.now()}`;
          fs.copyFileSync(this.filePath, corruptCopy);
        }
      } catch (copyError) {
        // Ignore backup failures and continue with safe defaults.
      }
      return createDefaultState();
    }
  }

  writeState(nextState) {
    const safeState = normalizeState(nextState);
    const tempPath = `${this.filePath}.tmp`;

    fs.writeFileSync(tempPath, JSON.stringify(safeState, null, 2), 'utf8');
    fs.renameSync(tempPath, this.filePath);

    return safeState;
  }
}

module.exports = {
  AppStore,
  SETTINGS_DEFAULTS,
  createDefaultState,
  normalizeAttachment,
  normalizeCategory,
  normalizeSettings,
  normalizeState,
  normalizeTask
};
