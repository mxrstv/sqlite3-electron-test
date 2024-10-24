const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  requestData: () => ipcRenderer.invoke('request-data'),
  onReloadData: (callback) => ipcRenderer.on('reload-data', () => callback()),
  insertHero: (arg) => ipcRenderer.send('insertHero', arg),
  openCreateForm: () => ipcRenderer.send('openCreateForm'),
  // closeMe: (event) => ipcRenderer.send('closeMe', event),
});
