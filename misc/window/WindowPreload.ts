import { contextBridge } from 'electron';
import electronWindow from './ElectronWindow';

contextBridge.exposeInMainWorld('electron_window', electronWindow);
