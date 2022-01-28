import { BrowserWindow, ipcMain, shell, dialog } from 'electron';
import { loadFromFile, saveToFile } from '@main/ConfigStore';

export const registerTitlebarIpc = (mainWindow: BrowserWindow) => {
  ipcMain.handle('window-minimize', () => {
    mainWindow.minimize();
  });

  ipcMain.handle('window-maximize', () => {
    mainWindow.maximize();
  });

  ipcMain.handle('window-toggle-maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.handle('window-close', () => {
    mainWindow.close();
  });

  ipcMain.handle('web-reload', () => {
    mainWindow.webContents.reload();
  });

  ipcMain.handle('web-toggle-devtools', () => {
    mainWindow.webContents.toggleDevTools();
  });

  ipcMain.handle('web-actual-size', () => {
    mainWindow.webContents.setZoomLevel(0);
  });

  ipcMain.handle('web-zoom-in', () => {
    mainWindow.webContents.setZoomLevel(mainWindow.webContents.zoomLevel + 0.5);
  });

  ipcMain.handle('web-zoom-out', () => {
    mainWindow.webContents.setZoomLevel(mainWindow.webContents.zoomLevel - 0.5);
  });

  ipcMain.handle('web-toggle-fullscreen', () => {
    mainWindow.setFullScreen(!mainWindow.fullScreen);
  });

  ipcMain.handle('file-export', async () => {
    const result = await dialog.showSaveDialog(mainWindow, {
      title: 'Save config',
      filters: [
        {
          name: 'ControlPad Config Files',
          extensions: ['json']
        }
      ],
      properties: [
        'showHiddenFiles',
        'createDirectory',
        'showOverwriteConfirmation'
      ]
    })
    if (result.canceled) {
      console.log('Config was not saved due to being cancelled')
    } else {
      console.error('Not implemented yet')
    }
  });

  ipcMain.handle('file-import', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Load config',
      filters: [
        {
          name: 'ControlPad Config Files',
          extensions: ['json']
        }
      ],
      properties: [
        'showHiddenFiles',
        'createDirectory',
        'openFile'
      ]
    })
    if (result.canceled) {
      console.log('Config was not loaded due to being cancelled')
    } else {
      console.error('Not implemented yet')
    }
  });

  ipcMain.handle('window-minimize-tray', async () => {
    mainWindow.hide()
  });

  ipcMain.handle('window-startup-launch', async () => {
    console.log('NOT IMPLEMENTED')
  });

  ipcMain.handle('window-startup-minimized', async () => {
    console.log('NOT IMPLEMENTED')
  });

  ipcMain.handle('app-update-check', async () => {
    console.log('NOT IMPLEMENTED')
  });

  ipcMain.handle('app-open-about', async () => {
    const message = `
    'ControlPad' by KlutzyBubbles

    ControlPad Version: ${process.env['npm_package_version']}
    Electron Version: ${process.versions['electron']}
    Node Version: ${process.versions['node']}
    Chrome Version: ${process.versions['chrome']}

    ControlPad © ${new Date().getFullYear()} KlutzyBubbles
    `
    dialog.showMessageBox({
      type: 'info',
      buttons: ['ok'],
      title: 'About ControlPad',
      message: message
    });
  });

  /*
  export() {
    ipcRenderer.invoke('file-export');
  },
  import() {
    ipcRenderer.invoke('file-import');
  },
  minimize_tray() {
    ipcRenderer.invoke('window-minimize-tray');
  },
  startup_launch() {
    ipcRenderer.invoke('window-startup-launch');
  },
  start_minimized() {
    ipcRenderer.invoke('window-startup-minimized');
  },
  update_check() {
    ipcRenderer.invoke('app-update-check');
  },
  open_about() {
    ipcRenderer.invoke('app-open-about');
*/
  ipcMain.handle('open-url', (e, url) => {
    shell.openExternal(url);
  });
};
