import { EventEmitter } from 'events'
import { PortEvent, WebMidi } from 'webmidi'
import Launchpad from './Launchpad'

export class PadManager extends EventEmitter {

    connectedDevices: Launchpad[]
    selectedDevice: string | undefined
    online: boolean

    constructor(callback?: (error?: Error | string) => void) {
        super()
        this.connectedDevices = []
        this.selectedDevice = undefined
        this.online = false

        WebMidi.disable().then(() => {
            WebMidi.enable({
                callback: (error?: Error | string) => this.midiInit(error, callback),
                sysex: true
            })
        })
    }

    midiInit(error?: Error | string, callback?: (error?: Error | string) => void) {
        if (error) {
            console.error('Error initiating WebMidi', error)
            this.online = false
            if (typeof callback === "function") callback('Error initiating WebMidi')
        }
        this.online = true
        this.scan()
        WebMidi.addListener("connected", (e: PortEvent) => {
            this.addLaunchpad(e.port.name)
        });
        WebMidi.addListener("disconnected", (e: PortEvent) => {
            this.addLaunchpad(e.port.name)
        });
        if (typeof callback === "function") callback()
    }

    hasLaunchpad(name: string) {
        for (const launchpad of this.connectedDevices) {
            if (launchpad.name == name) {
                return true
            }
        }
        return false
    }

    getLaunchpad(name: string): Launchpad | undefined {
        for (const launchpad of this.connectedDevices) {
            if (launchpad.name == name) {
                return launchpad
            }
        }
        return undefined
    }

    addLaunchpad(name: string) {
        if (this.hasLaunchpad(name))
            return
        if (this.selectedDevice == undefined)
            this.selectedDevice = name
        const input = WebMidi.getInputByName(name)
        const output = WebMidi.getOutputByName(name)
        const launchpad = new Launchpad(name, input, output)
        launchpad.clearAll()
        this.connectedDevices.push(launchpad)
        this.emit('connected', name)
    }

    removeLaunchpad(name: string) {
        if (!this.hasLaunchpad(name))
            return
        if (this.selectedDevice == name)
            this.selectedDevice = undefined
        this.emit('disconnected', name)
        let index = -1;
        for (let i = 0; i < this.connectedDevices.length; i++) {
            if (this.connectedDevices[i].name == name) {
                index = i;
                break;
            }
        }
        if (index == -1)
            return
        this.connectedDevices.splice(index, 1)
    }

    portNeutralize = (x: string) => x.toUpperCase().split("IN").join("").split("OUT").join("");
    portsMatch = (input: string, output: string) => this.portNeutralize(input) === this.portNeutralize(output);

    scan(): void {
        for (const input of WebMidi.inputs) {
            for (const output of WebMidi.outputs) {
                if (this.portsMatch(input.name, output.name)) {
                    this.addLaunchpad(input.name)
                }
            }
        }
    }
}

export const padManagerInstance = new PadManager()
