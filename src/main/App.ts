//import { Color } from '@common/Color';
//import { padManagerInstance } from '@renderer/utils/PadManager';
import { app, BrowserWindow, session } from 'electron';
import { createAppWindow } from './AppWindow';
//import configStore from './ConfigStore';
// import Store from 'electron-store'
// 
// Store.initRenderer()

//import padCommunication from '../common/PadComminucation'

if (require('electron-squirrel-startup')) {
  app.quit();
}

app.on('ready', () => {
  createAppWindow()
  //session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //  callback({
  //    responseHeaders: {
  //      ...details.responseHeaders,
  //      'Content-Security-Policy': ['default-src \'none\'']
  //    }
  //  })
  //})
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createAppWindow();
  }
  //padCommunication.setReady()
  // const stateMappings = configStore.get('stateMappings')
  // if (padManagerInstance.online && padManagerInstance.selectedDevice !== undefined) {
  //   // console.log('padManagerInstance not undefined')
  //   const launchpad = padManagerInstance.getLaunchpad(padManagerInstance.selectedDevice)
  //   if (launchpad !== undefined) {
  //     // console.log('launchpad not undefined')
  //     for (const sectionName in stateMappings) {
  //       // console.log(`refreshBoardState 0 ${sectionName}`)
  //       const section = parseInt(sectionName)
  //       for (const state of stateMappings[sectionName]) {
  //         // console.log(`refreshBoardState 1 ${section}`)
  //         launchpad.setColor(section, state.x, state.y, Color.fromRgba(state.pressed ? state.activeColor : state.inactiveColor))
  //       }
  //     }
  //   }
  // }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
