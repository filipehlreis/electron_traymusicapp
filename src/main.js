const electron = require('electron');
// const mm = require('music-metadata');

const { app, BrowserWindow } = electron;
let win;

app.on('ready', () => {
  win = new BrowserWindow({
    height: 500,
    width: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile('src/index.html');
});
