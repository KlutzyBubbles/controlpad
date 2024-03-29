import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { MappingEventItem, SoundEventItem, StateMappings } from '@common/Interfaces';
import { default as configStore, ConfigStore } from '../ConfigStore';

const registerConfigIPC = () => {
  ipcMain.handle(
    'mappings-save',
    (event: IpcMainInvokeEvent, data: MappingEventItem) => {
      configStore.set('stateMappings', data.stateMappings as StateMappings);
    },
  );
  ipcMain.handle('mappings-load', () => {
    return configStore.get('stateMappings');
  });
  ipcMain.handle(
    'sound-save',
    (event: IpcMainInvokeEvent, data: SoundEventItem) => {
      configStore.set('soundLocation', data.soundLocation);
    },
  );
  ipcMain.handle('sound-load', () => {
    return configStore.get('stateMappings');
  });
  ipcMain.handle(
    'add-store-listener',
    (event, func: (mapping: StateMappings) => void) => {
      return configStore.onDidChange('stateMappings', func);
    },
  );
};

export default registerConfigIPC;
