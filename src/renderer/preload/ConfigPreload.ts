import { contextBridge } from 'electron';
import configContext from './configContext';

contextBridge.exposeInMainWorld('electron_config', {
  config: configContext,
});
