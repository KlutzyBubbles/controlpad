import { Input, Output } from "webmidi";
import { Color } from "../Color";
import {
    LaunchpadTypes
} from "../constants";
import { PresetColor, Section } from "../interfaces";
import mapping from '../../mappings/mk2.json'
import { EventEmitter } from "events";

export default class Launchpad extends EventEmitter {
    name: string;
    input: Input;
    output: Output;
    type: LaunchpadTypes = LaunchpadTypes.BLANK;

    constructor(name: string, input: Input, output: Output) {
        super();
        this.name = name;
        this.input = input;
        this.output = output;
        this.input.addListener('midimessage', this.midiMessage)
    }

    midiMessage = (event) => {
        var data = event.message.data;
        if (data === undefined || data === null || data.length !== 3) {
            console.error(`Invalid data received from ${this.name}`);
            return;
        }
        console.log(`midimessage ${data}`)
        var codes = this.getMessageCodes(data[0], data[1])
        if (codes === undefined) {
            console.error(`Invalid data received from ${this.name}, Data: ${data}, Codes: ${codes}`);
            return;
        }
        if (data[2] === mapping.pressedState[0]) {
            this.emit('released', codes)
        } else if (data[2] === mapping.pressedState[1]) {
            this.emit('pressed', codes)
        } else {
            console.error(`Invalid pressed state received from ${this.name}, expected ${mapping.pressedState}, received ${data[2]}`);
        }
    }

    getMessageCodes(item1: number, item2: number): number[] | undefined {
        // console.log(`getMessageCodes(${item1}, ${item2})`)
        for (var sectionName in mapping.gridMappings) {
            var currentSection = -1
            for (var item of mapping.gridMappings[sectionName]) {
                if (item.x === 0 && item.y === 0)
                    currentSection = item.number
                if (currentSection === item1 && item.number === item2)
                    return [parseInt(sectionName), item.x, item.y]
            }
        }
        return undefined
    }

    getButtonCombo(section: Section, x: number, y: number): (number | undefined)[] {
        return [this.getSectionNumber(section), this.getButtonNumber(section, x, y)]
    }

    getButtonNumber(section: Section, x: number, y: number): number | undefined {
        // console.log(`getButtonNumber(${section}, ${x}, ${y})`)
        // console.log(mapping.gridMappings[section])
        for (var item of mapping.gridMappings[section]) {
            if (item.x === x && item.y === y)
                return item.number
        }
        return undefined
    }

    getSectionNumber(section: Section): number | undefined {
        for (var item of mapping.gridMappings[section]) {
            if (item.x === 0 && item.y === 0)
                return item.number
        }
        return undefined
    }

    clearAll() {
        this.setAll(new Color(0, 0, 0))
    }

    setAll(color: Color) {
        for (var section in mapping.gridMappings) {
            for (var item of mapping.gridMappings[section]) {
                if (item.x !== 0 || item.y !== 0) {
                    this.output.sendSysex(
                        [],
                        mapping.sysExSequence.concat([
                            0x0b,
                            item.number
                        ].concat(color.toRgbArray()))
                    );
                }
            }
        }
    }

    setColor(section: Section, x: number, y: number, color: Color) {
        var buttonNumber = this.getButtonNumber(section, x, y)
        if (buttonNumber === undefined)
            console.error(`Invalname button lookup for ${section}, (${x}, ${y})`)
        else {
            this.output.sendSysex(
                [],
                mapping.sysExSequence.concat([
                    0x0b,
                    buttonNumber
                ].concat(color.toRgbArray()))
            );
        }
    }

    startFlash(section: Section, x: number, y: number, color: PresetColor) {
        var buttonNumber = this.getButtonNumber(section, x, y)
        if (buttonNumber === undefined)
            console.error(`Invalname button lookup for ${section}, (${x}, ${y})`)
        else {
            this.output.sendSysex(
                [],
                mapping.sysExSequence.concat([
                    0x23,
                    0x00,
                    buttonNumber,
                    color
                ])
            );
        }
    }

