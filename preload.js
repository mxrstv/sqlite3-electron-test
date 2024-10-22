const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  requestData: () => ipcRenderer.invoke('test'),
  openCreateForm: () => ipcRenderer.send('openCreateForm'),
});