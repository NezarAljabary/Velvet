const VIEW_DEFINITIONS = [
  { id: 'all', label: 'All Tasks', description: 'Active workspace', subtitle: 'All normal and delayed tasks in one list.' },
  { id: 'today', label: 'Today', description: 'Due today', subtitle: 'Tasks due today in your local timezone.' },
  { id: 'upcoming', label: 'Upcoming', description: 'Next 7 days', subtitle: 'Plan upcoming deadlines before they become urgent.' },
  { id: 'overdue', label: 'Overdue', description: 'Needs attention', subtitle: 'Items past their due date or due time.' },
  { id: 'completed', label: 'Finished', description: 'Completed tasks', subtitle: 'Review what is done without cluttering active work.' },
  { id: 'categories', label: 'Categories', description: 'Organize', subtitle: 'Manage categories and view grouped tasks.' },
  { id: 'settings', label: 'Settings', description: 'Customize', subtitle: 'Theme, layout, motion, fonts, and tray behavior.' }
];

const ACCENT_OPTIONS = [
  { id: 'coral', label: 'Coral', caption: 'Warm and energetic' },
  { id: 'ocean', label: 'Ocean', caption: 'Cool and crisp' },
  { id: 'moss', label: 'Moss', caption: 'Calm and grounded' },
  { id: 'sunset', label: 'Sunset', caption: 'Bright and vivid' },
  { id: 'violet', label: 'Violet', caption: 'Deep modern accent' },
  { id: 'pink', label: 'Pink', caption: 'Elegant and refined' },
  { id: 'black', label: 'Black', caption: 'Near-black premium accent' },
  { id: 'mono', label: 'Mono', caption: 'Neutral professional' }
];

const THEME_OPTIONS = [
  { id: 'dark', label: 'Dark', caption: 'Focused night workspace' },
  { id: 'light', label: 'Light', caption: 'Clean daylight workspace' }
];

const SURFACE_OPTIONS = [
  { id: 'glass', label: 'Glass', caption: 'Translucent layered panels' },
  { id: 'solid', label: 'Solid', caption: 'Crisp flat surfaces' },
  { id: 'elevated', label: 'Elevated', caption: 'Depth-focused cards' }
];

const DENSITY_OPTIONS = [
  { id: 'comfortable', label: 'Comfortable', caption: 'More breathing room' },
  { id: 'compact', label: 'Compact', caption: 'Higher information density' }
];

const FONT_OPTIONS = [
  { id: 'segoe', label: 'Segoe UI Variable', caption: 'Windows native clarity' },
  { id: 'bahnschrift', label: 'Bahnschrift', caption: 'Modern geometric sans' },
  { id: 'calibri', label: 'Calibri', caption: 'Clean compact sans' },
  { id: 'cambria', label: 'Cambria', caption: 'Readable premium serif' }
];

const RADIUS_OPTIONS = [
  { id: 'compact', label: 'Compact', caption: 'Sharper corners' },
  { id: 'medium', label: 'Medium', caption: 'Balanced roundness' },
  { id: 'soft', label: 'Soft', caption: 'Extra rounded UI' }
];

const SHADOW_OPTIONS = [
  { id: 'subtle', label: 'Subtle', caption: 'Low contrast depth' },
  { id: 'balanced', label: 'Balanced', caption: 'Default panel depth' },
  { id: 'vivid', label: 'Vivid', caption: 'High depth contrast' }
];

const MOTION_OPTIONS = [
  { id: 'off', label: 'Off', caption: 'Minimal motion' },
  { id: 'soft', label: 'Soft', caption: 'Reduced transitions' },
  { id: 'normal', label: 'Normal', caption: 'Balanced animation' },
  { id: 'vivid', label: 'Vivid', caption: 'Most expressive motion' }
];

const SIDEBAR_WIDTH_OPTIONS = [
  { id: 'narrow', label: 'Narrow', caption: 'More room for tasks' },
  { id: 'normal', label: 'Normal', caption: 'Balanced layout' },
  { id: 'wide', label: 'Wide', caption: 'Stronger side controls' }
];

const QUICK_ADD_SHORTCUT_OPTIONS = [
  { id: 'Ctrl+Alt+V', label: 'Ctrl+Alt+V', caption: 'Recommended' },
  { id: 'Ctrl+Shift+Space', label: 'Ctrl+Shift+Space', caption: 'Alternative' },
  { id: 'Ctrl+Shift+K', label: 'Ctrl+Shift+K', caption: 'Keyboard alt' },
  { id: 'Ctrl+K', label: 'Ctrl+K', caption: 'Legacy (conflicts)' },
  { id: 'Alt+Space', label: 'Alt+Space', caption: 'Palette style' }
];

const DEFAULT_SETTINGS = {
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

const APPEARANCE_DEFAULTS = {
  themeMode: DEFAULT_SETTINGS.themeMode,
  accent: DEFAULT_SETTINGS.accent,
  surface: DEFAULT_SETTINGS.surface,
  density: DEFAULT_SETTINGS.density,
  font: DEFAULT_SETTINGS.font,
  radius: DEFAULT_SETTINGS.radius,
  shadow: DEFAULT_SETTINGS.shadow,
  motion: DEFAULT_SETTINGS.motion,
  sidebarWidth: DEFAULT_SETTINGS.sidebarWidth
};

const PRIORITY_WEIGHT = {
  low: 1,
  medium: 2,
  high: 3,
  urgent: 4
};

const STATUS_WEIGHT = {
  normal: 1,
  delayed: 2,
  done: 3
};

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

const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent'
};

const STATUS_LABELS = {
  normal: 'Normal',
  delayed: 'Delayed',
  done: 'Done'
};

const settingsOptionSets = {
  themeMode: THEME_OPTIONS,
  accent: ACCENT_OPTIONS,
  surface: SURFACE_OPTIONS,
  density: DENSITY_OPTIONS,
  font: FONT_OPTIONS,
  radius: RADIUS_OPTIONS,
  shadow: SHADOW_OPTIONS,
  motion: MOTION_OPTIONS,
  sidebarWidth: SIDEBAR_WIDTH_OPTIONS,
  quickAddShortcut: QUICK_ADD_SHORTCUT_OPTIONS
};

const state = {
  data: {
    tasks: [],
    categories: [],
    settings: { ...DEFAULT_SETTINGS }
  },
  meta: {
    version: '',
    userDataPath: '',
    appName: 'Velvet'
  },
  ui: {
    currentView: 'today',
    editingTaskId: null,
    editingCategoryId: null,
    pulseCollapsed: true,
    composerCollapsed: false,
    filterPopoverOpen: false,
    selectedTaskIds: new Set(),
    selectionAnchorId: '',
    dragTaskId: '',
    dragOverTaskId: '',
    dragPosition: '',
    openSelectId: '',
    shortcutStatus: {
      requested: DEFAULT_SETTINGS.quickAddShortcut,
      active: '',
      registered: false,
      error: ''
    }
  },
  filters: createDefaultFilters(),
  drafts: {
    task: createEmptyTaskDraft(),
    category: createEmptyCategoryDraft()
  }
};

const elements = {
  floatingLayerRoot: document.getElementById('floatingLayerRoot'),
  searchInput: document.getElementById('searchInput'),
  filterIconGlyph: document.querySelector('.icon-glyph'),
  filterButton: document.getElementById('filterButton'),
  filterActiveBadge: document.getElementById('filterActiveBadge'),
  filterPopover: document.getElementById('filterPopover'),
  pulseCard: document.getElementById('pulseCard'),
  togglePulseButton: document.getElementById('togglePulseButton'),
  clearFiltersButton: document.getElementById('clearFiltersButton'),
  statusFilter: document.getElementById('statusFilter'),
  priorityFilter: document.getElementById('priorityFilter'),
  categoryFilter: document.getElementById('categoryFilter'),
  sortSelect: document.getElementById('sortSelect'),
  viewNav: document.getElementById('viewNav'),
  statsGrid: document.getElementById('statsGrid'),
  viewEyebrow: document.getElementById('viewEyebrow'),
  viewTitle: document.getElementById('viewTitle'),
  viewSubtitle: document.getElementById('viewSubtitle'),
  quickAddShortcutHint: document.getElementById('quickAddShortcutHint'),
  newTaskButton: document.getElementById('newTaskButton'),
  openQuickAddButton: document.getElementById('openQuickAddButton'),
  toggleComposerButton: document.getElementById('toggleComposerButton'),
  secondaryActionButton: document.getElementById('secondaryActionButton'),
  workspaceGrid: document.getElementById('workspaceGrid'),
  composerSection: document.getElementById('composerSection'),
  composerTitle: document.getElementById('composerTitle'),
  taskForm: document.getElementById('taskForm'),
  titleInput: document.getElementById('titleInput'),
  notesInput: document.getElementById('notesInput'),
  dueDateInput: document.getElementById('dueDateInput'),
  dueTimeInput: document.getElementById('dueTimeInput'),
  priorityInput: document.getElementById('priorityInput'),
  statusInput: document.getElementById('statusInput'),
  categoryInput: document.getElementById('categoryInput'),
  reminderEnabledInput: document.getElementById('reminderEnabledInput'),
  reminderStatusText: document.getElementById('reminderStatusText'),
  reminderAtField: document.getElementById('reminderAtField'),
  reminderAtInput: document.getElementById('reminderAtInput'),
  tagsInput: document.getElementById('tagsInput'),
  attachmentUrlInput: document.getElementById('attachmentUrlInput'),
  addUrlAttachmentButton: document.getElementById('addUrlAttachmentButton'),
  addFileAttachmentButton: document.getElementById('addFileAttachmentButton'),
  draftAttachmentList: document.getElementById('draftAttachmentList'),
  draftStatus: document.getElementById('draftStatus'),
  clearDraftButton: document.getElementById('clearDraftButton'),
  cancelEditButton: document.getElementById('cancelEditButton'),
  saveTaskButton: document.getElementById('saveTaskButton'),
  duplicateTaskButton: document.getElementById('duplicateTaskButton'),
  contentTitle: document.getElementById('contentTitle'),
  contentCount: document.getElementById('contentCount'),
  tasksView: document.getElementById('tasksView'),
  taskList: document.getElementById('taskList'),
  emptyState: document.getElementById('emptyState'),
  emptyTitle: document.getElementById('emptyTitle'),
  emptyMessage: document.getElementById('emptyMessage'),
  categoriesView: document.getElementById('categoriesView'),
  categoryForm: document.getElementById('categoryForm'),
  categoryNameInput: document.getElementById('categoryNameInput'),
  categoryColorInput: document.getElementById('categoryColorInput'),
  categoryAttachmentUrlInput: document.getElementById('categoryAttachmentUrlInput'),
  addCategoryUrlAttachmentButton: document.getElementById('addCategoryUrlAttachmentButton'),
  addCategoryFileAttachmentButton: document.getElementById('addCategoryFileAttachmentButton'),
  categoryAttachmentDraftList: document.getElementById('categoryAttachmentDraftList'),
  saveCategoryButton: document.getElementById('saveCategoryButton'),
  cancelCategoryEditButton: document.getElementById('cancelCategoryEditButton'),
  categoryList: document.getElementById('categoryList'),
  categoryGroups: document.getElementById('categoryGroups'),
  settingsView: document.getElementById('settingsView'),
  themeModeOptions: document.getElementById('themeModeOptions'),
  accentOptions: document.getElementById('accentOptions'),
  surfaceOptions: document.getElementById('surfaceOptions'),
  densityOptions: document.getElementById('densityOptions'),
  fontOptions: document.getElementById('fontOptions'),
  radiusOptions: document.getElementById('radiusOptions'),
  shadowOptions: document.getElementById('shadowOptions'),
  motionOptions: document.getElementById('motionOptions'),
  sidebarWidthOptions: document.getElementById('sidebarWidthOptions'),
  quickAddShortcutOptions: document.getElementById('quickAddShortcutOptions'),
  quickAddShortcutStatus: document.getElementById('quickAddShortcutStatus'),
  trayCloseToggle: document.getElementById('trayCloseToggle'),
  trayMinimizeToggle: document.getElementById('trayMinimizeToggle'),
  storagePath: document.getElementById('storagePath'),
  openStorageButton: document.getElementById('openStorageButton'),
  restoreThemeDefaultsButton: document.getElementById('restoreThemeDefaultsButton'),
  dialogRoot: document.getElementById('dialogRoot')
};

let removeAddTaskCommandListener = null;
let removeReminderListener = null;
let removeStateChangedListener = null;
let removeShortcutStatusListener = null;
let activeDialogCleanup = null;

function createDefaultFilters() {
  return {
    search: '',
    status: 'all',
    priority: 'all',
    categoryId: 'all',
    sort: 'manual'
  };
}

function createEmptyTaskDraft() {
  return {
    id: '',
    title: '',
    notes: '',
    dueDate: '',
    dueTime: '',
    priority: 'medium',
    status: 'normal',
    categoryId: '',
    reminderEnabled: false,
    reminderAt: '',
    tags: '',
    attachments: []
  };
}

