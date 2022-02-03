import { StateMappings } from '@common/Interfaces';
import { ipcRenderer, IpcRendererEvent } from 'electron';

type EventItem = {
  stateMappings: StateMappings;
}

const configContext = {
  saveMappings(event: EventItem) {
    ipcRenderer.invoke('mappings-save', event);
  },
  loadMappings() {
    return ipcRenderer.invoke('mappings-load');
  },
  addChangeListener(func: (loadedMappings: StateMappings) => void) {
    loadListeners.push(func)
  }
};

ipcRenderer.on('state-mapping-load', (event: IpcRendererEvent, loadedMappings: StateMappings) => {
  loadListeners.forEach((func) => {
      func(loadedMappings)
  })
})

const loadListeners: ((loadedMappings: StateMappings) => void)[] = []

export function addLoadListener(func: (loadedMappings: StateMappings) => void) {
    loadListeners.push(func)
}

export type ConfigContextApi = typeof configContext;

export default configContext;
