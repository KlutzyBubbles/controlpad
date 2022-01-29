import { RGB } from "./Color"

export interface AnyNumberArray {
  [key: string]: number[]
}

export interface AnyKey {
  [key: string]: AnyNumberArray
}

export interface StateMapping {
  x: number
  y: number
  activeColor: RGB
  inactiveColor: RGB
  keyCombo: KeyCombo
  pulsing: boolean
  flashing: boolean
  editing: boolean
  pressed: boolean
  name: string
}

export interface StateMappingOptional {
  x?: number
  y?: number
  activeColor?: RGB
  inactiveColor?: RGB
  keyCombo?: KeyCombo
  pulsing?: boolean
  flashing?: boolean
  editing?: boolean
  pressed?: boolean
  name?: string
}

export interface StateMappings {
  [key: string]: StateMapping[]
}

export interface RowMapping {
  one: number,
  two: number[]
}

export interface GridMappingItem {
  x: number,
  y: number,
  number: number
}

export interface GridMapping {
  [key: string]: GridMappingItem[]
}

export interface Mapping {
  sysExSequence: number[]
  pressedState: number[]
  topRow: RowMapping
  sideColumn: RowMapping
  centerRows: RowMapping[]
  buttonMappings: AnyKey
  gridMappings: GridMapping
}

export interface KeyCombo {
  ctrl?: string
  shift?: string
  alt?: string
  keys?: string[]
}