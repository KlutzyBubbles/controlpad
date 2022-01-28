import { app, BrowserWindow } from 'electron';
import path from 'path';
import { registerTitlebarIpc } from '@main/ipc/TitlebarIPC';
import registerConfigIPC from './ipc/ConfigIPC';

declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;

export function createAppWindow(): BrowserWindow {
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#1f252c',
    show: false,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'hidden',
    icon: path.resolve('assets/icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      nativeWindowOpen: true,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY);

  appWindow.on('ready-to-show', () => appWindow.show());

  registerMainIPC();
  appWindow.on('close', () => {
    appWindow = null;
    app.quit();
  });

  return appWindow;
}

function registerMainIPC() {
  registerTitlebarIpc(appWindow);
  registerConfigIPC()
}
