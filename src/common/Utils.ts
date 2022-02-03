import { KeyCombo } from "@common/Interfaces";
import { Section } from "@common/Constants";

export function hasKeyCombo(keyCombo?: KeyCombo): boolean {
    if (keyCombo === undefined)
        return false
    if (!keyCombo.alt && !keyCombo.shift && !keyCombo.ctrl) {
        if (!keyCombo.keys || keyCombo.keys.length === 0)
            return false
    }
    return true
}

export function sectionToString(section: Section) {
    switch(section) {
        case Section.Main:
            return 'Main'
        case Section.Side:
            return 'Side'
        case Section.Top:
            return 'Top'
        default:
            return 'Unknown'
    }
}