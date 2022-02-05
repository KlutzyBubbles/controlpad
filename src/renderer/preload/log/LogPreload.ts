import { contextBridge } from 'electron';
import log from 'electron-log';

contextBridge.exposeInMainWorld('electron_log', {
  log: log.functions,
});
