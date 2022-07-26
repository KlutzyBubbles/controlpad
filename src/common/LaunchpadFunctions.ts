import * as Q from 'Q';
import {
  StateMapping,
  AppState,
} from '@common/Interfaces';
import { Section } from '@common/Constants';
import { Color } from '@common/Color';
import { padManagerInstance } from '@common/PadManager';
import keyboardContext from '@preload/keyboard/KeyboardContextApi';
import Launchpad, { ColorInput, FlashInput } from '@common/Launchpad';
import { hasKeyCombo } from '@common/Utils';
import { insertIntoStateObject } from './ConfigFunctions';

function getColor(state: AppState, section: Section, x: number, y: number, active: boolean): Color {
  let stateMappingsSection: StateMapping[] = [];
  if (Object.prototype.hasOwnProperty.call(state.stateMappings, section))
    stateMappingsSection = state.stateMappings[section];
  let index = -1;
  for (let i = 0; i < stateMappingsSection.length; i++) {
    const item = stateMappingsSection[i];
    if (item.x === x && item.y === y) {
      index = i;
      break;
    }
  }
  if (index === -1) {
    return Color.fromRgba({ r: 0, g: 0, b: 0 });
  } else {
    if (active)
      return Color.fromRgba(stateMappingsSection[index].activeColor);
    return Color.fromRgba(stateMappingsSection[index].inactiveColor);
  }
}

export async function initiateLaunchpad(state: AppState, launchpad: Launchpad): Promise<AppState> {
  initiateAllColors(state, launchpad);
  const deferred = Q.defer()
  launchpad.getDisplayName().then((name) => {
    launchpad.getTypeMappings().then((mapping) => {
      deferred.resolve({
        ...state,
        padStatus: {
          displayName: name,
          name: launchpad.name,
          preparing: false,
          mapping: mapping,
        },
      });
    });
  });
  return deferred.promise
}

function initiateAllColors(state: AppState, launchpad: Launchpad) {
  var colors: ColorInput[] = []
  for (const sectionName in state.stateMappings) {
    const section = parseInt(sectionName);
    for (const stateMappingSection of state.stateMappings[sectionName]) {
      colors.push({
        section: section,
        x: stateMappingSection.x,
        y: stateMappingSection.y,
        color: Color.fromRgba(
          stateMappingSection.pressed ? stateMappingSection.activeColor : stateMappingSection.inactiveColor,
        )
      })
    }
  }
  launchpad.setColorMultiple(colors)
}

export function pressed(state: AppState, location: number[], name: string): AppState {
  if (padManagerInstance.online) {
    const launchpad = padManagerInstance.getLaunchpad(name);
    if (launchpad !== undefined) {
      state = insertIntoStateObject(state, location[0], location[1], location[2], {
          pressed: true,
        });
      setColor(state, launchpad, location, true);
      runKeyCombo(state, location, true);
      return state;
    }
  }
}

export function released(state: AppState, location: number[], name: string): AppState {
  if (padManagerInstance.online) {
    const launchpad = padManagerInstance.getLaunchpad(name);
    if (launchpad !== undefined) {
      state = insertIntoStateObject(state, location[0], location[1], location[2], {
          pressed: false,
        });
      setColor(state, launchpad, location, false);
      runKeyCombo(state, location, false);
      return state;
    }
  }
}

function setColor(state: AppState, launchpad: Launchpad, location: number[], active: boolean) {
  launchpad.setColor(
    location[0],
    location[1],
    location[2],
    getColor(state, location[0], location[1], location[2], active),
  );
}

function runKeyCombo(state: AppState, location: number[], active: boolean) {
  const section = location[0];
  const x = location[1];
  const y = location[2];
  let stateMappingsSection: StateMapping[] = [];
  if (Object.prototype.hasOwnProperty.call(state.stateMappings, section))
    stateMappingsSection = state.stateMappings[section];
  let index = -1;
  for (let i = 0; i < stateMappingsSection.length; i++) {
    const item = stateMappingsSection[i];
    if (item.x === x && item.y === y) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    const keyCombo = stateMappingsSection[index].keyCombo;
    if (hasKeyCombo(keyCombo)) {
      keyboardContext.runKeyCombo({
        keyCombo: keyCombo,
        active: active,
      });
    }
  }
}