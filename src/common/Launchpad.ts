import { Input, MessageEvent, Output } from "webmidi";
import { Color } from "./Color";
import { PresetColor, Section } from "./Constants";
import { Mapping } from './Interfaces'
import { EventEmitter } from "events";
import { getTypeMapping, LaunchpadType } from "./LaunchPadMappings";

export default class Launchpad extends EventEmitter {
    name: string;
    input: Input;
    output: Output;
    type: LaunchpadType = LaunchpadType.BLANK;
    mapping: Mapping;

    constructor(name: string, input: Input, output: Output) {
        super();
        this.name = name;
        this.input = input;
        this.output = output;
        this.input.addListener('midimessage', this.midiMessage)
    }

    async getDisplayName(): Promise<string> {
        const mapping = await this.getTypeMappings()
        return mapping.name
    }

    async getTypeMappings(): Promise<Mapping | undefined> {
        if (this.mapping != undefined)
            return this.mapping
        const type = await this.getType()
        const mapping = getTypeMapping(type)
        this.mapping = mapping;
        return this.mapping
    }

    midiMessage = async (event: any) => {
        const data = event.message.data;
        if (data === undefined || data === null) {
            console.error(`Invalid data received from ${this.name}`);
            return;
        }
        if (data.length !== 3)
            return;
        const codes = await this.getMessageCodes(data[0], data[1])
        if (codes === undefined)
            return;
        const mapping = await this.getTypeMappings()
        if (data[2] === mapping.pressedState[0]) {
            this.emit('released', codes, this.name)
        } else if (data[2] === mapping.pressedState[1]) {
            this.emit('pressed', codes, this.name)
        } else {
            console.error(`Invalid pressed state received from ${this.name}, expected ${mapping.pressedState}, received ${data[2]}`);
        }
    }

    async getMessageCodes(item1: number, item2: number): Promise<number[] | undefined> {
        const mapping = await this.getTypeMappings()
        for (const sectionName in mapping.gridMappings) {
            let currentSection = -1
            for (const item of mapping.gridMappings[sectionName]) {
                if (item.x === 0 && item.y === 0)
                    currentSection = item.number
                if (currentSection === item1 && item.number === item2)
                    return [parseInt(sectionName), item.x, item.y]
            }
        }
        return undefined
    }

    async getButtonCombo(section: Section, x: number, y: number): Promise<(number | undefined)[]> {
        return [await this.getSectionNumber(section), await this.getButtonNumber(section, x, y)]
    }

    async getButtonNumber(section: Section, x: number, y: number): Promise<number | undefined> {
        const mapping = await this.getTypeMappings()
        for (const item of mapping.gridMappings[section]) {
            if (item.x === x && item.y === y)
                return item.number
        }
        return undefined
    }

    async getSectionNumber(section: Section): Promise<number | undefined> {
        const mapping = await this.getTypeMappings()
        for (const item of mapping.gridMappings[section]) {
            if (item.x === 0 && item.y === 0)
                return item.number
        }
        return undefined
    }

    clearAll() {
        this.setAll(new Color(0, 0, 0))
    }

    async setAll(color: Color) {
        const mapping = await this.getTypeMappings()
        for (const section in mapping.gridMappings) {
            for (const item of mapping.gridMappings[section]) {
                if (item.x !== 0 || item.y !== 0) {
                    this.output.sendSysex(
                        [],
                        mapping.sysExSequence.concat([
                            0x0b,
                            item.number
                        ].concat(color.toRgb6Array()))
                    );
                }
            }
        }
    }

    async setColor(section: Section, x: number, y: number, color: Color) {
        const mapping = await this.getTypeMappings()
        const buttonNumber = await this.getButtonNumber(section, x, y)
        if (buttonNumber === undefined)
            console.error(`Invalname button lookup for ${section}, (${x}, ${y})`)
        else {
            this.output.sendSysex(
                [],
                mapping.sysExSequence.concat([
                    0x0b,
                    buttonNumber
                ].concat(color.toRgb6Array()))
            );
        }
    }

