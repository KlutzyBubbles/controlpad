import { KeyCombo } from "@common/Interfaces";

export function hasKeyCombo(keyCombo?: KeyCombo): boolean {
    if (keyCombo === undefined)
        return false
    if (!keyCombo.alt && !keyCombo.shift && !keyCombo.ctrl) {
        if (!keyCombo.keys || keyCombo.keys.length === 0)
            return false
    }
    return true
}