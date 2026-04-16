const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('todoAPI', {
  bootstrap: () => ipcRenderer.invoke('app:bootstrap'),
  getShortcutStatus: () => ipcRenderer.invoke('app:get-shortcut-status'),
  openQuickAddWindow: () => ipcRenderer.invoke('app:open-quick-add'),
  saveTask: (task) => ipcRenderer.invoke('tasks:save', task),
  deleteTask: (taskId) => ipcRenderer.invoke('tasks:delete', taskId),
  deleteManyTasks: (taskIds) => ipcRenderer.invoke('tasks:delete-many', taskIds),
  bulkUpdateTaskStatus: (taskIds, status) => ipcRenderer.invoke('tasks:bulk-status', { taskIds, status }),
  reorderTasks: (orderedTaskIds) => ipcRenderer.invoke('tasks:reorder', orderedTaskIds),
  clearDoneTasks: () => ipcRenderer.invoke('tasks:clear-done'),
  saveCategory: (category) => ipcRenderer.invoke('categories:save', category),
  deleteCategory: (categoryId) => ipcRenderer.invoke('categories:delete', categoryId),
  updateSettings: (settings) => ipcRenderer.invoke('settings:update', settings),
  pickAttachmentFile: () => ipcRenderer.invoke('attachments:pick-file'),
  openAttachment: (attachment) => ipcRenderer.invoke('attachments:open', attachment),
  openStorageFolder: () => ipcRenderer.invoke('app:open-storage-folder'),
  getQuickAddContext: () => ipcRenderer.invoke('quickAdd:get-context'),
  previewQuickAddLine: (line) => ipcRenderer.invoke('quickAdd:preview', line),
  createQuickAddTask: (line) => ipcRenderer.invoke('quickAdd:create', line),
  closeQuickAddWindow: () => ipcRenderer.invoke('quickAdd:close'),
  signalQuickAddReady: () => ipcRenderer.send('quickAdd:renderer-ready'),
  onAddTaskCommand: (handler) => {
    if (typeof handler !== 'function') {
      return () => {};
    }
    const listener = () => handler();
    ipcRenderer.on('app:add-task-command', listener);
    return () => ipcRenderer.removeListener('app:add-task-command', listener);
  },
  onReminderOpenTask: (handler) => {
    if (typeof handler !== 'function') {
      return () => {};
    }
    const listener = (_event, taskId) => handler(taskId);
    ipcRenderer.on('reminder:open-task', listener);
    return () => ipcRenderer.removeListener('reminder:open-task', listener);
  },
  onShortcutStatus: (handler) => {
    if (typeof handler !== 'function') {
      return () => {};
    }
    const listener = (_event, payload) => handler(payload);
    ipcRenderer.on('quick-add:shortcut-status', listener);
    return () => ipcRenderer.removeListener('quick-add:shortcut-status', listener);
  },
  onStateChanged: (handler) => {
    if (typeof handler !== 'function') {
      return () => {};
    }
    const listener = (_event, payload) => handler(payload);
    ipcRenderer.on('state:changed', listener);
    return () => ipcRenderer.removeListener('state:changed', listener);
  },
  onQuickAddFocus: (handler) => {
    if (typeof handler !== 'function') {
      return () => {};
    }
    const listener = () => handler();
    ipcRenderer.on('quick-add:focus', listener);
    return () => ipcRenderer.removeListener('quick-add:focus', listener);
  },
  onQuickAddClose: (handler) => {
    if (typeof handler !== 'function') {
      return () => {};
    }
    const listener = () => handler();
    ipcRenderer.on('quick-add:close', listener);
    return () => ipcRenderer.removeListener('quick-add:close', listener);
  },
  onQuickAddContext: (handler) => {
    if (typeof handler !== 'function') {
      return () => {};
    }
    const listener = (_event, payload) => handler(payload);
    ipcRenderer.on('quick-add:context', listener);
    return () => ipcRenderer.removeListener('quick-add:context', listener);
  }
});
