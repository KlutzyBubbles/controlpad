import { WebMidi } from 'webmidi'
import Launchpad from './Launchpad'

export class PadManager {

    connectedDevices: Launchpad[]
    selectedDevice: string | undefined
    online: boolean

    constructor(callback?: Function) {
        this.connectedDevices = []
        this.selectedDevice = undefined
        this.online = false

        WebMidi.disable().then(() => {
            WebMidi.enable({
                callback: (error) => this.mnameiInit(error, callback),
                sysex: true
            })
        })
    }

    mnameiInit(error: any, callback?: Function) {
        if (error) {
            console.error('Error initiating WebMidi')
            console.error(error)
            this.online = false
            if (typeof callback === "function") callback('Error initiating WebMidi')
        }
        console.log(error)
        console.log(this)
        console.log(this.scan)
        this.online = true
        this.scan()
        WebMidi.addListener("connected", (e: any) => {
            console.log(e)
            this.addLaunchpad(e.port._mnameiOutput.name)
        });
        WebMidi.addListener("disconnected", (e: any) => {
            console.log(e)
            this.removeLaunchpad(e.port._mnameiOutput.name)
        });
        if (typeof callback === "function") callback()
    }

    hasLaunchpad(name: string) {
        for (var launchpad of this.connectedDevices) {
            if (launchpad.name == name) {
                return true
            }
        }
        return false
    }

    getLaunchpad(name: string): Launchpad | undefined {
        for (var launchpad of this.connectedDevices) {
            if (launchpad.name == name) {
                return launchpad
            }
        }
        return undefined
    }

    addLaunchpad(name: string) {
        console.log('addLaunchpad')
        if (this.hasLaunchpad(name))
            return
        if (this.selectedDevice == undefined)
            this.selectedDevice = name
        var input = WebMidi.getInputByName(name)
        var output = WebMidi.getOutputByName(name)
        console.log(name)
        console.log('input1')
        console.log(input)
        console.log('output1')
        console.log(output)
        var input2 = WebMidi.getInputByName(name)
        var output2 = WebMidi.getInputByName(name)
        console.log('input2')
        console.log(input2)
        console.log('output2')
        console.log(output2)
        var launchpad = new Launchpad(name, input, output)
        launchpad.clearAll()
        this.connectedDevices.push(launchpad)
    }

    removeLaunchpad(name: string) {
        if (!this.hasLaunchpad(name))
            return
        if (this.selectedDevice == name)
            this.selectedDevice = undefined
        var index = -1;
        for (var i = 0; i < this.connectedDevices.length; i++) {
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
        for (let input of WebMidi.inputs) {
            for (let output of WebMidi.outputs) {
                if (this.portsMatch(input.name, output.name)) {
                    console.log('output.name')
                    console.log(output.name)
                    console.log('input.name')
                    console.log(input.name)
                    console.log('output.name')
                    console.log(output.name)
                    console.log('input.name')
                    console.log(input.name)
                    this.addLaunchpad(input.name)
                }
            }
        }
    }
}

export const padManagerInstance = new PadManager()