    async startFlash(section: Section, x: number, y: number, color: PresetColor) {
        const mapping = await this.getTypeMappings()
        const buttonNumber = await this.getButtonNumber(section, x, y)
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

    async getType(): Promise<LaunchpadType> {
        if (this.type !== LaunchpadType.BLANK) {
            this.emit('type', this.type)
            return this.type
        }
        return new Promise((resolve) => {
            const listenerTimer = setTimeout(() => {
                this.input.removeListener("sysex", () => {
                });
                this.type = LaunchpadType.BLANK;
                this.emit('type', this.type)
                resolve(LaunchpadType.BLANK);
            }, 1000);

            this.input.addListener("sysex", async (event: MessageEvent) => {
                clearTimeout(listenerTimer);

                this.input.removeListener("sysex", () => {});

                const type = await this.nameFromSysEx(event)
                this.emit('type', type)
                resolve(type);
            });
            this.output.sendSysex([], [0x7e, 0x7f, 0x06, 0x01]);
        });
    }

    async nameFromSysEx(event: MessageEvent): Promise<LaunchpadType> {
        const eventData = event.message.data;
        if (eventData.length === 17) {
            const msg = eventData.slice(1, eventData.length - 1);
            // 0 30 41
            if (msg[4] === 0x00 && msg[5] === 0x20 && msg[6] === 0x29) {
                let type: LaunchpadType = LaunchpadType.BLANK;

                switch (msg[7]) {
                    // X
                    case 0x03: {
                        if (msg[8] === 17) type = LaunchpadType.BL_X;
                        else if (msg[8] === 1) type = LaunchpadType.X;
                        break;
                    }
                    // Mini MK3
                    case 0x13: {
                        if (msg[8] === 17) type = LaunchpadType.BL_MINIMK3;
                        else if (msg[8] === 1) type = LaunchpadType.MINIMK3;
                        break;
                    }
                    // Pro MK3
                    case 0x23: {
                        if (msg[8] === 17) type = LaunchpadType.BL_PROMK3;
                        else if (msg[8] === 1) type = LaunchpadType.PROMK3;
                        break;
                    }
                    // MK2
                    case 0x69: {
                        const verNum = parseInt(
                            msg
                                .slice(msg.length - 3)
                                .reduce((p: string, c: number) => p + c, "")
                        );
                        if (verNum < 171) type = await this.mk2_nameFromSysEx();
                        else type = LaunchpadType.MK2;
                        break;
                    }
                    // Pro
                    case 0x51: {
                        const versionStr = msg.slice(msg.length - 3)
                            .reduce(
                                (prev: string, current: number) =>
                                    prev + String.fromCharCode(current),
                                ""
                            );

                        switch (versionStr) {
                            case "\0\0\0": {
                                type = LaunchpadType.BL_PRO;
                                break;
                            }
                            default: {
                                type = LaunchpadType.PRO;
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
        return LaunchpadType.BLANK;
    }

    async mk2_nameFromSysEx(): Promise<LaunchpadType> {
        return new Promise((res) => {
            this.input.addListener("sysex", (event: MessageEvent) => {
                const eventData = event.message.data;
                if (
                    eventData.length === 19 &&
                    [0, 0x20, 0x29, 0].reduce(
                        (previous, current, index) => previous && eventData[index + 1] === current,
                        true
                    ) &&
                    eventData[5] === 0x70
                ) {
                    const versionNum = parseInt(
                        eventData.slice(13, 16).reduce((s: any, el: any) => s + el, "")
                    );

                    this.input.removeListener("sysex", () => {});

                    if (versionNum < 171) res(LaunchpadType.MK2);
                    else res(LaunchpadType.BL_MK2);
                } else res(LaunchpadType.BL_MK2);
            });

            this.output.sendSysex([], [0x00, 0x20, 0x29, 0x00, 0x70]);
        });
    }

    async flashFirmware(fwArray: Uint8Array) {
        const messages: number[][] = [];
        let currentMessage: number[] = [];

        fwArray.forEach((byte) => {
            if (byte === 0xf0) {
              // Ignore
            } else if (byte === 0xf7) {
                messages.push(currentMessage);
                currentMessage = [];
            } else currentMessage.push(byte);
        });

        for (const message of messages) {
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