function createEmptyCategoryDraft() {
  return {
    name: '',
    color: '#7da6ff',
    attachments: []
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function normalizeTags(rawTags) {
  return [...new Set(String(rawTags || '').split(',').map((tag) => tag.trim()).filter(Boolean))].slice(0, 12);
}

function normalizeWhitespace(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function normalizeTaskTitle(value) {
  return normalizeWhitespace(value).slice(0, 120);
}

function normalizeNotes(value) {
  return String(value || '').trim().slice(0, 3000);
}

function normalizeTimeString(value) {
  const safe = String(value || '').trim();
  return /^\d{2}:\d{2}$/.test(safe) ? safe : '';
}

function normalizeDateString(value) {
  const safe = String(value || '').trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(safe) ? safe : '';
}

function normalizeDateTimeLocal(value) {
  const safe = String(value || '').trim();
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(safe) ? safe : '';
}

function safeHexColor(value, fallback = '#7da6ff') {
  const safe = String(value || '').trim();
  return /^#([a-f0-9]{6})$/i.test(safe) ? safe.toLowerCase() : fallback;
}

function pad2(value) {
  return String(value).padStart(2, '0');
}

function toDateKey(dateObject) {
  return `${dateObject.getFullYear()}-${pad2(dateObject.getMonth() + 1)}-${pad2(dateObject.getDate())}`;
}

function getTodayKey() {
  return toDateKey(new Date());
}

function parseDateKey(dateKey, time = '00:00') {
  const normalizedDate = normalizeDateString(dateKey);
  if (!normalizedDate) {
    return null;
  }
  const [year, month, day] = normalizedDate.split('-').map((value) => Number(value));
  const safeTime = normalizeTimeString(time) || '00:00';
  const [hours, minutes] = safeTime.split(':').map((value) => Number(value));
  return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

function hexToRgba(hex, alpha) {
  const safe = safeHexColor(hex);
  const red = Number.parseInt(safe.slice(1, 3), 16);
  const green = Number.parseInt(safe.slice(3, 5), 16);
  const blue = Number.parseInt(safe.slice(5, 7), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function toFileUrl(filePath) {
  if (!filePath) {
    return '';
  }
  const normalized = String(filePath).replaceAll('\\', '/');
  return `file:///${encodeURI(normalized)}`;
}

function cloneAttachmentList(list) {
  return Array.isArray(list) ? list.map((item) => ({ ...item })) : [];
}

function getCategoryById(categoryId) {
  return state.data.categories.find((item) => item.id === categoryId) || null;
}

function getCategoryName(categoryId) {
  const category = getCategoryById(categoryId);
  return category ? category.name : 'Uncategorized';
}

function getTaskById(taskId) {
  return state.data.tasks.find((task) => task.id === taskId) || null;
}

function getAllTasksManualSorted() {
  return [...state.data.tasks].sort((left, right) => left.order - right.order);
}

function getDueSortStamp(task) {
  if (!task.dueDate) {
    return Number.MAX_SAFE_INTEGER;
  }
  const dueDateTime = parseDateKey(task.dueDate, task.dueTime || '23:59');
  return dueDateTime ? dueDateTime.getTime() : Number.MAX_SAFE_INTEGER;
}

function getDaysUntil(task) {
  if (!task.dueDate) {
    return null;
  }
  const due = parseDateKey(task.dueDate, '00:00');
  const today = parseDateKey(getTodayKey(), '00:00');
  if (!due || !today) {
    return null;
  }
  return Math.round((due.getTime() - today.getTime()) / 86400000);
}

function isTaskDueToday(task) {
  return Boolean(task.dueDate) && task.dueDate === getTodayKey();
}

function isTaskOverdue(task) {
  if (!task.dueDate || task.status === 'done') {
    return false;
  }
  return getDueSortStamp(task) < Date.now();
}

function sortTasks(tasks) {
  const sorted = [...tasks];
  sorted.sort((left, right) => {
    switch (state.filters.sort) {
      case 'manual':
        return left.order - right.order;
      case 'priority-desc': {
        const diff = PRIORITY_WEIGHT[right.priority] - PRIORITY_WEIGHT[left.priority];
        return diff !== 0 ? diff : getDueSortStamp(left) - getDueSortStamp(right);
      }
      case 'status-asc':
        return STATUS_WEIGHT[left.status] - STATUS_WEIGHT[right.status];
      case 'created-desc':
        return new Date(right.createdAt) - new Date(left.createdAt);
      case 'created-asc':
        return new Date(left.createdAt) - new Date(right.createdAt);
      case 'updated-desc':
        return new Date(right.updatedAt) - new Date(left.updatedAt);
      case 'title-asc':
        return left.title.localeCompare(right.title);
      case 'due-asc':
      default:
        return getDueSortStamp(left) - getDueSortStamp(right);
    }
  });
  return sorted;
}

function matchesView(task) {
  const days = getDaysUntil(task);
  switch (state.ui.currentView) {
    case 'today':
      return task.status !== 'done' && isTaskDueToday(task);
    case 'upcoming':
      return task.status !== 'done' && days !== null && days >= 1 && days <= 7;
    case 'overdue':
      return task.status !== 'done' && isTaskOverdue(task);
    case 'completed':
      return task.status === 'done';
    case 'all':
      return task.status !== 'done';
    default:
      return true;
  }
}

function matchesFilters(task) {
  const term = state.filters.search.trim().toLowerCase();
  const attachmentText = (task.attachments || [])
    .map((attachment) => `${attachment.name || ''} ${attachment.url || ''} ${attachment.path || ''}`)
    .join(' ');

  const haystack = [task.title, task.notes, getCategoryName(task.categoryId), ...(task.tags || []), attachmentText]
    .join(' ')
    .toLowerCase();

  const matchesSearch = !term || haystack.includes(term);
  const matchesStatus = state.filters.status === 'all' || task.status === state.filters.status;
  const matchesPriority = state.filters.priority === 'all' || task.priority === state.filters.priority;
  const matchesCategory =
    state.filters.categoryId === 'all' ||
    (state.filters.categoryId === '__uncategorized__' ? !task.categoryId : task.categoryId === state.filters.categoryId);

  return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
}

function getFilteredTasks() {
  return sortTasks(state.data.tasks.filter((task) => matchesView(task) && matchesFilters(task)));
}

function getVisibleTaskIds() {
  return getFilteredTasks().map((task) => task.id);
}

function getViewById(viewId) {
  return VIEW_DEFINITIONS.find((view) => view.id === viewId) || VIEW_DEFINITIONS[0];
}

function formatDate(dateString) {
  if (!dateString) {
    return 'No due date';
  }
  const parsed = parseDateKey(dateString, '00:00');
  if (!parsed) {
    return 'No due date';
  }
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(parsed);
}

function formatTime(timeString) {
  if (!timeString) {
    return '';
  }
  const parsed = parseDateKey('2025-01-01', timeString);
  if (!parsed) {
    return '';
  }
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  }).format(parsed);
}

function formatDateTimeLocal(dateTimeString) {
  if (!dateTimeString) {
    return '';
  }
  const parsed = new Date(dateTimeString);
  if (Number.isNaN(parsed.getTime())) {
    return dateTimeString;
  }
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(parsed);
}

function formatTimestamp(dateString) {
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) {
    return 'Unknown';
  }
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(parsed);
}

function formatFileSize(bytes) {
  const size = Number(bytes);
  if (!Number.isFinite(size) || size <= 0) {
    return '';
  }
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function getViewCounts() {
  const activeTasks = state.data.tasks.filter((task) => task.status !== 'done');
  return {
    today: activeTasks.filter((task) => isTaskDueToday(task)).length,
    upcoming: activeTasks.filter((task) => {
      const days = getDaysUntil(task);
      return days !== null && days >= 1 && days <= 7;
    }).length,
    overdue: activeTasks.filter((task) => isTaskOverdue(task)).length,
    all: activeTasks.length,
    completed: state.data.tasks.filter((task) => task.status === 'done').length,
    categories: state.data.categories.length,
    settings: 0
  };
}

function getStats() {
  const activeTasks = state.data.tasks.filter((task) => task.status !== 'done');
  return [
    { label: 'Active', value: activeTasks.length },
    { label: 'Selected', value: state.ui.selectedTaskIds.size },
    { label: 'Delayed', value: activeTasks.filter((task) => task.status === 'delayed').length },
    { label: 'Reminders', value: activeTasks.filter((task) => task.reminderEnabled).length }
  ];
}

function getActiveFilterCount() {
  let count = 0;
  if (state.filters.search) count += 1;
  if (state.filters.status !== 'all') count += 1;
  if (state.filters.priority !== 'all') count += 1;
  if (state.filters.categoryId !== 'all') count += 1;
  if (state.filters.sort !== 'manual') count += 1;
  return count;
}

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

function getViewportBounds() {
  if (window.visualViewport) {
    return {
      left: window.visualViewport.offsetLeft,
      top: window.visualViewport.offsetTop,
      width: window.visualViewport.width,
      height: window.visualViewport.height
    };
  }
  return {
    left: 0,
    top: 0,
    width: window.innerWidth,
    height: window.innerHeight
  };
}

function resolveFloatingPlacement({
  anchorRect,
  preferredWidth,
  minWidth,
  maxWidth,
  preferredHeight,
  minHeight,
  maxHeight,
  edgePadding,
  gap,
  align = 'start',
  flipThreshold = 180
}) {
  const viewport = getViewportBounds();
  const safeLeft = viewport.left + edgePadding;
  const safeTop = viewport.top + edgePadding;
  const safeRight = viewport.left + viewport.width - edgePadding;
  const safeBottom = viewport.top + viewport.height - edgePadding;

  const availableWidth = Math.max(120, safeRight - safeLeft);
  const boundedMinWidth = Math.min(minWidth, availableWidth);
  const boundedMaxWidth = Math.min(maxWidth, availableWidth);
  const width = clamp(preferredWidth, boundedMinWidth, boundedMaxWidth);

  const maxVisibleHeight = Math.max(96, safeBottom - safeTop);
  const boundedMaxHeight = Math.min(maxHeight, maxVisibleHeight);
  const boundedMinHeight = Math.min(minHeight, boundedMaxHeight);
  const targetHeight = Math.min(boundedMaxHeight, Math.max(boundedMinHeight, preferredHeight));
  const availableBelow = safeBottom - anchorRect.bottom - gap;
  const availableAbove = anchorRect.top - safeTop - gap;
  const openUp = availableBelow < Math.min(targetHeight, flipThreshold) && availableAbove > availableBelow;
  const sideSpace = openUp ? availableAbove : availableBelow;
  const maxHeightForSide = Math.max(
    boundedMinHeight,
    Math.min(boundedMaxHeight, Math.max(boundedMinHeight, sideSpace))
  );
  const height = Math.min(targetHeight, maxHeightForSide);

  let left = anchorRect.left;
  if (align === 'end') {
    left = anchorRect.right - width;
  } else if (align === 'center') {
    left = anchorRect.left + anchorRect.width / 2 - width / 2;
  }
  left = clamp(left, safeLeft, Math.max(safeLeft, safeRight - width));

  const desiredTop = openUp ? anchorRect.top - gap - height : anchorRect.bottom + gap;
  const top = clamp(desiredTop, safeTop, Math.max(safeTop, safeBottom - height));
  const originX = clamp(
    anchorRect.left + anchorRect.width / 2 - left,
    16,
    Math.max(16, width - 16)
  );

  return {
    left,
    top,
    width,
    height,
    originX,
    placement: openUp ? 'top' : 'bottom'
  };
}

function getFloatingLayerRoot() {
  return elements.floatingLayerRoot || document.body;
}

function ensureFloatingLayerMounts() {
  const root = getFloatingLayerRoot();
  if (elements.filterPopover && elements.filterPopover.parentElement !== root) {
    root.appendChild(elements.filterPopover);
  }
}

function applyTheme() {
  const settings = state.data.settings || DEFAULT_SETTINGS;
  document.documentElement.dataset.theme = settings.themeMode || DEFAULT_SETTINGS.themeMode;
  document.documentElement.dataset.accent = settings.accent || DEFAULT_SETTINGS.accent;
  document.documentElement.dataset.surface = settings.surface || DEFAULT_SETTINGS.surface;
  document.documentElement.dataset.density = settings.density || DEFAULT_SETTINGS.density;
  document.documentElement.dataset.font = settings.font || DEFAULT_SETTINGS.font;
  document.documentElement.dataset.radius = settings.radius || DEFAULT_SETTINGS.radius;
  document.documentElement.dataset.shadow = settings.shadow || DEFAULT_SETTINGS.shadow;
  document.documentElement.dataset.motion = settings.motion || DEFAULT_SETTINGS.motion;
  document.documentElement.dataset.sidebarWidth = settings.sidebarWidth || DEFAULT_SETTINGS.sidebarWidth;
}

function positionCustomSelectMenu(selectElement) {
  if (!selectElement || !selectElement.id) {
    return;
  }
  const selectBox = document.querySelector(`.app-selectbox[data-select-id="${CSS.escape(selectElement.id)}"]`);
  if (!selectBox) {
    return;
  }

  const trigger = selectBox.querySelector('.app-select-trigger');
  const menu = document.querySelector(`.app-select-menu[data-select-id="${CSS.escape(selectElement.id)}"]`);
  if (!trigger || !menu) {
    return;
  }

  const triggerRect = trigger.getBoundingClientRect();
  const placement = resolveFloatingPlacement({
    anchorRect: triggerRect,
    preferredWidth: Math.max(triggerRect.width, 176),
    minWidth: 176,
    maxWidth: 420,
    preferredHeight: menu.scrollHeight + 6,
    minHeight: 96,
    maxHeight: 320,
    edgePadding: 10,
    gap: 6,
    align: 'start',
    flipThreshold: 190
  });

  menu.dataset.placement = placement.placement;
  menu.style.left = `${Math.round(placement.left)}px`;
  menu.style.top = `${Math.round(placement.top)}px`;
  menu.style.width = `${Math.round(placement.width)}px`;
  menu.style.maxHeight = `${Math.round(placement.height)}px`;
  menu.style.transformOrigin = `${Math.round(placement.originX)}px ${placement.placement === 'top' ? 'bottom' : 'top'}`;
}

function positionFilterPopover() {
  if (!state.ui.filterPopoverOpen) {
    return;
  }
  ensureFloatingLayerMounts();
  const triggerRect = elements.filterButton.getBoundingClientRect();
  const popover = elements.filterPopover;
  const placement = resolveFloatingPlacement({
    anchorRect: triggerRect,
    preferredWidth: Math.max(300, Math.min(360, triggerRect.width + 248)),
    minWidth: 280,
    maxWidth: 420,
    preferredHeight: popover.scrollHeight + 6,
    minHeight: 160,
    maxHeight: 520,
    edgePadding: 12,
    gap: 6,
    align: 'end',
    flipThreshold: 250
  });

  popover.dataset.placement = placement.placement;
  popover.style.left = `${Math.round(placement.left)}px`;
  popover.style.top = `${Math.round(placement.top)}px`;
  popover.style.width = `${Math.round(placement.width)}px`;
  popover.style.maxHeight = `${Math.round(placement.height)}px`;
  popover.style.transformOrigin = `${Math.round(placement.originX)}px ${placement.placement === 'top' ? 'bottom' : 'top'}`;
}

function syncFloatingLayers() {
  if (state.ui.filterPopoverOpen) {
    positionFilterPopover();
  }

  if (!state.ui.openSelectId) {
    return;
  }

  const openSelect = document.getElementById(state.ui.openSelectId);
  if (!openSelect) {
    closeCustomSelectMenu();
    return;
  }
  positionCustomSelectMenu(openSelect);
}

function closeCustomSelectMenu(selectId = '') {
  const selectBoxes = document.querySelectorAll('.app-selectbox');
  selectBoxes.forEach((selectBox) => {
    if (selectId && selectBox.dataset.selectId === selectId) {
      return;
    }
    selectBox.classList.remove('is-open');
    const trigger = selectBox.querySelector('.app-select-trigger');
    trigger?.setAttribute('aria-expanded', 'false');
  });

  const menus = document.querySelectorAll('.app-select-menu[data-select-id]');
  menus.forEach((menu) => {
    if (selectId && menu.dataset.selectId === selectId) {
      return;
    }
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
  });
  state.ui.openSelectId = selectId || '';
}

function setCustomSelectValue(selectElement, value) {
  if (!selectElement || selectElement.value === value) {
    return;
  }
  selectElement.value = value;
  selectElement.dispatchEvent(new Event('change', { bubbles: true }));
}

function updateCustomSelectPresentation(selectElement) {
  const selectId = selectElement.id;
  const selectBox = document.querySelector(`.app-selectbox[data-select-id="${CSS.escape(selectId)}"]`);
  if (!selectBox) {
    closeCustomSelectMenu();
    return;
  }
  const triggerText = selectBox.querySelector('.app-select-trigger-text');
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  triggerText.textContent = selectedOption ? selectedOption.textContent || '' : '';

  const menu = document.querySelector(`.app-select-menu[data-select-id="${CSS.escape(selectId)}"]`);
  const optionButtons = menu ? menu.querySelectorAll('.app-select-option') : [];
  optionButtons.forEach((button) => {
    const selected = button.dataset.value === selectElement.value;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-selected', String(selected));
  });

  selectBox.classList.toggle('is-disabled', Boolean(selectElement.disabled));
  const trigger = selectBox.querySelector('.app-select-trigger');
  trigger.disabled = Boolean(selectElement.disabled);
}

function moveCustomSelectFocus(menu, direction) {
  const options = [...menu.querySelectorAll('.app-select-option:not(:disabled)')];
  if (!options.length) {
    return;
  }
  const currentIndex = options.findIndex((option) => option === document.activeElement);
  const nextIndex = currentIndex < 0 ? 0 : (currentIndex + direction + options.length) % options.length;
  options[nextIndex].focus();
}

function openCustomSelectMenu(selectElement, focusDirection = 0) {
  const selectId = selectElement.id;
  closeCustomSelectMenu();

  const selectBox = document.querySelector(`.app-selectbox[data-select-id="${CSS.escape(selectId)}"]`);
  if (!selectBox) {
    closeCustomSelectMenu();
    return;
  }

  selectBox.classList.add('is-open');
  const trigger = selectBox.querySelector('.app-select-trigger');
  const menu = document.querySelector(`.app-select-menu[data-select-id="${CSS.escape(selectId)}"]`);
  if (!menu) {
    closeCustomSelectMenu();
    return;
  }

  menu.classList.remove('is-open');
  menu.setAttribute('aria-hidden', 'true');
  positionCustomSelectMenu(selectElement);

  state.ui.openSelectId = selectId;
  trigger.setAttribute('aria-expanded', 'true');
  menu.classList.add('is-open');
  menu.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => {
    if (state.ui.openSelectId === selectId) {
      positionCustomSelectMenu(selectElement);
    }
  });

  const options = [...menu.querySelectorAll('.app-select-option:not(:disabled)')];
  if (!options.length) {
    return;
  }

  let targetOption =
    options.find((option) => option.dataset.value === selectElement.value) || options[0];
  if (focusDirection !== 0) {
    const baseIndex = options.indexOf(targetOption);
    const nextIndex = (baseIndex + focusDirection + options.length) % options.length;
    targetOption = options[nextIndex];
  }
  targetOption.focus();
}

function buildCustomSelect(selectElement) {
  const selectId = selectElement.id;
  if (!selectId) {
    return;
  }

  selectElement.classList.add('app-select-native');
  selectElement.tabIndex = -1;
  selectElement.setAttribute('aria-hidden', 'true');

  let selectBox = document.querySelector(`.app-selectbox[data-select-id="${CSS.escape(selectId)}"]`);
  if (!selectBox) {
    selectBox = document.createElement('div');
    selectBox.className = 'app-selectbox';
    selectBox.dataset.selectId = selectId;
    selectBox.innerHTML = `
      <button class="app-select-trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-controls="${escapeHtml(selectId)}-menu">
        <span class="app-select-trigger-text"></span>
        <span class="app-select-trigger-icon" aria-hidden="true">&#9662;</span>
      </button>
    `;
    selectElement.insertAdjacentElement('afterend', selectBox);
  }

  let menu = document.querySelector(`.app-select-menu[data-select-id="${CSS.escape(selectId)}"]`);
  if (!menu) {
    menu = document.createElement('div');
    menu.id = `${selectId}-menu`;
    menu.className = 'app-select-menu';
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-hidden', 'true');
    menu.dataset.selectId = selectId;
    getFloatingLayerRoot().appendChild(menu);
  } else if (menu.parentElement !== getFloatingLayerRoot()) {
    getFloatingLayerRoot().appendChild(menu);
  }

  const trigger = selectBox.querySelector('.app-select-trigger');
  trigger?.setAttribute('aria-controls', `${selectId}-menu`);

  if (!selectBox.dataset.bound) {
    trigger.addEventListener('click', () => {
      if (selectElement.disabled) {
        return;
      }
      if (state.ui.openSelectId === selectId) {
        closeCustomSelectMenu();
      } else {
        openCustomSelectMenu(selectElement);
      }
    });

    trigger.addEventListener('keydown', (event) => {
      if (selectElement.disabled) {
        return;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        openCustomSelectMenu(selectElement, 1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        openCustomSelectMenu(selectElement, -1);
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (state.ui.openSelectId === selectId) {
          closeCustomSelectMenu();
        } else {
          openCustomSelectMenu(selectElement);
        }
      } else if (event.key === 'Escape') {
        closeCustomSelectMenu();
      }
    });

    menu.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        moveCustomSelectFocus(menu, 1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        moveCustomSelectFocus(menu, -1);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        closeCustomSelectMenu();
        trigger.focus();
      } else if (event.key === 'Tab') {
        closeCustomSelectMenu();
      } else if (event.key === 'Enter' || event.key === ' ') {
        const optionButton = event.target.closest('.app-select-option');
        if (!optionButton || optionButton.disabled) {
          return;
        }
        event.preventDefault();
        closeCustomSelectMenu();
        setCustomSelectValue(selectElement, optionButton.dataset.value || '');
        trigger.focus();
      }
    });

    menu.addEventListener('click', (event) => {
      const optionButton = event.target.closest('.app-select-option');
      if (!optionButton || optionButton.disabled) {
        return;
      }
      closeCustomSelectMenu();
      setCustomSelectValue(selectElement, optionButton.dataset.value || '');
      trigger.focus();
    });

    selectElement.addEventListener('change', () => {
      updateCustomSelectPresentation(selectElement);
    });

    selectBox.dataset.bound = 'true';
  }

  const optionMarkup = [...selectElement.options]
    .map((option) => {
      const selected = option.value === selectElement.value;
      return `
        <button
          class="app-select-option ${selected ? 'is-selected' : ''}"
          type="button"
          role="option"
          data-value="${escapeHtml(option.value)}"
          aria-selected="${selected ? 'true' : 'false'}"
          ${option.disabled ? 'disabled' : ''}
        >
          ${escapeHtml(option.textContent || '')}
        </button>
      `;
    })
    .join('');
  menu.innerHTML = optionMarkup;

  updateCustomSelectPresentation(selectElement);
}

function refreshCustomSelects() {
  const selects = [...document.querySelectorAll('select.app-select')];
  selects.forEach((selectElement) => buildCustomSelect(selectElement));

  const liveSelectIds = new Set(selects.map((selectElement) => selectElement.id).filter(Boolean));
  const boxes = document.querySelectorAll('.app-selectbox[data-select-id]');
  boxes.forEach((selectBox) => {
    const selectId = selectBox.dataset.selectId || '';
    if (!liveSelectIds.has(selectId)) {
      selectBox.remove();
    }
  });

  const menus = document.querySelectorAll('.app-select-menu[data-select-id]');
  menus.forEach((menu) => {
    const selectId = menu.dataset.selectId || '';
    if (!liveSelectIds.has(selectId)) {
      menu.remove();
    }
  });

  if (state.ui.openSelectId) {
    const openSelect = document.getElementById(state.ui.openSelectId);
    if (!openSelect || !liveSelectIds.has(state.ui.openSelectId)) {
      closeCustomSelectMenu();
      return;
    }
    positionCustomSelectMenu(openSelect);
  }
}
function renderChoiceButtons(container, options, selectedValue, key) {
  const isAccent = key === 'accent';
  const isQuickShortcut = key === 'quickAddShortcut';
  container.classList.toggle('choice-grid--accent', isAccent);
  container.classList.toggle('choice-grid--shortcut', isQuickShortcut);
  container.innerHTML = options
    .map(
      (option) => `
        <button
          class="choice-button ${isAccent ? 'choice-button--accent' : ''} ${isQuickShortcut ? 'choice-button--shortcut' : ''} ${selectedValue === option.id ? 'active' : ''}"
          type="button"
          data-setting-key="${escapeHtml(key)}"
          data-setting-value="${escapeHtml(option.id)}"
          title="${escapeHtml(option.caption || option.label)}"
          ${key === 'accent' ? `data-accent-option="${escapeHtml(option.id)}"` : ''}
        >
          ${isAccent ? '<span class="choice-accent-swatch" aria-hidden="true"></span>' : ''}
          <strong>${escapeHtml(option.label)}</strong>
          ${isAccent ? '' : `<span class="choice-caption">${escapeHtml(option.caption)}</span>`}
        </button>
      `
    )
    .join('');
}

function renderSidebar() {
  const counts = getViewCounts();
  elements.viewNav.innerHTML = VIEW_DEFINITIONS.map((view) => {
    const countMarkup = view.id === 'settings' ? '' : `<span class="nav-meta">${counts[view.id] || 0}</span>`;
    return `
      <button class="nav-button ${state.ui.currentView === view.id ? 'active' : ''}" type="button" data-view="${view.id}">
        <span>${escapeHtml(view.label)}</span>
        ${countMarkup}
      </button>
    `;
  }).join('');

  elements.statsGrid.innerHTML = getStats()
    .map(
      (stat) => `
        <article class="stat-card">
          <strong>${stat.value}</strong>
          <p>${escapeHtml(stat.label)}</p>
        </article>
      `
    )
    .join('');

  if (elements.pulseCard) {
    elements.pulseCard.classList.toggle('is-collapsed', state.ui.pulseCollapsed);
  }
  if (elements.togglePulseButton) {
    elements.togglePulseButton.textContent = state.ui.pulseCollapsed ? 'Expand' : 'Collapse';
    elements.togglePulseButton.setAttribute('aria-expanded', String(!state.ui.pulseCollapsed));
  }
}

function renderFilterControls() {
  const options = ['<option value="all">All categories</option>', '<option value="__uncategorized__">Uncategorized</option>'];
  state.data.categories
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((category) => {
      options.push(`<option value="${escapeHtml(category.id)}">${escapeHtml(category.name)}</option>`);
    });

  elements.categoryFilter.innerHTML = options.join('');
  elements.searchInput.value = state.filters.search;
  elements.statusFilter.value = state.filters.status;
  elements.priorityFilter.value = state.filters.priority;
  elements.categoryFilter.value = state.filters.categoryId;
  if (elements.categoryFilter.value !== state.filters.categoryId) {
    state.filters.categoryId = 'all';
    elements.categoryFilter.value = 'all';
  }
  elements.sortSelect.value = state.filters.sort;

  const activeCount = getActiveFilterCount();
  elements.filterButton.classList.toggle('is-active', activeCount > 0);
  elements.filterActiveBadge.classList.toggle('hidden', activeCount === 0);
  elements.filterActiveBadge.textContent = String(activeCount);
  elements.filterButton.setAttribute('aria-expanded', String(state.ui.filterPopoverOpen));
  elements.filterPopover.classList.toggle('hidden', !state.ui.filterPopoverOpen);
  if (state.ui.filterPopoverOpen) {
    positionFilterPopover();
    requestAnimationFrame(() => {
      if (state.ui.filterPopoverOpen) {
        positionFilterPopover();
      }
    });
  }
}

function renderHeader() {
  const currentView = getViewById(state.ui.currentView);
  elements.viewEyebrow.textContent = currentView.description;
  elements.viewTitle.textContent = currentView.label;
  elements.viewSubtitle.textContent = currentView.subtitle;
  elements.contentTitle.textContent = currentView.label;
  const shortcutStatus = state.ui.shortcutStatus || {};
  const requestedShortcut =
    shortcutStatus.requested ||
    state.data.settings.quickAddShortcut ||
    DEFAULT_SETTINGS.quickAddShortcut;
  const fellBack =
    shortcutStatus.registered &&
    shortcutStatus.active &&
    shortcutStatus.active !== requestedShortcut;
  const unavailable = shortcutStatus.registered === false;
  // Keep the <kbd> to just the key combo so its width stays stable.
  // Status (unavailable / fallback) goes in the separate hint-status span.
  elements.quickAddShortcutHint.textContent = fellBack ? shortcutStatus.active : requestedShortcut;
  const hintStatus = document.getElementById('quickAddShortcutHintStatus');
  if (hintStatus) {
    if (unavailable) {
      hintStatus.textContent = '(unavailable)';
      hintStatus.classList.remove('hidden');
    } else if (fellBack) {
      hintStatus.textContent = '(fallback)';
      hintStatus.classList.remove('hidden');
    } else {
      hintStatus.textContent = '';
      hintStatus.classList.add('hidden');
    }
  }

  const filteredTasks = getFilteredTasks();
  elements.contentCount.textContent = `${filteredTasks.length} ${filteredTasks.length === 1 ? 'item' : 'items'}`;

  if (state.ui.currentView === 'completed' && state.data.tasks.some((task) => task.status === 'done')) {
    elements.secondaryActionButton.textContent = 'Clear completed';
    elements.secondaryActionButton.dataset.secondaryAction = 'clear-completed';
    elements.secondaryActionButton.classList.remove('hidden');
    return;
  }

  elements.secondaryActionButton.classList.add('hidden');
  elements.secondaryActionButton.textContent = '';
  elements.secondaryActionButton.dataset.secondaryAction = '';
}

function getAttachmentTypeLabel(attachment) {
  if (attachment.type === 'url') return 'Link';
  if (attachment.type === 'image') return 'Image';
  return 'File';
}

function renderAttachmentItem(attachment, options = {}) {
  const { openAction = '', removeAction = '', index = 0, parentId = '' } = options;
  const safeName = escapeHtml(attachment.name || 'Attachment');
  const subtitle =
    attachment.type === 'url'
      ? escapeHtml(attachment.url || '')
      : `${escapeHtml(attachment.path || '')}${attachment.size ? ` • ${escapeHtml(formatFileSize(attachment.size))}` : ''}`;
  let visualMarkup = `<span class="attachment-icon">${escapeHtml(getAttachmentTypeLabel(attachment))}</span>`;

  if (attachment.type === 'image' && attachment.path) {
    const imageUrl = toFileUrl(attachment.path);
    if (imageUrl) {
      visualMarkup = `<img class="attachment-thumb" src="${imageUrl}" alt="${safeName}" loading="lazy" />`;
    }
  }

  return `
    <article class="attachment-item">
      <div class="attachment-meta">
        ${visualMarkup}
        <div class="attachment-name">
          <strong>${safeName}</strong>
          <span>${subtitle || 'No path available'}</span>
        </div>
      </div>
      <div class="attachment-actions">
        ${
          openAction
            ? `<button class="task-action" type="button" data-action="${escapeHtml(openAction)}" data-index="${index}" data-parent-id="${escapeHtml(parentId)}">Open</button>`
            : ''
        }
        ${
          removeAction
            ? `<button class="task-action danger-inline" type="button" data-action="${escapeHtml(removeAction)}" data-index="${index}" data-parent-id="${escapeHtml(parentId)}">Remove</button>`
            : ''
        }
      </div>
    </article>
  `;
}

function renderDraftTaskAttachments() {
  const attachments = state.drafts.task.attachments;
  elements.draftAttachmentList.innerHTML = attachments.length
    ? attachments
        .map((attachment, index) =>
          renderAttachmentItem(attachment, {
            openAction: 'draft-task-attachment-open',
            removeAction: 'draft-task-attachment-remove',
            index
          })
        )
        .join('')
    : '<p class="sidebar-note">No attachments yet.</p>';
}

function renderDraftCategoryAttachments() {
  const attachments = state.drafts.category.attachments;
  elements.categoryAttachmentDraftList.innerHTML = attachments.length
    ? attachments
        .map((attachment, index) =>
          renderAttachmentItem(attachment, {
            openAction: 'draft-category-attachment-open',
            removeAction: 'draft-category-attachment-remove',
            index
          })
        )
        .join('')
    : '<p class="sidebar-note">No category references yet.</p>';
}

function hasMeaningfulDraft() {
  const draft = state.drafts.task;
  return Boolean(
    draft.title.trim() ||
      draft.notes.trim() ||
      draft.dueDate ||
      draft.dueTime ||
      draft.tags.trim() ||
      draft.reminderEnabled ||
      draft.attachments.length
  );
}

function updateDraftStatusText() {
  const isEditing = Boolean(state.ui.editingTaskId);
  if (isEditing) {
    elements.draftStatus.textContent = 'Editing task. Changes are saved only when you press update.';
  } else if (hasMeaningfulDraft()) {
    elements.draftStatus.textContent = 'Draft in progress. Velvet keeps inputs stable while you work.';
  } else {
    elements.draftStatus.textContent = 'Ready for a new task.';
  }
  elements.reminderStatusText.textContent = state.drafts.task.reminderEnabled ? 'Enabled' : 'Disabled';
}

function renderComposer() {
  const isTaskView = !['categories', 'settings'].includes(state.ui.currentView);
  const hideComposer = !isTaskView || (state.ui.composerCollapsed && !state.ui.editingTaskId);
  elements.composerSection.classList.toggle('hidden', !isTaskView);
  elements.toggleComposerButton.classList.toggle('hidden', !isTaskView);
  elements.workspaceGrid.classList.toggle('composer-hidden', hideComposer);

  if (!isTaskView) {
    return;
  }

  const isEditing = Boolean(state.ui.editingTaskId);
  elements.composerTitle.textContent = isEditing ? 'Edit task' : 'Create task';
  elements.cancelEditButton.classList.toggle('hidden', !isEditing);
  elements.duplicateTaskButton.classList.toggle('hidden', !isEditing);
  elements.saveTaskButton.textContent = isEditing ? 'Update task' : 'Save task';
  elements.toggleComposerButton.textContent = hideComposer ? 'Show composer' : 'Hide composer';

  elements.titleInput.value = state.drafts.task.title;
  elements.notesInput.value = state.drafts.task.notes;
  elements.dueDateInput.value = state.drafts.task.dueDate;
  elements.dueTimeInput.value = state.drafts.task.dueTime;
  elements.priorityInput.value = state.drafts.task.priority;
  elements.statusInput.value = state.drafts.task.status;
  elements.tagsInput.value = state.drafts.task.tags;
  elements.reminderEnabledInput.checked = Boolean(state.drafts.task.reminderEnabled);
  elements.reminderAtInput.value = state.drafts.task.reminderAt;
  elements.reminderAtField.classList.toggle('hidden', !state.drafts.task.reminderEnabled);

  const categoryOptions = ['<option value="">Uncategorized</option>']
    .concat(
      state.data.categories
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((category) => `<option value="${escapeHtml(category.id)}">${escapeHtml(category.name)}</option>`)
    )
    .join('');
  elements.categoryInput.innerHTML = categoryOptions;
  elements.categoryInput.value = state.drafts.task.categoryId;
  if (elements.categoryInput.value !== state.drafts.task.categoryId) {
    state.drafts.task.categoryId = '';
    elements.categoryInput.value = '';
  }

  renderDraftTaskAttachments();
  updateDraftStatusText();
}

function getEmptyStateConfig() {
  if (state.ui.currentView === 'today') {
    return {
      title: 'No tasks due today',
      message: 'Use Quick Add or create a task with a due date to populate your Today view.'
    };
  }
  if (state.ui.currentView === 'overdue') {
    return {
      title: 'No overdue tasks',
      message: 'Great. Everything due so far is under control.'
    };
  }
  if (state.ui.currentView === 'completed') {
    return {
      title: 'No finished tasks yet',
      message: 'Completed tasks will appear here so active work stays uncluttered.'
    };
  }
  if (state.ui.currentView === 'upcoming') {
    return {
      title: 'No upcoming tasks',
      message: 'Tasks due in the next 7 days will appear here.'
    };
  }
  return {
    title: 'No tasks found',
    message: getActiveFilterCount() ? 'Try clearing one or more filters.' : 'Create your first task to get started.'
  };
}

function renderTaskAttachments(task) {
  if (!Array.isArray(task.attachments) || !task.attachments.length) {
    return '';
  }
  return `
    <div class="attachment-list">
      ${task.attachments
        .map((attachment, index) =>
          renderAttachmentItem(attachment, {
            openAction: 'task-attachment-open',
            index,
            parentId: task.id
          })
        )
        .join('')}
    </div>
  `;
}

function renderTaskActions(task) {
  const actions = [];
  actions.push(`<button class="task-action primary-inline" type="button" data-task-action="edit" data-task-id="${escapeHtml(task.id)}">Edit</button>`);
  if (task.status === 'done') {
    actions.push(`<button class="task-action warning-inline" type="button" data-task-action="mark-normal" data-task-id="${escapeHtml(task.id)}">Restore</button>`);
  } else {
    actions.push(`<button class="task-action success-inline" type="button" data-task-action="mark-done" data-task-id="${escapeHtml(task.id)}">Done</button>`);
    if (task.status === 'delayed') {
      actions.push(`<button class="task-action" type="button" data-task-action="mark-normal" data-task-id="${escapeHtml(task.id)}">Back to normal</button>`);
    } else {
      actions.push(`<button class="task-action warning-inline" type="button" data-task-action="mark-delayed" data-task-id="${escapeHtml(task.id)}">Delay</button>`);
    }
  }
  actions.push(`<button class="task-action danger-inline" type="button" data-task-action="delete" data-task-id="${escapeHtml(task.id)}">Delete</button>`);
  return actions.join('');
}

function renderTaskCard(task) {
  const selected = state.ui.selectedTaskIds.has(task.id);
  const category = task.categoryId ? getCategoryById(task.categoryId) : null;
  const overdue = isTaskOverdue(task);
  const reminderLabel = task.reminderEnabled ? formatDateTimeLocal(task.reminderAt) : '';
  const dueText = task.dueDate ? `${formatDate(task.dueDate)}${task.dueTime ? ` • ${formatTime(task.dueTime)}` : ''}` : 'No due date';
  const tags = Array.isArray(task.tags) ? task.tags : [];
  const draggable = state.filters.sort === 'manual' ? 'true' : 'false';

  return `
    <article
      class="task-card ${selected ? 'is-selected' : ''} ${state.ui.dragOverTaskId === task.id && state.ui.dragPosition === 'before' ? 'is-drop-before' : ''} ${state.ui.dragOverTaskId === task.id && state.ui.dragPosition === 'after' ? 'is-drop-after' : ''}"
      data-task-id="${escapeHtml(task.id)}"
      data-status="${escapeHtml(task.status)}"
      data-overdue="${overdue ? 'true' : 'false'}"
      tabindex="0"
      draggable="${draggable}"
    >
      <div class="task-card-header">
        <div class="task-title-block">
          <div class="task-title-row">
            <h4>${escapeHtml(task.title)}</h4>
          </div>
          <div class="badge-row">
            <span class="chip status-${escapeHtml(task.status)}">${escapeHtml(STATUS_LABELS[task.status] || task.status)}</span>
            <span class="chip priority-${escapeHtml(task.priority)}">${escapeHtml(PRIORITY_LABELS[task.priority] || task.priority)}</span>
            ${
              category
                ? `<span class="chip category" style="background:${hexToRgba(category.color, 0.16)};border-color:${hexToRgba(category.color, 0.45)};">
                    <span class="category-dot" style="background:${escapeHtml(category.color)};"></span>${escapeHtml(category.name)}
                  </span>`
                : ''
            }
            ${overdue ? '<span class="chip overdue">Overdue</span>' : ''}
            ${task.reminderEnabled ? '<span class="chip tag">Reminder</span>' : ''}
          </div>
        </div>
      </div>

      ${task.notes ? `<p class="task-notes">${escapeHtml(task.notes)}</p>` : ''}

      ${renderTaskAttachments(task)}

      ${
        tags.length
          ? `<div class="tag-row">${tags.map((tag) => `<span class="chip tag">#${escapeHtml(tag)}</span>`).join('')}</div>`
          : ''
      }

      <div class="task-meta">
        <span>Due: ${escapeHtml(dueText)}</span>
        ${task.reminderEnabled && reminderLabel ? `<span>Reminder: ${escapeHtml(reminderLabel)}</span>` : ''}
        <span>Created: ${escapeHtml(formatTimestamp(task.createdAt))}</span>
        <span>Updated: ${escapeHtml(formatTimestamp(task.updatedAt))}</span>
      </div>

      <div class="task-action-row">
        ${renderTaskActions(task)}
      </div>
    </article>
  `;
}

function renderTaskListView() {
  const tasks = getFilteredTasks();
  state.ui.selectedTaskIds = new Set([...state.ui.selectedTaskIds].filter((taskId) => state.data.tasks.some((task) => task.id === taskId)));
  if (state.ui.selectionAnchorId && !state.data.tasks.some((task) => task.id === state.ui.selectionAnchorId)) {
    state.ui.selectionAnchorId = '';
  }

  elements.taskList.innerHTML = tasks.map((task) => renderTaskCard(task)).join('');

  const emptyState = getEmptyStateConfig();
  const isEmpty = tasks.length === 0;
  elements.emptyState.classList.toggle('hidden', !isEmpty);
  elements.emptyTitle.textContent = emptyState.title;
  elements.emptyMessage.textContent = emptyState.message;
}

function getCategoryTaskCount(categoryId) {
  return state.data.tasks.filter((task) => task.categoryId === categoryId).length;
}

function renderCategoryList() {
  const sortedCategories = [...state.data.categories].sort((left, right) => left.name.localeCompare(right.name));
  elements.categoryList.innerHTML = sortedCategories.length
    ? sortedCategories
        .map((category) => {
          const count = getCategoryTaskCount(category.id);
          return `
            <article class="category-item">
              <header class="category-item-header">
                <div class="category-badge">
                  <span class="category-dot" style="background:${escapeHtml(category.color)};"></span>
                  <strong>${escapeHtml(category.name)}</strong>
                </div>
                <span class="app-badge">${count} ${count === 1 ? 'task' : 'tasks'}</span>
              </header>

              ${
                category.attachments.length
                  ? `<div class="attachment-list">
                      ${category.attachments
                        .map((attachment, index) =>
                          renderAttachmentItem(attachment, {
                            openAction: 'category-attachment-open',
                            index,
                            parentId: category.id
                          })
                        )
                        .join('')}
                    </div>`
                  : '<p class="sidebar-note">No references attached.</p>'
              }

              <div class="inline-actions">
                <button class="task-action primary-inline" type="button" data-category-action="edit" data-category-id="${escapeHtml(category.id)}">Edit</button>
                <button class="task-action" type="button" data-category-action="focus" data-category-id="${escapeHtml(category.id)}">Filter tasks</button>
                <button class="task-action danger-inline" type="button" data-category-action="delete" data-category-id="${escapeHtml(category.id)}">Delete</button>
              </div>
            </article>
          `;
        })
        .join('')
    : '<div class="app-empty-state"><h4>No categories yet</h4><p>Create one to organize tasks and references.</p></div>';
}

function renderCategoryGroups() {
  const sortedCategories = [...state.data.categories].sort((left, right) => left.name.localeCompare(right.name));
  const groups = [
    ...sortedCategories.map((category) => ({
      id: category.id,
      name: category.name,
      color: category.color,
      tasks: state.data.tasks.filter((task) => task.categoryId === category.id)
    })),
    {
      id: '',
      name: 'Uncategorized',
      color: '#6f7f93',
      tasks: state.data.tasks.filter((task) => !task.categoryId)
    }
  ];

  elements.categoryGroups.innerHTML = groups
    .map((group) => {
      const tasks = sortTasks(group.tasks);
      return `
        <article class="group-card">
          <header class="group-header">
            <div class="category-badge">
              <span class="category-dot" style="background:${escapeHtml(group.color)};"></span>
              <strong>${escapeHtml(group.name)}</strong>
            </div>
            <span class="app-badge">${tasks.length}</span>
          </header>
          <div class="group-body">
            ${
              tasks.length
                ? tasks
                    .slice(0, 12)
                    .map(
                      (task) => `
                        <button class="task-action" type="button" data-group-task-open="${escapeHtml(task.id)}">
                          ${escapeHtml(task.title)}
                        </button>
                      `
                    )
                    .join('')
                : '<p class="sidebar-note">No tasks in this group.</p>'
            }
          </div>
        </article>
      `;
    })
    .join('');
}

function renderCategoryComposer() {
  const editing = Boolean(state.ui.editingCategoryId);
  elements.categoryNameInput.value = state.drafts.category.name;
  elements.categoryColorInput.value = state.drafts.category.color;
  elements.saveCategoryButton.textContent = editing ? 'Update' : 'Save';
  elements.cancelCategoryEditButton.classList.toggle('hidden', !editing);
  renderDraftCategoryAttachments();
}

function renderCategoriesView() {
  renderCategoryComposer();
  renderCategoryList();
  renderCategoryGroups();
}

function renderSettingsView() {
  renderChoiceButtons(elements.themeModeOptions, THEME_OPTIONS, state.data.settings.themeMode, 'themeMode');
  renderChoiceButtons(elements.accentOptions, ACCENT_OPTIONS, state.data.settings.accent, 'accent');
  renderChoiceButtons(elements.surfaceOptions, SURFACE_OPTIONS, state.data.settings.surface, 'surface');
  renderChoiceButtons(elements.densityOptions, DENSITY_OPTIONS, state.data.settings.density, 'density');
  renderChoiceButtons(elements.fontOptions, FONT_OPTIONS, state.data.settings.font, 'font');
  renderChoiceButtons(elements.radiusOptions, RADIUS_OPTIONS, state.data.settings.radius, 'radius');
  renderChoiceButtons(elements.shadowOptions, SHADOW_OPTIONS, state.data.settings.shadow, 'shadow');
  renderChoiceButtons(elements.motionOptions, MOTION_OPTIONS, state.data.settings.motion, 'motion');
  renderChoiceButtons(elements.sidebarWidthOptions, SIDEBAR_WIDTH_OPTIONS, state.data.settings.sidebarWidth, 'sidebarWidth');
  renderChoiceButtons(
    elements.quickAddShortcutOptions,
    QUICK_ADD_SHORTCUT_OPTIONS,
    state.data.settings.quickAddShortcut,
    'quickAddShortcut'
  );

  elements.trayCloseToggle.checked = Boolean(state.data.settings.trayOnClose);
  elements.trayMinimizeToggle.checked = Boolean(state.data.settings.trayOnMinimize);
  elements.storagePath.textContent = state.meta.userDataPath || 'Unknown';
  if (elements.quickAddShortcutStatus) {
    const status = state.ui.shortcutStatus || {};
    const requested =
      status.requested ||
      state.data.settings.quickAddShortcut ||
      DEFAULT_SETTINGS.quickAddShortcut;
    elements.quickAddShortcutStatus.classList.remove('status-ok', 'status-error');
    if (status.registered === false) {
      elements.quickAddShortcutStatus.textContent =
        status.error || `Shortcut "${requested}" is unavailable on this system.`;
      elements.quickAddShortcutStatus.classList.add('status-error');
      elements.quickAddShortcutStatus.classList.remove('hidden');
    } else if (status.registered && status.active && status.active !== requested) {
      elements.quickAddShortcutStatus.textContent = `"${requested}" could not be registered. Using "${status.active}" instead.`;
      elements.quickAddShortcutStatus.classList.add('status-error');
      elements.quickAddShortcutStatus.classList.remove('hidden');
    } else if (status.registered && status.active) {
      elements.quickAddShortcutStatus.textContent = `Active shortcut: ${status.active}`;
      elements.quickAddShortcutStatus.classList.add('status-ok');
      elements.quickAddShortcutStatus.classList.remove('hidden');
    } else {
      elements.quickAddShortcutStatus.textContent = '';
      elements.quickAddShortcutStatus.classList.add('hidden');
    }
  }
}

function renderViewVisibility() {
  const isCategories = state.ui.currentView === 'categories';
  const isSettings = state.ui.currentView === 'settings';

  elements.tasksView.classList.toggle('hidden', isCategories || isSettings);
  elements.categoriesView.classList.toggle('hidden', !isCategories);
  elements.settingsView.classList.toggle('hidden', !isSettings);
}

function renderApp() {
  applyTheme();
  renderSidebar();
  renderFilterControls();
  renderHeader();
  renderComposer();
  renderViewVisibility();

  if (state.ui.currentView === 'categories') {
    renderCategoriesView();
  } else if (state.ui.currentView === 'settings') {
    renderSettingsView();
  } else {
    renderTaskListView();
  }

  refreshCustomSelects();
  syncFloatingLayers();
}

function ensureSettingValue(key, value) {
  const options = settingsOptionSets[key];
  if (!options) {
    return value;
  }
  return options.some((option) => option.id === value) ? value : DEFAULT_SETTINGS[key];
}

function mergeSettings(input) {
  const source = input && typeof input === 'object' ? input : {};
  return {
    themeMode: ensureSettingValue('themeMode', source.themeMode || DEFAULT_SETTINGS.themeMode),
    accent: ensureSettingValue('accent', source.accent || DEFAULT_SETTINGS.accent),
    surface: ensureSettingValue('surface', source.surface || DEFAULT_SETTINGS.surface),
    density: ensureSettingValue('density', source.density || DEFAULT_SETTINGS.density),
    font: ensureSettingValue('font', source.font || DEFAULT_SETTINGS.font),
    radius: ensureSettingValue('radius', source.radius || DEFAULT_SETTINGS.radius),
    shadow: ensureSettingValue('shadow', source.shadow || DEFAULT_SETTINGS.shadow),
    motion: ensureSettingValue('motion', source.motion || DEFAULT_SETTINGS.motion),
    sidebarWidth: ensureSettingValue('sidebarWidth', source.sidebarWidth || DEFAULT_SETTINGS.sidebarWidth),
    quickAddShortcut: ensureSettingValue('quickAddShortcut', source.quickAddShortcut || DEFAULT_SETTINGS.quickAddShortcut),
    trayOnClose: Boolean(source.trayOnClose),
    trayOnMinimize: Boolean(source.trayOnMinimize)
  };
}

function applyPersistedState(nextState) {
  if (!nextState || typeof nextState !== 'object') {
    return;
  }
  state.data.tasks = Array.isArray(nextState.tasks) ? nextState.tasks : [];
  state.data.categories = Array.isArray(nextState.categories) ? nextState.categories : [];
  state.data.settings = mergeSettings(nextState.settings || {});

  const existingTaskIds = new Set(state.data.tasks.map((task) => task.id));
  state.ui.selectedTaskIds = new Set([...state.ui.selectedTaskIds].filter((taskId) => existingTaskIds.has(taskId)));
  if (state.ui.selectionAnchorId && !existingTaskIds.has(state.ui.selectionAnchorId)) {
    state.ui.selectionAnchorId = '';
  }
  if (state.ui.editingTaskId && !existingTaskIds.has(state.ui.editingTaskId)) {
    state.ui.editingTaskId = null;
    state.drafts.task = createEmptyTaskDraft();
  }

  const existingCategoryIds = new Set(state.data.categories.map((category) => category.id));
  if (state.ui.editingCategoryId && !existingCategoryIds.has(state.ui.editingCategoryId)) {
    state.ui.editingCategoryId = null;
    state.drafts.category = createEmptyCategoryDraft();
  }
}

function resetTaskDraft() {
  state.ui.editingTaskId = null;
  state.drafts.task = createEmptyTaskDraft();
}

function resetCategoryDraft() {
  state.ui.editingCategoryId = null;
  state.drafts.category = createEmptyCategoryDraft();
}

function setTaskDraftFromTask(task) {
  state.ui.editingTaskId = task.id;
  state.drafts.task = {
    id: task.id,
    title: task.title || '',
    notes: task.notes || '',
    dueDate: task.dueDate || '',
    dueTime: task.dueTime || '',
    priority: task.priority || 'medium',
    status: task.status || 'normal',
    categoryId: task.categoryId || '',
    reminderEnabled: Boolean(task.reminderEnabled),
    reminderAt: task.reminderAt || '',
    tags: (task.tags || []).join(', '),
    attachments: cloneAttachmentList(task.attachments)
  };
}

function setCategoryDraftFromCategory(category) {
  state.ui.editingCategoryId = category.id;
  state.drafts.category = {
    name: category.name,
    color: category.color,
    attachments: cloneAttachmentList(category.attachments)
  };
}

function normalizeDraftAttachmentList(attachments) {
  const seen = new Set();
  return (Array.isArray(attachments) ? attachments : [])
    .filter((attachment) => attachment && typeof attachment === 'object')
    .filter((attachment) => {
      const dedupeKey =
        attachment.type === 'url'
          ? `${attachment.type}:${attachment.url || ''}`
          : `${attachment.type}:${attachment.path || ''}`;
      if (!dedupeKey || seen.has(dedupeKey)) {
        return false;
      }
      seen.add(dedupeKey);
      return true;
    })
    .slice(0, 12);
}

function normalizeTaskDraftForSave() {
  const draft = state.drafts.task;
  const title = normalizeTaskTitle(draft.title);
  if (!title) {
    return null;
  }

  const dueDate = normalizeDateString(draft.dueDate);
  const dueTime = dueDate ? normalizeTimeString(draft.dueTime) : '';
  const reminderAt = normalizeDateTimeLocal(draft.reminderAt);
  const reminderEnabled = Boolean(draft.reminderEnabled) && Boolean(reminderAt);
  const categoryId = getCategoryById(draft.categoryId) ? draft.categoryId : '';
  const priority = PRIORITY_WEIGHT[draft.priority] ? draft.priority : 'medium';
  const status = STATUS_WEIGHT[draft.status] ? draft.status : 'normal';

  return {
    id: state.ui.editingTaskId || '',
    title,
    notes: normalizeNotes(draft.notes),
    dueDate,
    dueTime,
    priority,
    status,
    categoryId,
    reminderEnabled,
    reminderAt: reminderEnabled ? reminderAt : '',
    tags: normalizeTags(draft.tags),
    attachments: normalizeDraftAttachmentList(draft.attachments)
  };
}

function normalizeCategoryDraftForSave() {
  const name = normalizeWhitespace(state.drafts.category.name).slice(0, 48);
  if (!name) {
    return null;
  }
  return {
    id: state.ui.editingCategoryId || '',
    name,
    color: safeHexColor(state.drafts.category.color),
    attachments: normalizeDraftAttachmentList(state.drafts.category.attachments)
  };
}

function buildUrlAttachment(rawUrl) {
  const safeRaw = String(rawUrl || '').trim();
  if (!safeRaw) {
    return null;
  }

  try {
    const parsed = new URL(safeRaw);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }
    const hostname = parsed.hostname.replace(/^www\./, '');
    return {
      id: `att-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      type: 'url',
      name: hostname || parsed.toString(),
      url: parsed.toString(),
      path: '',
      mime: '',
      size: 0,
      addedAt: new Date().toISOString()
    };
  } catch (error) {
    return null;
  }
}

function clearSelection(render = true) {
  if (!state.ui.selectedTaskIds.size && !state.ui.selectionAnchorId) {
    return;
  }
  state.ui.selectedTaskIds.clear();
  state.ui.selectionAnchorId = '';
  if (render) {
    renderSelectionState();
  }
}

function renderSelectionState() {
  renderSidebar();
  if (state.ui.currentView === 'categories' || state.ui.currentView === 'settings') {
    return;
  }
  const cards = elements.taskList.querySelectorAll('.task-card[data-task-id]');
  cards.forEach((card) => {
    const taskId = card.dataset.taskId || '';
    card.classList.toggle('is-selected', state.ui.selectedTaskIds.has(taskId));
  });
}

function setSelection(taskId, mode = 'single') {
  const visibleIds = getVisibleTaskIds();
  if (!visibleIds.includes(taskId)) {
    return;
  }

  if (mode === 'toggle') {
    if (state.ui.selectedTaskIds.has(taskId)) {
      state.ui.selectedTaskIds.delete(taskId);
    } else {
      state.ui.selectedTaskIds.add(taskId);
    }
    state.ui.selectionAnchorId = taskId;
    renderSelectionState();
    return;
  }

  if (mode === 'range') {
    const anchorId = state.ui.selectionAnchorId || taskId;
    const start = visibleIds.indexOf(anchorId);
    const end = visibleIds.indexOf(taskId);
    if (start >= 0 && end >= 0) {
      const [from, to] = start <= end ? [start, end] : [end, start];
      state.ui.selectedTaskIds = new Set(visibleIds.slice(from, to + 1));
      renderSelectionState();
      return;
    }
  }

  state.ui.selectedTaskIds = new Set([taskId]);
  state.ui.selectionAnchorId = taskId;
  renderSelectionState();
}

function isEditableTarget(target) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  const tagName = target.tagName.toLowerCase();
  return (
    tagName === 'input' ||
    tagName === 'textarea' ||
    tagName === 'select' ||
    target.isContentEditable ||
    Boolean(target.closest('[contenteditable="true"]'))
  );
}

function createDialogMarkup(config) {
  const confirmClass = config.destructive ? 'app-button is-danger' : 'app-button is-primary';
  const cancelButton = config.cancelLabel
    ? `<button class="app-button is-ghost" type="button" data-dialog-action="cancel">${escapeHtml(config.cancelLabel)}</button>`
    : '';
  return `
    <div class="dialog-backdrop" role="presentation">
      <div class="dialog-card app-modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(config.title)}">
        <div>
          <h3>${escapeHtml(config.title)}</h3>
          ${config.message ? `<p>${escapeHtml(config.message)}</p>` : ''}
        </div>
        <div class="modal-actions">
          ${cancelButton}
          <button class="${confirmClass}" type="button" data-dialog-action="confirm">${escapeHtml(config.confirmLabel)}</button>
        </div>
      </div>
    </div>
  `;
}

function openDialog(config) {
  return new Promise((resolve) => {
    if (activeDialogCleanup) {
      activeDialogCleanup();
      activeDialogCleanup = null;
    }

    elements.dialogRoot.innerHTML = createDialogMarkup(config);
    const backdrop = elements.dialogRoot.querySelector('.dialog-backdrop');
    const dialogCard = elements.dialogRoot.querySelector('.dialog-card');
    const confirmButton = elements.dialogRoot.querySelector('[data-dialog-action="confirm"]');
    const cancelButton = elements.dialogRoot.querySelector('[data-dialog-action="cancel"]');

    const close = (value) => {
      cleanup();
      resolve(value);
    };

    const onBackdropMouseDown = (event) => {
      if (event.target === backdrop) {
        close(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        close(false);
      } else if (event.key === 'Enter') {
        const target = event.target;
        if (target instanceof HTMLElement && (target.tagName === 'TEXTAREA' || target.isContentEditable)) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        close(true);
      }
    };

    const cleanup = () => {
      if (!backdrop) {
        return;
      }
      backdrop.removeEventListener('mousedown', onBackdropMouseDown);
      document.removeEventListener('keydown', onKeyDown, true);
      confirmButton?.removeEventListener('click', onConfirm);
      cancelButton?.removeEventListener('click', onCancel);
      elements.dialogRoot.innerHTML = '';
      if (activeDialogCleanup === cleanup) {
        activeDialogCleanup = null;
      }
    };

    const onConfirm = () => close(true);
    const onCancel = () => close(false);

    backdrop.addEventListener('mousedown', onBackdropMouseDown);
    document.addEventListener('keydown', onKeyDown, true);
    confirmButton?.addEventListener('click', onConfirm);
    cancelButton?.addEventListener('click', onCancel);
    activeDialogCleanup = cleanup;

    if (dialogCard) {
      requestAnimationFrame(() => {
        confirmButton?.focus();
      });
    }
  });
}

async function showNotice(title, message) {
  await openDialog({
    title,
    message,
    confirmLabel: 'OK',
    cancelLabel: '',
    destructive: false
  });
}

// Wraps an IPC call so a failed bridge call surfaces a user-visible notice
// instead of an unhandled promise rejection. Returns `null` on failure so
// callers can early-return without touching undefined state.
async function safeIpc(operation, actionLabel) {
  try {
    return await operation();
  } catch (error) {
    console.error(`IPC operation failed (${actionLabel}):`, error);
    await showNotice(
      'Something went wrong',
      `Could not ${actionLabel}. ${error && error.message ? error.message : 'Please try again.'}`
    );
    return null;
  }
}

function closeFilterPopover() {
  if (!state.ui.filterPopoverOpen) {
    return;
  }
  state.ui.filterPopoverOpen = false;
  closeCustomSelectMenu();
  elements.filterPopover.style.left = '';
  elements.filterPopover.style.top = '';
  elements.filterPopover.style.width = '';
  elements.filterPopover.style.maxHeight = '';
  elements.filterPopover.style.transformOrigin = '';
  delete elements.filterPopover.dataset.placement;
  renderFilterControls();
}

function toggleFilterPopover() {
  state.ui.filterPopoverOpen = !state.ui.filterPopoverOpen;
  closeCustomSelectMenu();
  renderFilterControls();
}

function setCurrentView(viewId) {
  if (!VIEW_DEFINITIONS.some((view) => view.id === viewId)) {
    return;
  }
  state.ui.currentView = viewId;
  state.ui.filterPopoverOpen = false;
  closeCustomSelectMenu();
  if (viewId === 'settings' || viewId === 'categories') {
    clearSelection(false);
  }
  renderApp();
}

function openComposerForNewTask(focus = true) {
  if (['settings', 'categories'].includes(state.ui.currentView)) {
    state.ui.currentView = 'all';
  }
  state.ui.composerCollapsed = false;
  resetTaskDraft();
  renderApp();
  if (focus) {
    requestAnimationFrame(() => elements.titleInput.focus());
  }
}

function startEditingTask(taskId) {
  const task = getTaskById(taskId);
  if (!task) {
    return;
  }
  if (['settings', 'categories'].includes(state.ui.currentView)) {
    state.ui.currentView = task.status === 'done' ? 'completed' : 'all';
  }
  state.ui.composerCollapsed = false;
  setTaskDraftFromTask(task);
  state.ui.selectedTaskIds = new Set([task.id]);
  state.ui.selectionAnchorId = task.id;
  renderApp();
  requestAnimationFrame(() => elements.titleInput.focus());
}

function duplicateCurrentDraft() {
  if (!state.ui.editingTaskId) {
    return;
  }
  state.ui.editingTaskId = null;
  state.drafts.task.id = '';
  state.drafts.task.title = `${normalizeTaskTitle(state.drafts.task.title)} (copy)`.slice(0, 120);
  state.drafts.task.status = state.drafts.task.status === 'done' ? 'normal' : state.drafts.task.status;
  renderComposer();
  requestAnimationFrame(() => elements.titleInput.focus());
}

async function persistTaskDraft() {
  const payload = normalizeTaskDraftForSave();
  if (!payload) {
    await showNotice('Task title required', 'Enter a title before saving the task.');
    elements.titleInput.focus();
    return;
  }

  const savedState = await safeIpc(() => window.todoAPI.saveTask(payload), 'save this task');
  if (!savedState) return;
  const editedTaskId = state.ui.editingTaskId;
  applyPersistedState(savedState);
  resetTaskDraft();
  if (editedTaskId) {
    state.ui.selectedTaskIds = new Set([editedTaskId]);
    state.ui.selectionAnchorId = editedTaskId;
  }
  renderApp();
}

async function deleteTask(taskId) {
  const task = getTaskById(taskId);
  if (!task) {
    return;
  }
  const confirmed = await openDialog({
    title: 'Delete task?',
    message: `This will permanently remove "${task.title}".`,
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    destructive: true
  });
  if (!confirmed) {
    return;
  }
  const savedState = await safeIpc(() => window.todoAPI.deleteTask(taskId), 'delete this task');
  if (!savedState) return;
  applyPersistedState(savedState);
  renderApp();
}

async function deleteSelectedTasks() {
  if (!state.ui.selectedTaskIds.size) {
    return;
  }
  const confirmed = await openDialog({
    title: 'Delete selected tasks?',
    message: `Delete ${state.ui.selectedTaskIds.size} selected task${state.ui.selectedTaskIds.size === 1 ? '' : 's'} permanently.`,
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    destructive: true
  });
  if (!confirmed) {
    return;
  }
  const savedState = await safeIpc(
    () => window.todoAPI.deleteManyTasks([...state.ui.selectedTaskIds]),
    'delete the selected tasks'
  );
  if (!savedState) return;
  applyPersistedState(savedState);
  clearSelection(false);
  renderApp();
}

async function updateTaskStatus(taskId, status) {
  const task = getTaskById(taskId);
  if (!task) {
    return;
  }

  const payload = {
    ...task,
    status
  };
  const savedState = await safeIpc(() => window.todoAPI.saveTask(payload), 'update the task status');
  if (!savedState) return;
  applyPersistedState(savedState);
  renderApp();
}

async function clearCompletedTasks() {
  const completedCount = state.data.tasks.filter((task) => task.status === 'done').length;
  if (!completedCount) {
    return;
  }
  const confirmed = await openDialog({
    title: 'Clear completed tasks?',
    message: `This will delete ${completedCount} completed task${completedCount === 1 ? '' : 's'}.`,
    confirmLabel: 'Clear',
    cancelLabel: 'Cancel',
    destructive: true
  });
  if (!confirmed) {
    return;
  }
  const savedState = await safeIpc(() => window.todoAPI.clearDoneTasks(), 'clear completed tasks');
  if (!savedState) return;
  applyPersistedState(savedState);
  renderApp();
}


async function addDraftTaskUrlAttachment() {
  const attachment = buildUrlAttachment(elements.attachmentUrlInput.value);
  if (!attachment) {
    await showNotice('Invalid link', 'Add a valid http(s) URL.');
    return;
  }
  state.drafts.task.attachments = normalizeDraftAttachmentList([...state.drafts.task.attachments, attachment]);
  elements.attachmentUrlInput.value = '';
  renderDraftTaskAttachments();
  updateDraftStatusText();
}

async function addDraftTaskFileAttachment() {
  const attachment = await safeIpc(() => window.todoAPI.pickAttachmentFile(), 'pick a file');
  if (!attachment) {
    return;
  }
  state.drafts.task.attachments = normalizeDraftAttachmentList([...state.drafts.task.attachments, attachment]);
  renderDraftTaskAttachments();
  updateDraftStatusText();
}

async function addDraftCategoryUrlAttachment() {
  const attachment = buildUrlAttachment(elements.categoryAttachmentUrlInput.value);
  if (!attachment) {
    await showNotice('Invalid link', 'Add a valid http(s) URL.');
    return;
  }
  state.drafts.category.attachments = normalizeDraftAttachmentList([...state.drafts.category.attachments, attachment]);
  elements.categoryAttachmentUrlInput.value = '';
  renderDraftCategoryAttachments();
}

async function addDraftCategoryFileAttachment() {
  const attachment = await safeIpc(() => window.todoAPI.pickAttachmentFile(), 'pick a file');
  if (!attachment) {
    return;
  }
  state.drafts.category.attachments = normalizeDraftAttachmentList([...state.drafts.category.attachments, attachment]);
  renderDraftCategoryAttachments();
}

async function openAttachment(attachment) {
  if (!attachment) {
    return;
  }
  const result = await safeIpc(() => window.todoAPI.openAttachment(attachment), 'open the attachment');
  if (result === null) return; // safeIpc already surfaced the error
  if (!result?.ok) {
    await showNotice('Could not open attachment', result?.error || 'Unknown attachment error.');
  }
}

async function saveCategoryDraft() {
  const payload = normalizeCategoryDraftForSave();
  if (!payload) {
    await showNotice('Category name required', 'Enter a category name before saving.');
    elements.categoryNameInput.focus();
    return;
  }
  const savedState = await safeIpc(() => window.todoAPI.saveCategory(payload), 'save this category');
  if (!savedState) return;
  applyPersistedState(savedState);
  resetCategoryDraft();
  renderApp();
}

async function deleteCategory(categoryId) {
  const category = getCategoryById(categoryId);
  if (!category) {
    return;
  }
  const confirmed = await openDialog({
    title: 'Delete category?',
    message: `Tasks in "${category.name}" will stay in Velvet and become uncategorized.`,
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    destructive: true
  });
  if (!confirmed) {
    return;
  }

  const savedState = await safeIpc(() => window.todoAPI.deleteCategory(categoryId), 'delete this category');
  if (!savedState) return;
  applyPersistedState(savedState);
  if (state.filters.categoryId === categoryId) {
    state.filters.categoryId = 'all';
  }
  if (state.ui.editingCategoryId === categoryId) {
    resetCategoryDraft();
  }
  renderApp();
}

async function updateSettings(partialSettings) {
  const savedState = await safeIpc(() => window.todoAPI.updateSettings(partialSettings), 'update settings');
  if (!savedState) return;
  applyPersistedState(savedState);
  renderApp();
}

async function restoreAppearanceDefaults() {
  const confirmed = await openDialog({
    title: 'Restore appearance defaults?',
    message: 'This resets theme mode, accent, surfaces, density, typography, radius, shadow, motion, and sidebar width to Velvet defaults.',
    confirmLabel: 'Restore',
    cancelLabel: 'Cancel',
    destructive: true
  });
  if (!confirmed) {
    return;
  }
  await updateSettings(APPEARANCE_DEFAULTS);
}

function moveSelectionBy(offset) {
  const visibleIds = getVisibleTaskIds();
  if (!visibleIds.length) {
    return;
  }

  if (!state.ui.selectedTaskIds.size) {
    state.ui.selectedTaskIds = new Set([visibleIds[0]]);
    state.ui.selectionAnchorId = visibleIds[0];
    renderApp();
    return;
  }

  const anchor = state.ui.selectionAnchorId || [...state.ui.selectedTaskIds][0];
  const currentIndex = Math.max(0, visibleIds.indexOf(anchor));
  const nextIndex = Math.min(visibleIds.length - 1, Math.max(0, currentIndex + offset));
  const nextId = visibleIds[nextIndex];
  if (!nextId) {
    return;
  }
  state.ui.selectedTaskIds = new Set([nextId]);
  state.ui.selectionAnchorId = nextId;
  renderApp();
  requestAnimationFrame(() => {
    const card = elements.taskList.querySelector(`.task-card[data-task-id="${CSS.escape(nextId)}"]`);
    card?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
}

function applyDropIndicatorClasses() {
  const cards = elements.taskList.querySelectorAll('.task-card');
  cards.forEach((card) => {
    card.classList.remove('is-drop-before', 'is-drop-after');
    if (!state.ui.dragOverTaskId || card.dataset.taskId !== state.ui.dragOverTaskId) {
      return;
    }
    if (state.ui.dragPosition === 'before') {
      card.classList.add('is-drop-before');
    } else if (state.ui.dragPosition === 'after') {
      card.classList.add('is-drop-after');
    }
  });
}

function removeDropIndicators() {
  state.ui.dragOverTaskId = '';
  state.ui.dragPosition = '';
  applyDropIndicatorClasses();
}

function getDropPosition(taskCard, clientY) {
  const rect = taskCard.getBoundingClientRect();
  const midpoint = rect.top + rect.height / 2;
  return clientY < midpoint ? 'before' : 'after';
}

async function reorderVisibleTasks(draggedTaskId, targetTaskId, position) {
  if (!draggedTaskId || !targetTaskId || draggedTaskId === targetTaskId || state.filters.sort !== 'manual') {
    return;
  }

  const visibleIds = getVisibleTaskIds();
  if (!visibleIds.includes(draggedTaskId) || !visibleIds.includes(targetTaskId)) {
    return;
  }

  const reorderedVisible = visibleIds.filter((id) => id !== draggedTaskId);
  const targetIndex = reorderedVisible.indexOf(targetTaskId);
  const insertIndex = position === 'after' ? targetIndex + 1 : targetIndex;
  reorderedVisible.splice(insertIndex, 0, draggedTaskId);

  const visibleSet = new Set(visibleIds);
  const allManualIds = getAllTasksManualSorted().map((task) => task.id);
  let pointer = 0;
  const finalIds = allManualIds.map((taskId) => {
    if (!visibleSet.has(taskId)) {
      return taskId;
    }
    const id = reorderedVisible[pointer] || taskId;
    pointer += 1;
    return id;
  });

  const savedState = await safeIpc(() => window.todoAPI.reorderTasks(finalIds), 'reorder tasks');
  if (!savedState) return;
  applyPersistedState(savedState);
  renderApp();
}

async function handleTaskAction(taskId, action) {
  if (!taskId || !action) {
    return;
  }

  switch (action) {
    case 'edit':
      startEditingTask(taskId);
      break;
    case 'delete':
      await deleteTask(taskId);
      break;
    case 'mark-done':
      await updateTaskStatus(taskId, 'done');
      break;
    case 'mark-delayed':
      await updateTaskStatus(taskId, 'delayed');
      break;
    case 'mark-normal':
      await updateTaskStatus(taskId, 'normal');
      break;
    default:
      break;
  }
}

async function handleSecondaryAction(action) {
  if (action === 'clear-completed') {
    await clearCompletedTasks();
  }
}

function syncDraftFromComposerInputs() {
  state.drafts.task.title = elements.titleInput.value;
  state.drafts.task.notes = elements.notesInput.value;
  state.drafts.task.dueDate = elements.dueDateInput.value;
  state.drafts.task.dueTime = elements.dueTimeInput.value;
  state.drafts.task.priority = elements.priorityInput.value;
  state.drafts.task.status = elements.statusInput.value;
  state.drafts.task.categoryId = elements.categoryInput.value;
  state.drafts.task.reminderEnabled = Boolean(elements.reminderEnabledInput.checked);
  state.drafts.task.reminderAt = elements.reminderAtInput.value;
  state.drafts.task.tags = elements.tagsInput.value;
}

function bindDraftInputListeners() {
  const onInput = () => {
    syncDraftFromComposerInputs();
    updateDraftStatusText();
  };

  elements.titleInput.addEventListener('input', onInput);
  elements.notesInput.addEventListener('input', onInput);
  elements.dueDateInput.addEventListener('input', onInput);
  elements.dueTimeInput.addEventListener('input', onInput);
  elements.priorityInput.addEventListener('change', onInput);
  elements.statusInput.addEventListener('change', onInput);
  elements.categoryInput.addEventListener('change', onInput);
  elements.tagsInput.addEventListener('input', onInput);
  elements.reminderAtInput.addEventListener('input', onInput);

  elements.reminderEnabledInput.addEventListener('change', () => {
    state.drafts.task.reminderEnabled = Boolean(elements.reminderEnabledInput.checked);
    if (!state.drafts.task.reminderEnabled) {
      state.drafts.task.reminderAt = '';
    }
    renderComposer();
  });
}

function bindStaticEvents() {
  elements.viewNav.addEventListener('click', (event) => {
    const button = event.target.closest('[data-view]');
    if (!button) {
      return;
    }
    setCurrentView(button.dataset.view);
  });

  elements.filterButton.addEventListener('click', () => {
    toggleFilterPopover();
  });

  elements.togglePulseButton?.addEventListener('click', () => {
    state.ui.pulseCollapsed = !state.ui.pulseCollapsed;
    renderSidebar();
  });

  elements.clearFiltersButton.addEventListener('click', () => {
    state.filters = createDefaultFilters();
    renderApp();
  });

  elements.searchInput.addEventListener('input', () => {
    state.filters.search = elements.searchInput.value;
    renderApp();
  });

  elements.statusFilter.addEventListener('change', () => {
    state.filters.status = elements.statusFilter.value;
    renderApp();
  });

  elements.priorityFilter.addEventListener('change', () => {
    state.filters.priority = elements.priorityFilter.value;
    renderApp();
  });

  elements.categoryFilter.addEventListener('change', () => {
    state.filters.categoryId = elements.categoryFilter.value;
    renderApp();
  });

  elements.sortSelect.addEventListener('change', () => {
    state.filters.sort = elements.sortSelect.value;
    renderApp();
  });

  elements.newTaskButton.addEventListener('click', () => {
    openComposerForNewTask(true);
  });

  elements.openQuickAddButton.addEventListener('click', async () => {
    const result = await safeIpc(() => window.todoAPI.openQuickAddWindow(), 'open Quick Add');
    if (result === null) return; // safeIpc already surfaced the error
    if (!result?.ok) {
      await showNotice('Quick Add unavailable', result?.error || 'Could not open Quick Add window.');
    }
  });

  elements.toggleComposerButton.addEventListener('click', () => {
    state.ui.composerCollapsed = !state.ui.composerCollapsed;
    renderComposer();
  });

  elements.secondaryActionButton.addEventListener('click', async () => {
    await handleSecondaryAction(elements.secondaryActionButton.dataset.secondaryAction || '');
  });

  elements.taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await persistTaskDraft();
  });

  elements.clearDraftButton.addEventListener('click', () => {
    resetTaskDraft();
    renderComposer();
  });

  elements.cancelEditButton.addEventListener('click', () => {
    resetTaskDraft();
    renderComposer();
  });

  elements.duplicateTaskButton.addEventListener('click', () => {
    duplicateCurrentDraft();
  });

  elements.addUrlAttachmentButton.addEventListener('click', async () => {
    await addDraftTaskUrlAttachment();
  });

  elements.addFileAttachmentButton.addEventListener('click', async () => {
    await addDraftTaskFileAttachment();
  });

  elements.draftAttachmentList.addEventListener('click', async (event) => {
    const actionButton = event.target.closest('button[data-action]');
    if (!actionButton) {
      return;
    }
    const action = actionButton.dataset.action;
    const index = Number(actionButton.dataset.index || -1);
    if (!Number.isInteger(index) || index < 0) {
      return;
    }
    const attachment = state.drafts.task.attachments[index];
    if (!attachment) {
      return;
    }
    if (action === 'draft-task-attachment-open') {
      await openAttachment(attachment);
      return;
    }
    if (action === 'draft-task-attachment-remove') {
      state.drafts.task.attachments.splice(index, 1);
      renderDraftTaskAttachments();
      updateDraftStatusText();
    }
  });

  bindDraftInputListeners();

  elements.categoryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveCategoryDraft();
  });

  elements.categoryNameInput.addEventListener('input', () => {
    state.drafts.category.name = elements.categoryNameInput.value;
  });

  elements.categoryColorInput.addEventListener('input', () => {
    state.drafts.category.color = elements.categoryColorInput.value;
  });

  elements.cancelCategoryEditButton.addEventListener('click', () => {
    resetCategoryDraft();
    renderCategoryComposer();
  });

  elements.addCategoryUrlAttachmentButton.addEventListener('click', async () => {
    await addDraftCategoryUrlAttachment();
  });

  elements.addCategoryFileAttachmentButton.addEventListener('click', async () => {
    await addDraftCategoryFileAttachment();
  });

  elements.categoryAttachmentDraftList.addEventListener('click', async (event) => {
    const actionButton = event.target.closest('button[data-action]');
    if (!actionButton) {
      return;
    }
    const action = actionButton.dataset.action;
    const index = Number(actionButton.dataset.index || -1);
    if (!Number.isInteger(index) || index < 0) {
      return;
    }
    const attachment = state.drafts.category.attachments[index];
    if (!attachment) {
      return;
    }
    if (action === 'draft-category-attachment-open') {
      await openAttachment(attachment);
      return;
    }
    if (action === 'draft-category-attachment-remove') {
      state.drafts.category.attachments.splice(index, 1);
      renderDraftCategoryAttachments();
    }
  });

  elements.categoryList.addEventListener('click', async (event) => {
    const actionButton = event.target.closest('button[data-category-action]');
    if (actionButton) {
      const categoryId = actionButton.dataset.categoryId;
      const action = actionButton.dataset.categoryAction;
      if (action === 'edit') {
        const category = getCategoryById(categoryId);
        if (category) {
          setCategoryDraftFromCategory(category);
          renderCategoryComposer();
          requestAnimationFrame(() => elements.categoryNameInput.focus());
        }
      } else if (action === 'delete') {
        await deleteCategory(categoryId);
      } else if (action === 'focus') {
        state.filters.categoryId = categoryId;
        state.ui.currentView = 'all';
        renderApp();
      }
      return;
    }

    const attachmentButton = event.target.closest('button[data-action="category-attachment-open"]');
    if (attachmentButton) {
      const category = getCategoryById(attachmentButton.dataset.parentId || '');
      const index = Number(attachmentButton.dataset.index || -1);
      if (category && Number.isInteger(index) && index >= 0) {
        await openAttachment(category.attachments[index]);
      }
    }
  });

  elements.categoryGroups.addEventListener('click', (event) => {
    const button = event.target.closest('[data-group-task-open]');
    if (!button) {
      return;
    }
    const taskId = button.dataset.groupTaskOpen;
    if (taskId) {
      state.ui.currentView = 'all';
      startEditingTask(taskId);
    }
  });

  elements.settingsView.addEventListener('click', async (event) => {
    const settingButton = event.target.closest('button[data-setting-key][data-setting-value]');
    if (!settingButton) {
      return;
    }
    const key = settingButton.dataset.settingKey;
    const value = settingButton.dataset.settingValue;
    if (!settingsOptionSets[key]) {
      return;
    }
    await updateSettings({ [key]: value });
  });

  elements.trayCloseToggle.addEventListener('change', async () => {
    await updateSettings({ trayOnClose: elements.trayCloseToggle.checked });
  });

  elements.trayMinimizeToggle.addEventListener('change', async () => {
    await updateSettings({ trayOnMinimize: elements.trayMinimizeToggle.checked });
  });

  elements.openStorageButton.addEventListener('click', async () => {
    const result = await safeIpc(() => window.todoAPI.openStorageFolder(), 'open the storage folder');
    if (result === null) return; // safeIpc already surfaced the error
    if (!result?.ok) {
      await showNotice('Could not open storage folder', result?.error || 'Unknown error.');
    }
  });

  elements.restoreThemeDefaultsButton.addEventListener('click', async () => {
    await restoreAppearanceDefaults();
  });

  elements.taskList.addEventListener('click', async (event) => {
    const actionButton = event.target.closest('button[data-task-action]');
    if (actionButton) {
      await handleTaskAction(actionButton.dataset.taskId, actionButton.dataset.taskAction);
      return;
    }

    const attachmentButton = event.target.closest('button[data-action="task-attachment-open"]');
    if (attachmentButton) {
      const taskId = attachmentButton.dataset.parentId || '';
      const index = Number(attachmentButton.dataset.index || -1);
      const task = getTaskById(taskId);
      if (task && Number.isInteger(index) && index >= 0) {
        await openAttachment(task.attachments[index]);
      }
      return;
    }

    if (event.target.closest('button, a, input, select, textarea, label')) {
      return;
    }
    const taskCard = event.target.closest('.task-card[data-task-id]');
    if (!taskCard) {
      return;
    }
    const taskId = taskCard.dataset.taskId;
    if (!taskId) {
      return;
    }
    if (event.shiftKey) {
      setSelection(taskId, 'range');
      return;
    }
    if (event.ctrlKey || event.metaKey) {
      setSelection(taskId, 'toggle');
      return;
    }
    setSelection(taskId, 'single');
  });

  elements.taskList.addEventListener('dragstart', (event) => {
    const taskCard = event.target.closest('.task-card[data-task-id]');
    if (!taskCard || state.filters.sort !== 'manual') {
      event.preventDefault();
      return;
    }
    state.ui.dragTaskId = taskCard.dataset.taskId || '';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', state.ui.dragTaskId);
  });

  elements.taskList.addEventListener('dragover', (event) => {
    if (!state.ui.dragTaskId || state.filters.sort !== 'manual') {
      return;
    }
    const taskCard = event.target.closest('.task-card[data-task-id]');
    if (!taskCard || taskCard.dataset.taskId === state.ui.dragTaskId) {
      return;
    }
    event.preventDefault();
    state.ui.dragOverTaskId = taskCard.dataset.taskId || '';
    state.ui.dragPosition = getDropPosition(taskCard, event.clientY);
    applyDropIndicatorClasses();
  });

  elements.taskList.addEventListener('drop', async (event) => {
    if (!state.ui.dragTaskId || state.filters.sort !== 'manual') {
      return;
    }
    const taskCard = event.target.closest('.task-card[data-task-id]');
    if (!taskCard) {
      return;
    }
    event.preventDefault();
    const targetId = taskCard.dataset.taskId || '';
    const position = getDropPosition(taskCard, event.clientY);
    const draggedTaskId = state.ui.dragTaskId;
    state.ui.dragTaskId = '';
    removeDropIndicators();
    await reorderVisibleTasks(draggedTaskId, targetId, position);
  });

  elements.taskList.addEventListener('dragend', () => {
    state.ui.dragTaskId = '';
    removeDropIndicators();
  });
}

function bindGlobalEvents() {
  const handleFloatingLayerReposition = () => {
    if (!state.ui.filterPopoverOpen && !state.ui.openSelectId) {
      return;
    }
    syncFloatingLayers();
  };

  document.addEventListener('mousedown', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (state.ui.openSelectId && !target.closest('.app-selectbox') && !target.closest('.app-select-menu')) {
      closeCustomSelectMenu();
    }

    if (
      state.ui.filterPopoverOpen &&
      !target.closest('#filterPopover') &&
      !target.closest('#filterButton') &&
      !target.closest('.app-select-menu')
    ) {
      closeFilterPopover();
    }

    if (
      state.ui.selectedTaskIds.size &&
      !target.closest('.task-card') &&
      !target.closest('.dialog-card')
    ) {
      clearSelection();
    }
  });

  window.addEventListener('resize', handleFloatingLayerReposition);
  window.addEventListener('scroll', handleFloatingLayerReposition, true);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', handleFloatingLayerReposition);
    window.visualViewport.addEventListener('scroll', handleFloatingLayerReposition);
  }

  window.addEventListener('keydown', async (event) => {
    if (state.ui.openSelectId) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeCustomSelectMenu();
      }
      return;
    }

    if (event.ctrlKey && !event.shiftKey && !event.altKey && event.key.toLowerCase() === 'n') {
      event.preventDefault();
      openComposerForNewTask(true);
      return;
    }

    if (event.key === 'Escape') {
      if (state.ui.openSelectId) {
        event.preventDefault();
        closeCustomSelectMenu();
        return;
      }
      if (state.ui.filterPopoverOpen) {
        event.preventDefault();
        closeFilterPopover();
        return;
      }
      if (state.ui.selectedTaskIds.size) {
        event.preventDefault();
        clearSelection();
      }
      return;
    }

    const activeElement = document.activeElement;
    if (isEditableTarget(activeElement)) {
      return;
    }

    if (event.key === 'Delete' && state.ui.selectedTaskIds.size) {
      event.preventDefault();
      await deleteSelectedTasks();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveSelectionBy(1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveSelectionBy(-1);
      return;
    }

    if (event.key === 'Enter' && state.ui.selectedTaskIds.size === 1) {
      event.preventDefault();
      const taskId = [...state.ui.selectedTaskIds][0];
      startEditingTask(taskId);
    }
  });
}

function onAddTaskCommand() {
  openComposerForNewTask(true);
}

function onReminderOpenTask(taskId) {
  const task = getTaskById(taskId);
  if (!task) {
    return;
  }
  state.ui.currentView = task.status === 'done' ? 'completed' : 'all';
  state.ui.selectedTaskIds = new Set([taskId]);
  state.ui.selectionAnchorId = taskId;
  startEditingTask(taskId);
}

function onExternalStateChanged(nextState) {
  applyPersistedState(nextState);
  renderApp();
}

function onShortcutStatus(status) {
  if (!status || typeof status !== 'object') {
    return;
  }
  state.ui.shortcutStatus = {
    requested: status.requested || state.data.settings.quickAddShortcut || DEFAULT_SETTINGS.quickAddShortcut,
    active: status.active || '',
    registered: Boolean(status.registered),
    error: status.error || ''
  };
  if (state.ui.currentView === 'settings') {
    renderSettingsView();
    renderHeader();
  } else {
    renderHeader();
  }
}

async function bootstrapApp() {
  const payload = await window.todoAPI.bootstrap();
  if (!payload || typeof payload !== 'object') {
    throw new Error('Bootstrap payload missing.');
  }

  applyPersistedState(payload.state);
  state.meta = {
    version: payload.meta?.version || '',
    userDataPath: payload.meta?.userDataPath || '',
    appName: payload.meta?.appName || 'Velvet'
  };
  onShortcutStatus(payload.meta?.shortcutStatus);
}

function renderFatalError(errorMessage) {
  document.body.innerHTML = `
    <main class="app-shell">
      <section class="app-card" style="margin:auto;max-width:720px;padding:28px;">
        <h1 style="margin-bottom:10px;">Velvet failed to start</h1>
        <p style="line-height:1.6;">${escapeHtml(errorMessage)}</p>
      </section>
    </main>
  `;
}

async function init() {
  if (!window.todoAPI) {
    renderFatalError('The preload bridge is unavailable. Check Electron preload configuration.');
    return;
  }

  await bootstrapApp();
  ensureFloatingLayerMounts();
  if (elements.filterIconGlyph) {
    elements.filterIconGlyph.textContent = '\u2630';
  }
  bindStaticEvents();
  bindGlobalEvents();

  removeAddTaskCommandListener = window.todoAPI.onAddTaskCommand(onAddTaskCommand);
  removeReminderListener = window.todoAPI.onReminderOpenTask(onReminderOpenTask);
  removeStateChangedListener = window.todoAPI.onStateChanged(onExternalStateChanged);
  removeShortcutStatusListener = window.todoAPI.onShortcutStatus(onShortcutStatus);

  try {
    const latestStatus = await window.todoAPI.getShortcutStatus();
    onShortcutStatus(latestStatus);
  } catch (error) {
    // Non-critical: the shortcut-status broadcast will still fire when it's ready.
    console.error('Failed to fetch initial shortcut status:', error);
  }

  renderApp();
}

window.addEventListener('beforeunload', () => {
  removeAddTaskCommandListener?.();
  removeReminderListener?.();
  removeStateChangedListener?.();
  removeShortcutStatusListener?.();
  removeAddTaskCommandListener = null;
  removeReminderListener = null;
  removeStateChangedListener = null;
  removeShortcutStatusListener = null;
  if (activeDialogCleanup) {
    activeDialogCleanup();
    activeDialogCleanup = null;
  }
});

init().catch((error) => {
  renderFatalError(error?.message || 'Unknown initialization error.');
});
