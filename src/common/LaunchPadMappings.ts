import MK2_MAP from '../mappings/mk2.json'
import { Mapping } from './Interfaces'

/*
BL = Bootloader
CFW = Unknown (Possibly Custom Firmware)
*/
export const enum LaunchpadType {
    BL_X = -5,
    BL_MINIMK3 = -4,
    BL_PROMK3 = -3,
    BL_MK2 = -2,
    BL_PRO = -1,
    X = 0,
    MINIMK3 = 1,
    PROMK3 = 2,
    MK2 = 3,
    PRO = 4,
    BLANK = 5,
    CONNECTING = 6,
}

export const typeMappings: Mapping[] = [
    {
        name: "Launchpad X (BL)",
        ...{}
    },
    {
        name: "Launchpad Mini MK3 (BL)",
        ...{}
    },
    {
        name: "Launchpad Pro MK3 (BL)",
        ...{}
    },
    {
        name: "Launchpad MK2 (BL)",
        ...MK2_MAP
    },
    {
        name: "Launchpad Pro (BL)",
        ...{}
    },
    {
        name: "Launchpad X",
        ...{}
    },
    {
        name: "Launchpad Mini MK3",
        ...{}
    },
    {
        name: "Launchpad Pro MK3",
        ...{}
    },
    {
        name: "Launchpad MK2",
        ...MK2_MAP
    },
    {
        name: "Launchpad Pro",
        ...{}
    },
]

export function getTypeMapping(type: LaunchpadType): Mapping | undefined {
    if (type >= LaunchpadType.BLANK)
        return undefined
    return typeMappings[type + 5]
}
