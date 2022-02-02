export const enum LaunchpadType {
    BL_LPX = -1,
    BL_LPMINIMK3 = -2,
    BL_LPPROMK3 = -3,
    BL_LPMK2 = -4,
    BL_LPPRO = -5,
    LPX = 1,
    LPMINIMK3 = 2,
    LPPROMK3 = 3,
    LPMK2 = 4,
    LPPRO = 5,
    BLANK = 0,
}

/*
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
    BLANK = "BLANK",
}
*/

const typeMappings = [
    {
        name: "Launchpad X (BL)"
        
    }
]

class LaunchpadMapping {

    type: LaunchpadType

    constructor(type: LaunchpadType) {
        this.type = type
    }

}