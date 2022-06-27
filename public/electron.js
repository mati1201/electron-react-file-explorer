/* eslint-disable import/no-extraneous-dependencies */
const {
  app, BrowserWindow,
} = require('electron');
const remoteMain = require('@electron/remote/main');
const path = require('path');
const isDev = require('electron-is-dev');

remoteMain.initialize();

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1024,
    height: 768,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  remoteMain.enable(window.webContents);

  window.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`,
  );
};

app.on('ready', createWindow);
