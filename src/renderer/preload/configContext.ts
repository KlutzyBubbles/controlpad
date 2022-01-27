import { ipcRenderer } from 'electron';

const configContext = {
  saveMappings(event: any) {
    console.log('savemappings', event)
    ipcRenderer.invoke('mappings-save', event);
  },
  loadMappings() {
    return ipcRenderer.invoke('mappings-load');
  },
};

export type ConfigContextApi = typeof configContext;

export default configContext;
