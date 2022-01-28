import { app, BrowserWindow } from 'electron';
import { createAppWindow } from './appWindow';
// import Store from 'electron-store'
// 
// Store.initRenderer()

if (require('electron-squirrel-startup')) {
  app.quit();
}

app.on('ready', createAppWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createAppWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
