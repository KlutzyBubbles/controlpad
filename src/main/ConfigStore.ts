import Store from 'electron-store';
import { StateMappings } from '@common/Interfaces';
import fs from 'fs';

export interface ConfigStore {
  stateMappings: StateMappings;
}

const configStore = new Store<ConfigStore>();
export default configStore;

export function saveToFile(filePath: string): void {
  try {
    const stateMappings = configStore.get('stateMappings');
    fs.writeFileSync(filePath, JSON.stringify(stateMappings), 'utf8');
  } catch (e) {
    console.error('Failed saving file', e);
  }
}

export function loadFromFile(filePath: string): StateMappings | undefined {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const loadedMappings: StateMappings = JSON.parse(data);
    return loadedMappings;
  } catch (e) {
    console.error('Failed saving file', e);
    return undefined;
  }
}
