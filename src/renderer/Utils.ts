import { Section } from "../common/Constants";

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