import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { StateMappings } from '../../common/Interfaces';
import { default as configStore, ConfigStore } from '../ConfigStore';

const registerConfigIPC = () => {
    ipcMain.handle('mappings-save', (event: IpcMainInvokeEvent, data: ConfigStore) => {
        // console.log('mappings-ssave', data.stateMappings)
        // console.log(data)
        configStore.set('stateMappings', data.stateMappings as StateMappings)
    });
    ipcMain.handle('mappings-load', () => {
        return configStore.get('stateMappings')
    });
}

export default registerConfigIPC