    getType(): Promise<LaunchpadTypes> {
        return new Promise(async (resolve) => {
            const listenerTimer = setTimeout(() => {
                // console.log("removing");
                this.input.removeListener("sysex", () => {
                    console.log('removed')
                });
                this.type = LaunchpadTypes.BLANK;
                resolve(LaunchpadTypes.BLANK);
            }, 1000);

            this.input.addListener("sysex", async (e) => {
                clearTimeout(listenerTimer);

                // console.log("removing");
                // console.log(e);
                this.input.removeListener("sysex", () => {
                    // console.log('removed')
                });

                resolve(await this.nameentify(e));
            });

            this.output.sendSysex([], [0x7e, 0x7f, 0x06, 0x01]);
        });
    }

    async nameentify(e): Promise<LaunchpadTypes> {
        if (e.data.length === 17) {
            const msg = e.data.slice(1, e.data.length - 1);

            if (msg[4] === 0x00 && msg[5] === 0x20 && msg[6] === 0x29) {
                let type: LaunchpadTypes = LaunchpadTypes.BLANK;

                switch (msg[7]) {
                    // X
                    case 0x03: {
                        if (msg[8] === 17) type = LaunchpadTypes.BL_LPX;
                        else if (msg[8] === 1) type = LaunchpadTypes.LPX;
                        break;
                    }
                    // Mini MK3
                    case 0x13: {
                        if (msg[8] === 17) type = LaunchpadTypes.BL_LPMINIMK3;
                        else if (msg[8] === 1) type = LaunchpadTypes.LPMINIMK3;
                        break;
                    }
                    // Pro MK3
                    case 0x23: {
                        if (msg[8] === 17) type = LaunchpadTypes.BL_LPPROMK3;
                        else if (msg[8] === 1) type = LaunchpadTypes.LPPROMK3;
                        break;
                    }
                    // MK2
                    case 0x69: {
                        const verNum = parseInt(
                            msg
                                .slice(msg.length - 3)
                                .reduce((p: string, c: number) => p + c, "")
                        );

                        if (verNum < 171) type = await this.mk2_nameentify();
                        else type = LaunchpadTypes.LPMK2;
                        break;
                    }
                    // Pro
                    case 0x51: {
                        const versionStr = (msg as any)
                            .slice(msg.length - 3)
                            .reduce(
                                (prev: string, current: number) =>
                                    prev + String.fromCharCode(current),
                                ""
                            );

                        switch (versionStr) {
                            case "\0\0\0": {
                                type = LaunchpadTypes.BL_LPPRO;
                                break;
                            }
                            case "cfw":
                            case "cfx": {
                                type = LaunchpadTypes.CFW;
                                break;
                            }
                            case "cfy": {
                                type = LaunchpadTypes.CFY;
                                break;
                            }
                            default: {
                                type = LaunchpadTypes.LPPRO;
                                break;
                            }
                        }
                        break;
                    }
                }

                this.type = type;
                return type;
            }
        }
        return LaunchpadTypes.BLANK;
    }

    mk2_nameentify(): Promise<LaunchpadTypes> {
        return new Promise((res) => {
            this.input.addListener("sysex", (e: any) => {
                if (
                    e.data.length === 19 &&
                    [0, 0x20, 0x29, 0].reduce(
                        (val, el, i) => val && e.data[i + 1] === el,
                        true
                    ) &&
                    e.data[5] === 0x70
                ) {
                    let versionNum = parseInt(
                        e.data.slice(13, 16).reduce((s, el) => s + el, "")
                    );

                    console.log("removing");
                    this.input.removeListener("sysex", () => {
                        console.log('removed')
                    });

                    if (versionNum < 171) res(LaunchpadTypes.LPMK2);
                    else res(LaunchpadTypes.BL_LPMK2);
                } else res(LaunchpadTypes.BL_LPMK2);
            });

            this.output.sendSysex([], [0x00, 0x20, 0x29, 0x00, 0x70]);
        });
    }

    async flashFirmware(fwArray: Uint8Array) {
        const messages: number[][] = [];
        let currentMessage: number[] = [];

        fwArray.forEach((byte) => {
            if (byte === 0xf0) {
            } else if (byte === 0xf7) {
                messages.push(currentMessage);
                currentMessage = [];
            } else currentMessage.push(byte);
        });

        for (let message of messages) {
            await new Promise<void>((resolve) =>
                setTimeout(() => {
                    this.output.sendSysex([], message);
                    resolve();
                }, 1)
            );
        }
    }

    sendSysex(msg: number[]) {
        this.output.sendSysex([], msg);
    }
}