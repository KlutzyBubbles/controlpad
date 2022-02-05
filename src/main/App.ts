import { app, BrowserWindow } from 'electron';
import { createAppWindow } from './AppWindow';
// import log from 'electron-log';


var handleStartupEvent = () => {
  if (process.platform !== 'win32') {
    return false;
  }

  var squirrelCommand = process.argv[1];
  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':
      setTimeout(app.quit, 2000);
      return true;
    case '--squirrel-uninstall':
      setTimeout(app.quit, 2000);
      return true;
    case '--squirrel-obsolete':
      setTimeout(app.quit, 2000);
      return true;
  }
};

if (!handleStartupEvent()) {
  app.on('ready', () => {
    createAppWindow();
  });

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
}


