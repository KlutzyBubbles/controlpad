import * as React from 'react'
import LaunchPad from './board/LaunchPad'
import mapping from '../../mappings/mk2.json'
import { StateMappings, Section, StateMapping } from '../interfaces'
import Editor from './editor/Editor'
import { Color, RGB6 } from '../Color'
import { padManagerInstance } from '../utils/PadManager'
import equal from 'fast-deep-equal'

export interface SelectedButton {
  section: Section,
  x: number,
  y: number
}

interface AppState {
  selected: SelectedButton | undefined
  stateMappings: StateMappings
}

export default class App extends React.Component<{}, AppState> {

  constructor() {
    super({})
    this.state = {
      selected: undefined,
      stateMappings: {}
    }
  }

  changeState = (section: Section, x: number, y: number, state: any) => {
    if (!Object.prototype.hasOwnProperty.call(this.state.stateMappings, section))
      this.state.stateMappings[section] = []
    var index = -1;
    for (var i = 0; i < this.state.stateMappings[section].length; i++) {
      var item = this.state.stateMappings[section][i]
      if (item.x === x && item.y === y) {
        index = i;
        break;
      }
    }
    var oldObject: StateMapping = {
      x: x,
      y: y,
      activeColor: { r: 0, g: 0, b: 0 },
      inactiveColor: { r: 0, g: 0, b: 0 },
      pulsing: false,
      flashing: false,
      editing: false,
      pressed: false
    }
    var newObject: StateMapping = oldObject
    var changed = false
    var mappings = this.state.stateMappings
    if (index === -1) {
      index = this.state.stateMappings[section].length
      newObject = {...oldObject, ...state}
      changed = !equal(oldObject, newObject)
      mappings[section].push(newObject)
    } else {
      oldObject = this.state.stateMappings[section][index]
      newObject = {...oldObject, ...state}
      changed = !equal(oldObject, newObject)
      mappings[section][index] = newObject
    }
    if (changed) {
      this.setState({
        stateMappings: mappings
      })
    }
  }

  selectButton = (section: Section | undefined, x?: number, y?: number, deselectNotify?: Function) => {
    x = x || -1
    y = y || -1
    section = section || Section.Unknown
    var mappings = this.state.stateMappings;
    for (var sectionMapping in mappings) {
      for (var item of mappings[sectionMapping]) {
          item.editing = false
      }
    }
    this.setState({
      stateMappings: mappings
    })
    this.changeState(section, x, y, {
      editing: true
    })
    if (section === undefined) {
      this.setState({
        selected: undefined
      })
    } else {
      this.setState({
        selected: {
          section: section,
          x: x,
          y: y
        }
      })
    }
  }

  changeColor = (section: Section, x: number, y: number, color: RGB6, active: boolean) => {
    console.log('changeColor')
    if (padManagerInstance.online && padManagerInstance.selectedDevice !== undefined) {
      var launchpad = padManagerInstance.getLaunchpad(padManagerInstance.selectedDevice)
      launchpad?.setColor(section, x, y, Color.fromRgb6(color))
    }
    var changes: any = {}
    if (active)
      changes.activeColor = color
    else
      changes.inactiveColor = color
    this.changeState(section, x, y, changes)
  }

  public render (): JSX.Element {
    return <div className='app'>
      <h2>ControlPad</h2>
      <div className='elements'>
        <LaunchPad
          selectButton={this.selectButton}
          stateMappings={this.state.stateMappings}
          mapping={mapping}
        />
        <Editor
          changeColor={this.changeColor}
          selectedButton={this.state.selected}
          stateMappings={this.state.stateMappings}
        />
      </div>
    </div>
  }
}
