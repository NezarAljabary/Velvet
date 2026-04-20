const state = {
  line: '',
  parsed: null,
  categories: [],
  settings: {},
  previewTimer: null,
  previewToken: 0
};

const elements = {
  input: document.getElementById('qaInput'),
  preview: document.getElementById('qaPreview'),
  status: document.getElementById('qaStatus')
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function applyTheme(settings = {}) {
  document.documentElement.dataset.theme = settings.themeMode || 'dark';
  document.documentElement.dataset.accent = settings.accent || 'violet';
  document.documentElement.dataset.surface = settings.surface || 'glass';
  document.documentElement.dataset.density = settings.density || 'comfortable';
  document.documentElement.dataset.font = settings.font || 'segoe';
  document.documentElement.dataset.radius = settings.radius || 'medium';
  document.documentElement.dataset.shadow = settings.shadow || 'balanced';
  document.documentElement.dataset.motion = settings.motion || 'normal';
}

function setStatus(text, tone = '') {
  elements.status.textContent = text;
  elements.status.classList.remove('is-ok', 'is-error');
  if (tone === 'ok') {
    elements.status.classList.add('is-ok');
  } else if (tone === 'error') {
    elements.status.classList.add('is-error');
  }
}

function getCategoryName(categoryId) {
  return state.categories.find((category) => category.id === categoryId)?.name || '';
}

function renderPreview() {
  const line = state.line.trim();
  if (!line) {
    elements.preview.innerHTML = '<span class="qa-chip qa-chip--empty">Type a task and press Enter</span>';
    setStatus('Enter to save | Esc to close');
    return;
  }

  if (!state.parsed || !state.parsed.title) {
    elements.preview.innerHTML = '<span class="qa-chip qa-chip--error">Parsing task details…</span>';
    setStatus('Keep typing. Velvet will detect date, priority, category, and tags.');
    return;
  }

  const chips = [];
  chips.push(`<span class="qa-chip qa-chip--title">${escapeHtml(state.parsed.title)}</span>`);
  chips.push(`<span class="qa-chip qa-chip--priority">${escapeHtml((state.parsed.priority || 'medium').toUpperCase())}</span>`);

  if (state.parsed.dueDate) {
    const dueText = state.parsed.dueTime ? `${state.parsed.dueDate} ${state.parsed.dueTime}` : state.parsed.dueDate;
    chips.push(`<span class="qa-chip qa-chip--meta">Due ${escapeHtml(dueText)}</span>`);
  }

  const categoryName = getCategoryName(state.parsed.categoryId);
  if (categoryName) {
    chips.push(`<span class="qa-chip qa-chip--meta">Category: ${escapeHtml(categoryName)}</span>`);
  }

  if (Array.isArray(state.parsed.tags) && state.parsed.tags.length) {
    chips.push(...state.parsed.tags.map((tag) => `<span class="qa-chip qa-chip--tag">#${escapeHtml(tag)}</span>`));
  }

  elements.preview.innerHTML = chips.join('');
  setStatus('Press Enter to create task');
}

async function requestPreview() {
  const token = ++state.previewToken;
  const line = state.line.trim();
  if (!line) {
    state.parsed = null;
    renderPreview();
    return;
  }

  try {
    const response = await window.todoAPI.previewQuickAddLine(line);
    if (token !== state.previewToken) {
      return;
    }
    state.parsed = response?.parsed || null;
    renderPreview();
  } catch (error) {
    if (token !== state.previewToken) {
      return;
    }
    state.parsed = null;
    elements.preview.innerHTML = '<span class="qa-chip qa-chip--error">Preview unavailable</span>';
    setStatus('Preview failed. You can still press Enter to create.', 'error');
  }
}

function schedulePreview() {
  if (state.previewTimer) {
    clearTimeout(state.previewTimer);
  }
  state.previewTimer = setTimeout(() => {
    state.previewTimer = null;
    requestPreview();
  }, 110);
}

function focusInput(selectAll = true) {
  requestAnimationFrame(() => {
    elements.input.focus();
    if (selectAll) {
      elements.input.select();
    }
  });
}

async function createTask() {
  const line = state.line.trim();
  if (!line) {
    setStatus('Type a task title first.', 'error');
    return;
  }

  let result;
  try {
    result = await window.todoAPI.createQuickAddTask(line);
  } catch (error) {
    setStatus(error?.message || 'Failed to create task.', 'error');
    return;
  }
  if (!result?.ok) {
    setStatus(result?.error || 'Failed to create task.', 'error');
    return;
  }

  setStatus('Task created.', 'ok');
  state.line = '';
  state.parsed = null;
  elements.input.value = '';
  renderPreview();
  setTimeout(() => {
    window.todoAPI.closeQuickAddWindow();
  }, 120);
}

function applyContext(context) {
  if (!context || typeof context !== 'object') {
    return;
  }
  state.categories = Array.isArray(context.categories) ? context.categories : [];
  state.settings = context.settings && typeof context.settings === 'object' ? context.settings : {};
  applyTheme(state.settings);
  renderPreview();
}

function bindEvents() {
  elements.input.addEventListener('input', () => {
    state.line = elements.input.value;
    schedulePreview();
  });

  elements.input.addEventListener('keydown', async (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      await window.todoAPI.closeQuickAddWindow();
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      await createTask();
    }
  });

  document.addEventListener('keydown', async (event) => {
    if (event.key === 'Escape' && document.activeElement !== elements.input) {
      event.preventDefault();
      await window.todoAPI.closeQuickAddWindow();
    }
  });

  window.todoAPI.onQuickAddFocus(() => {
    focusInput(true);
  });

  window.todoAPI.onQuickAddClose(() => {
    state.line = '';
    state.parsed = null;
    elements.input.value = '';
    renderPreview();
  });

  window.todoAPI.onQuickAddContext((context) => {
    applyContext(context);
    schedulePreview();
  });
}

async function init() {
  const context = await window.todoAPI.getQuickAddContext();
  applyContext(context);
  bindEvents();
  renderPreview();
  requestAnimationFrame(() => {
    window.todoAPI.signalQuickAddReady?.();
    focusInput(true);
  });
}

init().catch(() => {
  elements.preview.innerHTML = '<span class="qa-chip qa-chip--error">Quick Add failed to initialize</span>';
  setStatus('Quick Add failed to initialize.', 'error');
});
