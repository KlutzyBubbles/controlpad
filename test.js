const { WebMidi } =  require('webmidi');

WebMidi.enable({
  callback: midiInit,
  sysex: true
})

function midiInit(e) {
  if (e) {
    console.log(e);
    return;
  }

  scan();
  let listener = (event) => {
    console.log('EVENT');
    console.log(event);
    scan();
  }
  console.log(WebMidi.getInputById('4- Launchpad MK2'))
  WebMidi.addListener("connected", listener);
  WebMidi.addListener("disconnected", listener);
}


const portNeutralize = (x) =>
  x.toUpperCase().split("IN").join("").split("OUT").join("");
const portsMatch = (input, output) =>
  portNeutralize(input) === portNeutralize(output);

function scan() {
  for (let input of WebMidi.inputs) {
    var events = [
      'noteoff',
      'noteon',
      'keyaftertouch',
      'programchange',
      'event:controlchange-controllerxxx',
      'channelaftertouch',
      'pitchbend',
      'controlchange',
      'allnotesoff',
      'allsoundoff',
      'localcontrol',
      'monomode',
      'omnimode',
      'resetallcontrollers',
      'event:nrpn',
      'event:nrpn-dataentrycoarse',
      'event:nrpn-dataentryfine',
      'event:nrpn-databuttonincrement',
      'event:nrpn-databuttondecrement',
      'event:rpn',
      'event:rpn-dataentrycoarse',
      'event:rpn-dataentryfine',
      'event:rpn-databuttonincrement',
      'event:rpn-databuttondecrement',
      'nrpn',
      'nrpn-dataentrycoarse',
      'nrpn-dataentryfine',
      'nrpn-databuttonincrement',
      'nrpn-databuttondecrement',
      'rpn',
      'rpn-dataentrycoarse',
      'rpn-dataentryfine',
      'rpn-databuttonincrement',
      'rpn-databuttondecrement',
      'midimessage',
      'unknownmessage'
    ]

    for (var event of events) {
      //for (var i = 1; i <= 16; i++) {
        var bind = (ev) => {
          input.channels[1].addListener(ev, e => {
            console.log(ev);
            console.log(e.message);
          });
        }
        bind(event)
      //}
    }
    for (let output of WebMidi.outputs) {
      // output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x22, 0x04]);
      // output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x00, 0x00, 16, 0x04]);
      // output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x01, 0x00, 9, 60]);
      // output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x02, 0x00, 5, 78]);
      // output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x03, 0x00, 37, 127]);
      // output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x04, 0x00, 53, 0]);
      // output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x05, 0x00, 45, 14]);
      // output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x06, 0x00, 13, 54]);
      // output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x07, 0x00, 57, 100]);

      //output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x22, 0x05]);
      //output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x00, 0x01, 16, 0x04]);
      //output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x01, 0x01, 9, 60]);
      //output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x02, 0x01, 5, 78]);
      //output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x03, 0x01, 37, 127]);
      //output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x04, 0x01, 53, 0]);
      //output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x05, 0x01, 45, 14]);
      //output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x06, 0x01, 13, 54]);
      //output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x2b, 0x07, 0x01, 57, 100]);

      output.sendSysex([], [0x00, 0x20, 0x29, 0x02, 0x18, 0x22, 0x02]);
      console.log(portsMatch(input.name, output.name));
      if (portsMatch(input.name, output.name)) {
        console.log('portsmatch');
        console.log(portNeutralize(input.name));
      }
    }
  }
}