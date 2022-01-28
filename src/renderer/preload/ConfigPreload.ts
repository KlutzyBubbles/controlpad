import { contextBridge } from 'electron';
import configContext from './ConfigContext';

contextBridge.exposeInMainWorld('electron_config', {
  config: configContext,
});
