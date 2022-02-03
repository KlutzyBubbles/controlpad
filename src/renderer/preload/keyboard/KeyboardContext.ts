import { KeyComboIPC } from '@common/Interfaces';
import { ipcRenderer } from 'electron';

const keyboardContext = {
  runKeyCombo(event: KeyComboIPC) {
    ipcRenderer.invoke('run-key-combo', event);
  }
};

export type KeyboardContextApi = typeof keyboardContext;

export default keyboardContext;
