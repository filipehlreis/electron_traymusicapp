const electron = require('electron');
// const mm = require('music-metadata');

const { app, BrowserWindow, Tray, nativeImage } = electron;
let win;
let tray = null;

app.on('ready', () => {
  const icon = nativeImage.createFromPath(
    '/home/filipereis/Desktop/github/electron_traymusicapp/src/images/iconTemplate.png',
  );
  win = new BrowserWindow({
    height: 500,
    width: 400,
    webPreferen0ces: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
    resizable: false,
    skipTaskbar: true,
  });

  win.loadFile('src/index.html');
  tray = new Tray(icon);

  tray.on('click', () => {
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
    }
  });
});
