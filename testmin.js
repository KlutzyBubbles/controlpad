const { WebMidi } = require('webmidi');

WebMidi.enable({
  callback: midiInit,
  sysex: true
})

function midiInit(e) {
  if (e) {
    console.log(e);
    return;
  }
  let listener = (event) => {
    console.log('EVENT');
    console.log(event);
  }
  WebMidi.addListener("connected", listener);
  WebMidi.addListener("disconnected", listener);
}
