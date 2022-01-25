export const RGB_COLOR_REGEX = /\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d*.\d*))?\)/;

export interface RGBA {
    r: number,
    g: number,
    b: number,
    a: number
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

    componentToHex(component) {
        var hex = component.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    toHex(base = 64) {
        var factor = 256 / base
        return '#' +
            this.componentToHex(Math.round(this.red * factor)) +
            this.componentToHex(Math.round(this.green * factor)) +
            this.componentToHex(Math.round(this.blue * factor));
    }

    toRgb() {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }

    toRgbArray() {
        return [this.red, this.green, this.blue];
    }

    toRgb6() {
        return {
            r: this.red,
            g: this.green,
            b: this.blue
        };
    }

    toRgb8(base = 64) {
        var factor = 256 / base
        return {
            r: Math.round(this.red * factor),
            g: Math.round(this.green * factor),
            b: Math.round(this.blue * factor)
        };
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

    static fromRgba(rgba: RGBA) {
        return new Color(Math.round(rgba.r / 4), Math.round(rgba.g / 4), Math.round(rgba.b / 4))
    }

    static fromRgb6(rgb6: RGB6) {
        return new Color(rgb6.r, rgb6.g, rgb6.b)
    }

    static toRgb6(rgba: RGBA) {
        return Color.fromRgba(rgba).toRgb6()
    }

    static toRgb8(rgba: RGBA) {
        return Color.fromRgba(rgba).toRgb6()
    }

    static random() {
        return new Color(
            Math.floor(Math.random() * 64),
            Math.floor(Math.random() * 64),
            Math.floor(Math.random() * 64))
    }
}