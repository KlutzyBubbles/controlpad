import { RGB6 } from "./Color"

export interface AnyNumberArray {
  [key: string]: number[]
}

export interface AnyKey {
  [key: string]: AnyNumberArray
}

export interface StateMapping {
  x: number
  y: number
  activeColor: RGB6
  inactiveColor: RGB6
  pulsing: boolean
  flashing: boolean
  editing: boolean
  pressed: boolean
}

export interface StateMappings {
  [key: string]: StateMapping[]
}

export interface RowMapping {
  one: number,
  two: number[]
}

export interface Mapping {
  pressedState: number[]
  topRow: RowMapping
  sideColumn: RowMapping
  centerRows: RowMapping[]
  buttonMappings: AnyKey
}

export const enum Section {
  Unknown = -1,
  Top = 0,
  Main = 1,
  Side = 2
}