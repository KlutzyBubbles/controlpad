import { Key, keyboard } from '@nut-tree/nut-js';
import { Console } from 'console';
import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { KeyCombo, KeyComboIPC, StateMappings } from '../../common/Interfaces';
import { default as configStore, ConfigStore } from '../ConfigStore';
//import robotjs from 'robotjs'



const registerKeyboardIPC = () => {
    ipcMain.handle('run-key-combo', (event: IpcMainInvokeEvent, data: KeyComboIPC) => {
        /*
        console.log('run-key-combo')
        console.log(data)
        var keys: string[] = []
        if (data.keyCombo.ctrl)
            keys.push('control')
        if (data.keyCombo.shift)
            keys.push('shift')
        if (data.keyCombo.alt)
            keys.push('alt')
        if (data.keyCombo.keys && data.keyCombo.keys.length > 0)
            data.keyCombo.keys.forEach((key: string) => {
                keys.push(key)
            })
        console.log('keys')
        console.log(keys)
        if (data.keyCombo.toggle) {
            if (data.active) {
                console.log('active toggle')
                keys.forEach((key) => {
                    robotjs.keyToggle(key, 'down')
                })
            } else {
                console.log('inactive toggle')
                keys.forEach((key) => {
                    robotjs.keyToggle(key, 'up')
                })
            }
        } else {
            if (data.active) {
                console.log('active press')
                keys.forEach((key) => {
                    robotjs.keyToggle(key, 'down')
                })
                keys.forEach((key) => {
                    robotjs.keyToggle(key, 'up')
                })
            }
        }
        /*
        */
        console.log('run-key-combo')
        console.log(data)
        var keys: Key[] = []
        if (data.keyCombo.ctrl)
            keys.push(Key[data.keyCombo.ctrl as keyof typeof Key])
        if (data.keyCombo.shift)
            keys.push(Key[data.keyCombo.shift as keyof typeof Key])
        if (data.keyCombo.alt)
            keys.push(Key[data.keyCombo.alt as keyof typeof Key])
        if (data.keyCombo.keys && data.keyCombo.keys.length > 0)
            data.keyCombo.keys.forEach((key: string) => {
                keys.push(Key[key as keyof typeof Key])
            })
        console.log('keys')
        console.log(keys)
        if (data.keyCombo.toggle) {
            if (data.active) {
                console.log('active toggle')
                keys.forEach((key: Key) => {
                    keyboard.pressKey(key)
                })
            } else {
                console.log('inactive toggle')
                keys.forEach((key: Key) => {
                    keyboard.releaseKey(key)
                })
            }
        } else {
            if (data.active) {
                console.log('active press')
                keys.forEach((key: Key) => {
                    keyboard.pressKey(key)
                })
                keys.forEach((key: Key) => {
                    keyboard.releaseKey(key)
                })
            }
        }
    });
}

export default registerKeyboardIPC