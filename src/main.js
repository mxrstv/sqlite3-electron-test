const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/test.db');

const getDataFromDB = async () => {
  return new Promise ((res) => {
    db.all("SELECT * FROM users", (err, rows) => {
      res(rows);
    });
  });
};

// const getDataFromDB = async () => {
//   const {err, rows} = await db.all("SELECT * FROM users")
//   if (!err) {
//     return rows;
//   }
// };

const insertUser = (arg) => {
  db.run("INSERT INTO users (nickname, name, sirname) values(?, ?, ?)", arg, function(err) {
    // TODO error handling
      if (err) {
        console.log(err.message);
        return new Error(err.message);
      }
      console.log(`A row has been inserted with row id ${this.lastID}`);
    })
};

let mainWin;
const createWindow = () => {
  mainWin = new BrowserWindow({
    width: 600,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWin.loadFile('./src/main.html');
  // mainWin.webContents.openDevTools();
}

const createChildWindow= () => {
  const childWin = new BrowserWindow({
    width: 400,
    height: 220,
    autoHideMenuBar: true,
    resizable: false,
    parent: mainWin,
    modal: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  childWin.loadFile('./src/forms/new/new.html');
  // childWin.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  ipcMain.handle('request-data', getDataFromDB);
  ipcMain.on('openCreateForm', (event, arg) => {
    createChildWindow();
  });

  // ipcMain.on('closeMe', (event, args) => {
  //   const senderWindow = BrowserWindow.fromWebContents(event.sender);
  //   senderWindow.close();
  // });

  ipcMain.on('insertUser', (event, arg) => {
    const senderWindow = BrowserWindow.fromWebContents(event.sender);
    senderWindow.close();
    try {
      insertUser(arg);
      mainWin.webContents.send('reload-data');
      senderWindow.close();
    } catch (error) {
      // TODO emulate error, send reply with error in dialog window
      // event.reply('insertResponse', { error: error.message });
    };
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});