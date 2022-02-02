export const enum Section {
    Unknown = -1,
    Top = 0,
    Main = 1,
    Side = 2
}

export const enum PresetColor {
    Red = 5,
    Yellow = 13,
    LightGreen = 21,
    LightBlue = 37,
    Blue = 45,
    Pink = 53,
    Orange = 9,
    Purple = 48,
    White = 3,
    Off = 0,
    Gray = 1,
    LightGray = 2
}

/*
BL = Bootloader
CFW = Unknown (Possibly Custom Firmware)
*/
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