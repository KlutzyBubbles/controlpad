import { app, BrowserWindow, Tray, Menu } from 'electron';
import path from 'path';
import { registerTitlebarIpc } from '@main/ipc/TitlebarIPC';
import registerConfigIPC from './ipc/ConfigIPC';
import registerKeyboardIPC from './ipc/KeyboardIPC';

declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const iconPath = path.resolve('assets/icon.ico')
let appWindow: BrowserWindow;
let appTray: Tray;

export function createAppWindow(): BrowserWindow {
    appWindow = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#1f252c',
        show: false,
        autoHideMenuBar: true,
        frame: false,
        titleBarStyle: 'hidden',
        icon: iconPath,
        webPreferences: {
            nodeIntegration: false,
            nativeWindowOpen: true,
            contextIsolation: true,
            nodeIntegrationInWorker: false,
            nodeIntegrationInSubFrames: false,
            preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show app', click: function () {
                appWindow.show()
            }
        },
        {
            label: 'Quit', click: function () {
                app.quit();
            }
        }
    ]);

    appTray = new Tray(iconPath)
    appTray.setTitle('Control Pad')
    appTray.setToolTip('Control Pad')
    appTray.setContextMenu(contextMenu)

    appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY);

    appWindow.on('ready-to-show', () => {
        appWindow.show()
    });

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
    registerKeyboardIPC()
}
