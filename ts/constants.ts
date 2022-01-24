export const enum LaunchpadTypes {
    BL_LPX = "Launchpad X (BL)",
    BL_LPMINIMK3 = "Launchpad Mini MK3 (BL)",
    BL_LPPROMK3 = "Launchpad Pro MK3 (BL)",
    BL_LPMK2 = "Launchpad MK2 (BL)",
    BL_LPPRO = "Launchpad Pro (BL)",
    LPX = "Launchpad X",
    LPMINIMK3 = "Launchpad Mini MK3",
    LPPROMK3 = "Launchpad Pro MK3",
    LPMK2 = "Launchpad MK2",
    LPPRO = "Launchpad Pro",
    CFW = "Launchpad Pro (CFW - OLD)",
    CFY = "Launchpad Pro (CFW)",
    BLANK = "BLANK",
}

export const CFY_PALETTE_DOWNLOAD_HEADER = [
    0xf0,
    0x52,
    0x45,
    0x54,
    0x49,
    0x4e,
    0x41,
];
export const CFW_PALETTE_UPLOAD_START = [
    0x52,
    0x45,
    0x54,
    0x49,
    0x4e,
    0x41,
    0x7b,
];
export const CFW_PALETTE_UPLOAD_WRITE = [
    0x52,
    0x45,
    0x54,
    0x49,
    0x4e,
    0x41,
    0x3d,
];
export const CFW_PALETTE_UPLOAD_END = [
    0x52,
    0x45,
    0x54,
    0x49,
    0x4e,
    0x41,
    0x7d,
];

export const CFY_MODE_UPLOAD_START = (index: number) => [
    0x43,
    0x55,
    0x53,
    0x54,
    0x4f,
    0x4d,
    0x7b,
    index,
];

export const CFY_MODE_UPLOAD_WRITE = [0x43, 0x55, 0x53, 0x54, 0x4f, 0x4d, 0x3d];
export const CFY_MODE_UPLOAD_END = [0x43, 0x55, 0x53, 0x54, 0x4f, 0x4d, 0x7d];
export const CFY_MODE_WRITE_HEADER = [240, 67, 85, 83, 84, 79, 77];

export const LPX_MODE_HEADER = [0x00, 0x20, 0x29, 0x02, 0x0c, 0x05, 0x01, 0x7f];
export const LPMINIMK3_MODE_HEADER = [
    0x00,
    0x20,
    0x29,
    0x02,
    0x0d,
    0x05,
    0x01,
    0x7f,
];
export const LPPROMK3_MODE_HEADER = [
    0x00,
    0x20,
    0x29,
    0x02,
    0x0e,
    0x05,
    0x01,
    0x7f,
];

export const LPX_MODE_DOWNLOAD = (index: number) => [
    0x00,
    0x20,
    0x29,
    0x02,
    0x0c,
    0x05,
    0x01,
    index + 4,
];
export const LPMINIMK3_MODE_DOWNLOAD = (index: number) => [
    0x00,
    0x20,
    0x29,
    0x02,
    0x0d,
    0x05,
    0x01,
    index + 4,
];