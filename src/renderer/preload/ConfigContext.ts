import { StateMappings } from '@common/Interfaces';
import { ipcRenderer } from 'electron';

type EventItem = {
  stateMappings: StateMappings;
}

const configContext = {
  saveMappings(event: EventItem) {
    // console.log('savemappings', event)
    ipcRenderer.invoke('mappings-save', event);
  },
  loadMappings() {
    return ipcRenderer.invoke('mappings-load');
  },
};

export type ConfigContextApi = typeof configContext;

export default configContext;
