import Launchpad from './ts/utils/Launchpad'
import { PadManager } from './ts/utils/PadManager'
import json from './mappings/mk2.json'

var manager = new PadManager(() => run())

function run() {
  console.log('run')
  console.log(manager)
  if (manager.selectedDevice != undefined) {
    console.log(manager.selectedDevice)
    var launchpad = manager.getLaunchpad(manager.selectedDevice)
    console.log(launchpad)
    launchpad?.getType().then((msg) => {
      console.log('done')
      console.log(msg)
    })


    launchpad?.input.addListener("sysex", (e: any) => {
      console.log('sysex')
      console.log(e.message)
    });

    for (var gridItem of json.gridMappings['1']) {
      var hue = (gridItem.x + gridItem.y - 2) * 8
      launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x0b, gridItem.number].concat(hslToRgb(hue, 1, 0.5)));
    }

    launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x0b, 104].concat(hslToRgb(0, 1, 0.5)));
    launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x0b, 11].concat(hslToRgb(0, 1, 0.5)));
    launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x0b, 18].concat(hslToRgb(0, 1, 0.5)));
    launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x0b, 21].concat(hslToRgb(0, 1, 0.5)));

    launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x22, 0x00]);
    launchpad?.sendSysex([0x0e, 0x01])
    launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x0e, 0x01]);
    launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x23, 0x00, 0x20, 0x16]);
    launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x28, 0x00, 0x21, 0x16]);
    launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x0d, 0x08, 0x16]);
    launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x0c, 0x08, 0x16]);
    // launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x22, 0x04]);
    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x00, 0x00, 16, 0x04]);
    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x01, 0x00, 9, 60]);
    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x02, 0x00, 5, 78]);
    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x03, 0x00, 37, 127]);
    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x04, 0x00, 53, 0]);
    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x05, 0x00, 45, 14]);
    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x06, 0x00, 13, 54]);
    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x07, 0x00, 57, 100]);

    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x22, 0x05]);
    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x00, 0x01, 16, 0x04]);
    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x01, 0x01, 9, 60]);
    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x02, 0x01, 5, 78]);
    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x03, 0x01, 37, 127]);
    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x04, 0x01, 53, 0]);
    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x05, 0x01, 45, 14]);
    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x06, 0x01, 13, 54]);
    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x07, 0x01, 57, 100]);


    // next(launchpad, 0)

    //var str = 'Stack Overflow';
//
    //launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x14, 0x16, 0x00].concat(str.split ('').map (function (c) { return c.charCodeAt (0); })));

  }
}


function next(launchpad: Launchpad | undefined, hue) {
  if (hue < 1) {
    hue += 0.01;
  } else {
    hue = 0;
  }
  //console.log(`${red}, ${green}, ${blue}`)
  launchpad?.output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x0b, 0x22].concat(hslToRgb(hue, 1, 0.5)));
  setTimeout(() => next(launchpad, hue), 10)
}

function hslToRgb(h, s, l){
  var r, g, b;
  h = h/64

  if(s == 0){
      r = g = b = l; // achromatic
  }else{
      var hue2rgb = function hue2rgb(p, q, t){
          if(t < 0) t += 1;
          if(t > 1) t -= 1;
          if(t < 1/6) return p + (q - p) * 6 * t;
          if(t < 1/2) return q;
          if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 63), Math.round(g * 63), Math.round(b * 63)];
}