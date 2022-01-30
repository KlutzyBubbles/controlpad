import { contextBridge } from 'electron';
import keyboardContext from './KeyboardContext';

contextBridge.exposeInMainWorld('electron_keyboard', {
  keyboard: keyboardContext,
});
