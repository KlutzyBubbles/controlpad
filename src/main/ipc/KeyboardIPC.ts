import { Key, keyboard } from '@nut-tree/nut-js';
import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { KeyComboIPC } from '@common/Interfaces';

const registerKeyboardIPC = () => {
  ipcMain.handle(
    'run-key-combo',
    (event: IpcMainInvokeEvent, data: KeyComboIPC) => {
      var keys: Key[] = [];
      if (data.keyCombo.ctrl)
        keys.push(Key[data.keyCombo.ctrl as keyof typeof Key]);
      if (data.keyCombo.shift)
        keys.push(Key[data.keyCombo.shift as keyof typeof Key]);
      if (data.keyCombo.alt)
        keys.push(Key[data.keyCombo.alt as keyof typeof Key]);
      if (data.keyCombo.keys && data.keyCombo.keys.length > 0)
        data.keyCombo.keys.forEach((key: string) => {
          keys.push(Key[key as keyof typeof Key]);
        });
      if (data.keyCombo.toggle) {
        if (data.active) {
          keys.forEach((key: Key) => {
            keyboard.pressKey(key);
          });
        } else {
          keys.forEach((key: Key) => {
            keyboard.releaseKey(key);
          });
        }
      } else {
        if (data.active) {
          keys.forEach((key: Key) => {
            keyboard.pressKey(key);
          });
          keys.forEach((key: Key) => {
            keyboard.releaseKey(key);
          });
        }
      }
    },
  );
};

export default registerKeyboardIPC;
