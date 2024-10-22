const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./test.db');

const getDataFromDB = async () => {
  return new Promise ((res) => {
    db.all("SELECT * FROM heroes", (err, rows) => {
      res(rows);
    });
  });
};
let win;
const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.loadFile('index.html');
  win.webContents.openDevTools();
}

const createNewHeroWindow= () => {
  const childWin = new BrowserWindow({
    width: 400,
    height: 200,
    autoHideMenuBar: true,
    resizable: false,
    parent: win,
    modal: true,
  });
  childWin.loadFile('form-new-hero.html')
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('test', getDataFromDB);
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  ipcMain.on('openCreateForm', (event, arg) => {
    createNewHeroWindow();
  });

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});