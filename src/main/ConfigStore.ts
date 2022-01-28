import Store from 'electron-store'
import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { StateMappings } from '../common/interfaces'

interface ConfigStore {
    stateMappings: StateMappings
}

const configStore = new Store<ConfigStore>()
export default configStore

export const registerConfigIPC = () => {
  ipcMain.handle('mappings-save', (event: IpcMainInvokeEvent, data: ConfigStore) => {
    console.log('mappings-ssave', data.stateMappings)
    console.log(data)
    configStore.set('stateMappings', data.stateMappings as StateMappings)
  });
  ipcMain.handle('mappings-load', () => {
    return configStore.get('stateMappings')
  });
}

export async function saveToFile(filePath: string): Promise<void> {
    console.log('NOT IMPLEMENTED YET', filePath)
    return
}

export async function loadFromFile(filePath: string): Promise<void> {
    console.log('NOT IMPLEMENTED YET', filePath)
    return
}