import { RGB } from './Color';
import { Section } from '@common/Constants';

export interface AnyNumberArray {
  [key: string]: number[];
}

export interface AnyKey {
  [key: string]: AnyNumberArray;
}

export interface StateMapping {
  x: number;
  y: number;
  activeColor: RGB;
  inactiveColor: RGB;
  keyCombo?: KeyCombo;
  playSound?: PlaySound;
  pulsing: boolean;
  flashing: boolean;
  editing: boolean;
  pressed: boolean;
  name: string;
}

export interface StateMappingOptional {
  x?: number;
  y?: number;
  activeColor?: RGB;
  inactiveColor?: RGB;
  keyCombo?: KeyCombo;
  playSound?: PlaySound;
  pulsing?: boolean;
  flashing?: boolean;
  editing?: boolean;
  pressed?: boolean;
  name?: string;
}

export interface StateMappings {
  [key: string]: StateMapping[];
}

export type MappingEventItem = {
  stateMappings: StateMappings;
}

export type SoundEventItem = {
  soundLocation: string;
}


export interface RowMapping {
  one: number;
  two: number[];
}

export interface GridMappingItem {
  x: number;
  y: number;
  number: number;
}

export interface GridMapping {
  [key: string]: GridMappingItem[];
}

export interface Mapping {
  name: string;
  sysExSequence?: number[];
  pressedState?: number[];
  topRow?: RowMapping;
  sideColumn?: RowMapping;
  centerRows?: RowMapping[];
  gridMappings?: GridMapping;
}

export interface PlaySound {
  soundFile?: string;
  colorToggle?: boolean;
  toggle?: boolean;
}

export enum ColorMode {
  Tap = 0,
  ChangeWhilePlaying = 1
}

export enum PlayMode {
  TapStartStop = 0,
  TapStartStart = 1,
  HoldToPlay = 2
}

export interface KeyCombo {
  ctrl?: string;
  shift?: string;
  alt?: string;
  keys?: string[];
  toggle?: boolean;
}
export interface KeyComboIPC {
  keyCombo: KeyCombo;
  active: boolean;
}

export interface SelectedButton {
  section: Section;
  x: number;
  y: number;
}

interface PadStatus {
  preparing: boolean;
  displayName: string;
  name: string;
  mapping: Mapping;
}

export interface AppState {
  selected?: SelectedButton;
  stateMappings?: StateMappings;
  lastColorUpdate?: number;
  padStatus?: PadStatus;
}

