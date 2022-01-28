export interface RGBA {
    r: number,
    g: number,
    b: number,
    a?: number
}

export interface RGB {
    r: number,
    g: number,
    b: number
}

export interface RGB6 {
    r: number,
    g: number,
    b: number
}

export class Color {
    public red: number;
    public green: number;
    public blue: number;

    constructor(red?: number, green?: number, blue?: number) {
        this.red = red || 0;
        this.green = green || 0;
        this.blue = blue || 0;
    }

    componentToHex(component: number) {
        const hex = component.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    toHex() {
        return '#' +
            this.componentToHex(this.red) +
            this.componentToHex(this.green) +
            this.componentToHex(this.blue);
    }

    toRgb() {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }

    toRgb6() {
        return {
            r: Math.floor(this.red / 4),
            g: Math.floor(this.green / 4),
            b: Math.floor(this.blue / 4)
        };
    }

    toRgb8() {
        return {
            r: this.red,
            g: this.green,
            b: this.blue
        };
    }

    toRgb8Array() {
        return [this.red, this.green, this.blue];
    }

    toRgb6Array() {
        return [Math.floor(this.red / 4), Math.floor(this.green / 4), Math.floor(this.blue / 4)];
    }

    static fromHex(hex: string) {
        hex = hex.trim();
        if (hex.indexOf('#') === 0)
            hex = hex.substr(hex.indexOf('#') + 1);
        return new Color(
            parseInt(hex.substr(0, 2), 16),
            parseInt(hex.substr(2, 2), 16),
            parseInt(hex.substr(4, 2), 16))
    }

    static fromRgba(rgba: RGBA): Color {
        return new Color(rgba.r, rgba.g, rgba.b)
    }

    static fromRgb6(rgb6: RGB6): Color {
        return new Color(Math.floor(rgb6.r * 4), Math.floor(rgb6.g * 4), Math.floor(rgb6.b * 4))
    }

    static fromRgbArray(rgbArray: number[]): Color {
        return new Color(rgbArray[0], rgbArray[1], rgbArray[2])
    }

    static toRgb6(rgba: RGBA): RGB6 {
        return Color.fromRgba(rgba).toRgb6()
    }

    static toRgb8(rgba: RGBA): RGB {
        return Color.fromRgba(rgba).toRgb8()
    }

    static toRgb8Array(rgba: RGBA): number[] {
        return Color.fromRgba(rgba).toRgb8Array()
    }

    static random() {
        return new Color(
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256))
    }
}