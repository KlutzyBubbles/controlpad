import {
  StateMapping,
  StateMappingOptional,
  KeyCombo,
  PlaySound,
  AppState,
} from '@common/Interfaces';
import { Section, PresetColor } from '@common/Constants';
import { Color, RGB } from '@common/Color';
import { padManagerInstance } from '@common/PadManager';
import equal from 'fast-deep-equal';
import configContext from '@preload/config/ConfigContextApi';
import { ColorInput, FlashInput } from '@common/Launchpad';

async function refreshBoardState(state: AppState) {
  if (
    padManagerInstance.online &&
    padManagerInstance.selectedDevice !== undefined
  ) {
    const launchpad = padManagerInstance.getLaunchpad(
      padManagerInstance.selectedDevice,
    );
    if (launchpad !== undefined) {
      var colors: ColorInput[] = []
      var flashingColors: FlashInput[] = []
      for (const sectionName in state.stateMappings) {
        const section = parseInt(sectionName);
        for (const stateMappingItem of state.stateMappings[sectionName]) {
          colors.push({
            section: section,
            x: stateMappingItem.x,
            y: stateMappingItem.y,
            color: Color.fromRgba(
              stateMappingItem.pressed ? stateMappingItem.activeColor : stateMappingItem.inactiveColor,
            )
          })
          if (stateMappingItem.editing) {
            flashingColors.push({
              section: section,
              x: stateMappingItem.x,
              y: stateMappingItem.y,
              color: PresetColor.White
            })
          }
        }
      }
      await launchpad.setColorMultiple(colors)
      await launchpad.startFlashMultiple(flashingColors)
    }
  }
}

export function insertIntoStateObject(
  state: AppState,
  section: Section,
  x: number,
  y: number,
  newState: StateMappingOptional,
  override = false,
): AppState {
  if (!Object.prototype.hasOwnProperty.call(state.stateMappings, section))
    state.stateMappings[section] = [];
  let index = -1;
  for (let i = 0; i < state.stateMappings[section].length; i++) {
    const item = state.stateMappings[section][i];
    if (item.x === x && item.y === y) {
      index = i;
      break;
    }
  }
  let oldObject: StateMapping = {
    x: x,
    y: y,
    activeColor: { r: 0, g: 0, b: 0 },
    inactiveColor: { r: 0, g: 0, b: 0 },
    keyCombo: {},
    pulsing: false,
    flashing: false,
    editing: false,
    pressed: false,
    name: '',
  };
  let newObject: StateMapping = oldObject;
  let changed = false;
  const mappings = state.stateMappings;
  if (index === -1) {
    newObject = { ...oldObject, ...newState };
    changed = !equal(oldObject, newObject);
    mappings[section].push(newObject);
  } else {
    if (!override) oldObject = state.stateMappings[section][index];
    newObject = { ...oldObject, ...newState };
    changed = !equal(oldObject, newObject);
    mappings[section][index] = newObject;
  }
  if (changed) {
    const result = {
      stateMappings: mappings,
    };
    configContext.saveMappings(result);
    // ipcRenderer.invoke('mappings-save', result)
    return result;
  }
  return {};
};

export function selectButton(state: AppState, section?: Section, x?: number, y?: number): AppState {
  x = x || -1;
  y = y || -1;
  const mappings = state.stateMappings ?? {};
  for (const sectionMapping in mappings) {
    for (const item of mappings[sectionMapping]) {
      item.editing = false;
    }
  }
  state = {
    ...state,
    stateMappings: mappings,
  };
  if (section === undefined) {
    var newState: AppState = {
      selected: undefined,
      stateMappings: mappings
    };
    refreshBoardState(newState);
    return newState;
  } else {
    var newState: AppState = {
      ...insertIntoStateObject(state, section, x, y, {
        editing: true,
      }),
      ...{
        selected: {
          section: section,
          x: x,
          y: y,
        },
      },
    };
    refreshBoardState(newState);
    return newState;
  }
};

export function changeColor(
  state: AppState,
  section: Section,
  x: number,
  y: number,
  color: RGB,
  active: boolean,
): AppState {
  if (
    active == false &&
    padManagerInstance.online &&
    padManagerInstance.selectedDevice !== undefined
  ) {
    const launchpad = padManagerInstance.getLaunchpad(
      padManagerInstance.selectedDevice,
    );
    const now = Date.now();
    if (now - state.lastColorUpdate > 100) {
      launchpad?.setColor(section, x, y, Color.fromRgba(color));
      state = {
        ...state,
        lastColorUpdate: now,
      };
    }
  }
  const changes: StateMappingOptional = {};
  if (active) changes.activeColor = color;
  else changes.inactiveColor = color;
  return insertIntoStateObject(state, section, x, y, changes);
};

export function changeName(state: AppState, section: Section, x: number, y: number, name: string): AppState {
  return insertIntoStateObject(state, section, x, y, { name: name });
};

export function changeKeyCombo(
  state: AppState,
  section: Section,
  x: number,
  y: number,
  combo: KeyCombo,
): AppState {
  return insertIntoStateObject(state, section, x, y, { keyCombo: combo });
};

export function changePlaySound(
  state: AppState,
  section: Section,
  x: number,
  y: number,
  playSound: PlaySound,
): AppState {
  return insertIntoStateObject(state, section, x, y, { playSound: playSound});
};

export function clearAll(state: AppState, section: Section, x: number, y: number): AppState {
  state = insertIntoStateObject(state, section, x, y, { editing: true }, true);
  return selectButton(state)
};