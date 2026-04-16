const state = {
  line: '',
  parsed: null,
  categories: [],
  settings: {},
  previewTimer: null,
  previewRequestId: 0
};

const elements = {
  quickAddInput: document.getElementById('quickAddInput'),
  quickAddPreview: document.getElementById('quickAddPreview'),
  quickAddStatus: document.getElementById('quickAddStatus')
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function setStatus(text, tone = '') {
  elements.quickAddStatus.textContent = text;
  elements.quickAddStatus.classList.remove('quick-add-status-ok', 'quick-add-status-error');
  if (tone === 'ok') {
    elements.quickAddStatus.classList.add('quick-add-status-ok');
  } else if (tone === 'error') {
    elements.quickAddStatus.classList.add('quick-add-status-error');
  }
}

function applyThemeFromSettings(settings = {}) {
  document.documentElement.dataset.theme = settings.themeMode || 'dark';
  document.documentElement.dataset.accent = settings.accent || 'violet';
  document.documentElement.dataset.surface = settings.surface || 'glass';
  document.documentElement.dataset.density = settings.density || 'comfortable';
  document.documentElement.dataset.font = settings.font || 'segoe';
  document.documentElement.dataset.radius = settings.radius || 'medium';
  document.documentElement.dataset.shadow = settings.shadow || 'balanced';
  document.documentElement.dataset.motion = settings.motion || 'normal';
}

function getCategoryName(categoryId) {
  return state.categories.find((category) => category.id === categoryId)?.name || '';
}

function renderPreview() {
  if (!state.line.trim()) {
    elements.quickAddPreview.innerHTML = '<span class="chip tag">Type a task and press Enter</span>';
    setStatus('Enter to save | Esc to close');
    return;
  }

  if (!state.parsed || !state.parsed.title) {
    elements.quickAddPreview.innerHTML = '<span class="chip overdue">Could not parse title yet</span>';
    setStatus('Keep typing. Velvet will parse title/date/priority/category when possible.');
    return;
  }

  const chips = [];
  chips.push(`<span class="chip status-normal">${escapeHtml(state.parsed.title)}</span>`);
  chips.push(`<span class="chip priority-${escapeHtml(state.parsed.priority || 'medium')}">${escapeHtml((state.parsed.priority || 'medium').toUpperCase())}</span>`);

  if (state.parsed.dueDate) {
    const dueText = state.parsed.dueTime
      ? `${state.parsed.dueDate} ${state.parsed.dueTime}`
      : state.parsed.dueDate;
    chips.push(`<span class="chip tag">Due ${escapeHtml(dueText)}</span>`);
  }

  const categoryName = getCategoryName(state.parsed.categoryId);
  if (categoryName) {
    chips.push(`<span class="chip tag">Category: ${escapeHtml(categoryName)}</span>`);
  }

  if (Array.isArray(state.parsed.tags) && state.parsed.tags.length) {
    chips.push(...state.parsed.tags.map((tag) => `<span class="chip tag">#${escapeHtml(tag)}</span>`));
  }

  elements.quickAddPreview.innerHTML = chips.join('');
  setStatus('Press Enter to create task');
}

async function requestPreview() {
  const requestId = ++state.previewRequestId;
  const line = state.line.trim();
  if (!line) {
    state.parsed = null;
    renderPreview();
    return;
  }
  const response = await window.todoAPI.previewQuickAddLine(line);
  if (requestId !== state.previewRequestId) {
    return;
  }
  state.parsed = response?.parsed || null;
  renderPreview();
}

function queuePreview() {
  if (state.previewTimer) {
    clearTimeout(state.previewTimer);
  }
  state.previewTimer = setTimeout(() => {
    state.previewTimer = null;
    requestPreview().catch(() => {
      setStatus('Preview unavailable right now.', 'error');
    });
  }, 120);
}

function focusInput(selectAll = true) {
  requestAnimationFrame(() => {
    elements.quickAddInput.focus();
    if (selectAll) {
      elements.quickAddInput.select();
    }
  });
}

async function createTask() {
  if (!state.line.trim()) {
    setStatus('Type a task title first.', 'error');
    return;
  }
  const result = await window.todoAPI.createQuickAddTask(state.line);
  if (!result?.ok) {
    setStatus(result?.error || 'Failed to create task.', 'error');
    return;
  }
  setStatus('Task created.', 'ok');
  state.line = '';
  state.parsed = null;
  elements.quickAddInput.value = '';
  renderPreview();
  setTimeout(() => {
    window.todoAPI.closeQuickAddWindow();
  }, 140);
}

function applyContext(context) {
  if (!context || typeof context !== 'object') {
    return;
  }
  state.categories = Array.isArray(context.categories) ? context.categories : [];
  state.settings = context.settings || {};
  applyThemeFromSettings(state.settings);
  renderPreview();
}

function bindEvents() {
  elements.quickAddInput.addEventListener('input', () => {
    state.line = elements.quickAddInput.value;
    queuePreview();
  });

  elements.quickAddInput.addEventListener('keydown', async (event) => {
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
    if (event.key === 'Escape' && document.activeElement !== elements.quickAddInput) {
      event.preventDefault();
      await window.todoAPI.closeQuickAddWindow();
    }
  });

  document.body.addEventListener('mousedown', async (event) => {
    if (event.target === document.body || event.target === document.documentElement) {
      await window.todoAPI.closeQuickAddWindow();
    }
  });

  window.todoAPI.onQuickAddFocus(() => {
    focusInput(true);
  });
  window.todoAPI.onQuickAddClose(() => {
    state.line = '';
    state.parsed = null;
    elements.quickAddInput.value = '';
    renderPreview();
  });
  window.todoAPI.onQuickAddContext((context) => {
    applyContext(context);
    queuePreview();
  });
}

async function init() {
  const context = await window.todoAPI.getQuickAddContext();
  applyContext(context);
  renderPreview();
  bindEvents();
  focusInput(true);
}

init().catch(() => {
  setStatus('Quick Add failed to initialize.', 'error');
});


