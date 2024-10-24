const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  requestData: () => ipcRenderer.invoke('request-data'),
  onReloadData: (callback) => ipcRenderer.on('reload-data', () => callback()),
  insertUser: (arg) => ipcRenderer.send('insertUser', arg),
  openCreateForm: () => ipcRenderer.send('openCreateForm'),
  // closeMe: (event) => ipcRenderer.send('closeMe', event),
});
