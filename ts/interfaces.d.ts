import { RGB6 } from "./Color"

export interface AnyNumberArray {
  [key: string]: number[]
}

export interface AnyKey {
  [key: string]: AnyNumberArray
}

export interface ColorMapping {
  x: number
  y: number
  activeColor: RGB6
  inactiveColor: RGB6
  pulsing: boolean
  flashing: boolean
}

export interface ColorMappings {
  [key: string]: ColorMapping[]
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
  Top = 0,
  Main = 1,
  Side = 2
}