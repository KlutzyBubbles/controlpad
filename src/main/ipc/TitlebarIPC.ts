import { BrowserWindow, ipcMain, shell, dialog, app, autoUpdater } from 'electron';
import { loadFromFile, saveToFile } from '@main/ConfigStore';
import { https } from 'follow-redirects';
import { rejects } from 'assert';

const server = 'https://controlpad-updater.vercel.app'
const url = `${server}/update/${process.platform}/${app.getVersion()}`
autoUpdater.setFeedURL({ url })

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
          extensions: ['json'],
        },
      ],
      properties: [
        'showHiddenFiles',
        'createDirectory',
        'showOverwriteConfirmation',
      ],
    });
    if (result.canceled) {
      console.log('Config was not saved due to being cancelled');
    } else {
      saveToFile(result.filePath);
    }
  });

  ipcMain.handle('file-import', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Load config',
      filters: [
        {
          name: 'ControlPad Config Files',
          extensions: ['json'],
        },
      ],
      properties: ['showHiddenFiles', 'createDirectory', 'openFile'],
    });
    if (result.canceled) {
      console.log('Config was not loaded due to being cancelled');
      return undefined;
    } else {
      const mappings = await loadFromFile(result.filePaths[0]);
      mainWindow.webContents.send('state-mapping-load', mappings);
      return mappings;
    }
  });

  ipcMain.handle('window-minimize-tray', async () => {
    mainWindow.hide();
  });

  ipcMain.handle('window-startup-launch', async () => {
    console.log('NOT IMPLEMENTED');
  });

  ipcMain.handle('window-startup-minimized', async () => {
    console.log('NOT IMPLEMENTED');
  });

  ipcMain.handle('app-update-check', async () => {
    try {
      autoUpdater.checkForUpdates()
      return new Promise((resolve) => {
        autoUpdater.once('update-not-available', () => {
          resolve(false)
        })
        autoUpdater.once('update-available', () => {
          resolve(true)
        })
        setTimeout(() => {
          resolve(undefined)
        }, 30000)
      })
    } catch (e) {
      return new Promise((resolve) => {
        https.request(url, (res) => {
          var body = '';
          res.on('data', (d) => {
            body += d;
          });
          res.on('end', () => {
            try {
              if (res.statusCode === 204) {
                resolve(false)
                console.log('Currently on latest version')
              } else if (res.statusCode !== 200) {
                resolve(undefined)
                console.warn('Invlaid response for update check')
              } else {
                var json = JSON.parse(body);
                resolve(true)
                console.log('Found update, but running outside of package so cant update', json)
              }
            } catch {
              console.log('Error parsing result')
            }
          });
        }).on('error', (error) => {
          resolve(undefined)
          console.warn('Checking for update failed, if you are not in a development environment then the update server is probably down', error)
        }).end();
      })
    }
  });

  ipcMain.handle('app-open-about', async () => {
    const message = `
    'ControlPad' by KlutzyBubbles

    ControlPad Version: ${app.getVersion()}
    Electron Version: ${process.versions['electron']}
    Node Version: ${process.versions['node']}
    Chrome Version: ${process.versions['chrome']}

    ControlPad © ${new Date().getFullYear()} KlutzyBubbles
    `;
    dialog.showMessageBox({
      type: 'info',
      buttons: ['ok'],
      title: 'About ControlPad',
      message: message,
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
