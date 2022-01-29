import Store from 'electron-store'
import { StateMappings } from '../common/Interfaces'
import { ipcMain, IpcMainInvokeEvent } from 'electron';
import fs from 'fs'

export interface ConfigStore {
    stateMappings: StateMappings
}

const configStore = new Store<ConfigStore>()
export default configStore

export async function saveToFile(filePath: string): Promise<void> {
    // console.log('NOT IMPLEMENTED YET', filePath)
    console.log('saveToFile')
    const stateMappings = configStore.get('stateMappings')
    fs.writeFile(filePath, JSON.stringify(stateMappings), 'utf8', (arg) => {
        console.log(arg)
    });
    return
}

export async function loadFromFile(filePath: string): Promise<StateMappings> {
    //console.log('NOT IMPLEMENTED YET', filePath)
    console.log('loadFromFile')
    const data = fs.readFileSync(filePath, 'utf8')
    const loadedMappings: StateMappings = JSON.parse(data);
    //configStore.set('stateMappings', loadedMappings);
    // loadListeners.forEach((func) => {
    //     console.log('call func')
    //     func(loadedMappings)
    // })
    // ipcMain.send()
    return loadedMappings
}