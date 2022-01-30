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

    /*
    static lightenDarkenColor(colorCode: string, amount: number) {
        var usePound = false;
        if (colorCode[0] == "#") {
            colorCode = colorCode.slice(1);
            usePound = true;
        }
        var num = parseInt(colorCode, 16);
        var r = (num >> 16) + amount;
        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }
        var b = ((num >> 8) & 0x00FF) + amount;
        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }
        var g = (num & 0x0000FF) + amount;
        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }
    *

    static lightenDarkenColor(colorCode: string, amount: number) {
        var usePound = false;
        if (colorCode[0] == "#") {
            colorCode = colorCode.slice(1);
            usePound = true;
        }
        var num = parseInt(colorCode, 16);
        var r = (num >> 16) + amount;
        var b = ((num >> 8) & 0x00FF) + amount;
        var g = (num & 0x0000FF) + amount;
        if (amount < 0) {
            r = (1 + amount) * r;
            g = (1 + amount) * g;
            b = (1 + amount) * b;
        } else {
            r = (1 - amount) * r + amount * 255;
            g = (1 - amount) * g + amount * 255;
            b = (1 - amount) * b + amount * 255;
        }
        r = r > 255 ? 255 : r < 0 ? 0 : r
        g = g > 255 ? 255 : g < 0 ? 0 : g
        b = b > 255 ? 255 : b < 0 ? 0 : b
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }
    */
}