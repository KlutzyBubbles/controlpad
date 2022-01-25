import { RGB6 } from "./Color"

export interface AnyNumberArray {
  [key: string]: number[]
}

export interface AnyKey {
  [key: string]: AnyNumberArray
}

export interface AnyObject {
  [key: string]: any
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