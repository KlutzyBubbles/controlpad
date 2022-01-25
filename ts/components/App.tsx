import * as React from 'react'
import LaunchPad from './board/LaunchPad'
import mapping from '../../mappings/mk2.json'
import { StateMappings, Section, StateMapping, PresetColor, AnyObject } from '../interfaces'
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
    padManagerInstance.on('connected', (name) => {
      console.log(`connected ${name}`)
      var launchpad = padManagerInstance.getLaunchpad(name)
      if (launchpad === undefined)
        return;
      console.log('Ready for listeners')
      launchpad.addListener('pressed', (location) => {
        console.log(`pressed ${location}`)
        this.setState(this.changeState(this.state, location[0], location[1], location[2], { pressed: true }) as AppState)
        if (padManagerInstance.online && padManagerInstance.selectedDevice !== undefined) {
          var launchpad = padManagerInstance.getLaunchpad(padManagerInstance.selectedDevice)
          launchpad?.setColor(location[0], location[1], location[2], this.getColor(location[0], location[1], location[2], true))
        }
      })
      launchpad.addListener('released', (location) => {
        console.log(`released ${location}`)
        this.setState(this.changeState(this.state, location[0], location[1], location[2], { pressed: false }) as AppState)
        if (padManagerInstance.online && padManagerInstance.selectedDevice !== undefined) {
          var launchpad = padManagerInstance.getLaunchpad(padManagerInstance.selectedDevice)
          launchpad?.setColor(location[0], location[1], location[2], this.getColor(location[0], location[1], location[2], false))
        }
      })
    })
  }

  refreshBoardState() {
    console.log('refreshBoardState')
    if (padManagerInstance.online && padManagerInstance.selectedDevice !== undefined) {
      console.log('padManagerInstance not undefined')
      var launchpad = padManagerInstance.getLaunchpad(padManagerInstance.selectedDevice)
      if (launchpad !== undefined) {
        console.log('launchpad not undefined')
        for (var sectionName in this.state.stateMappings) {
          var section = parseInt(sectionName)
          for (var state of this.state.stateMappings[sectionName]) {
            launchpad.setColor(section, state.x, state.y, Color.fromRgb6(state.pressed ? state.activeColor : state.inactiveColor))
            if (state.editing) {
              console.log('setting')
              launchpad.startFlash(section, state.x, state.y, PresetColor.White)
            }
          }
        }
      }
    }
  }

  getColor(section: Section, x: number, y: number, active: boolean): Color {
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
    if (index === -1) {
      return Color.fromRgb6({ r: 0, g: 0, b: 0 })
    } else {
      if (active)
        return Color.fromRgb6(this.state.stateMappings[section][index].activeColor)
      return Color.fromRgb6(this.state.stateMappings[section][index].inactiveColor)
    }
  }

  changeState = (state: AppState, section: Section, x: number, y: number, newState: any): AnyObject => {
    if (!Object.prototype.hasOwnProperty.call(state.stateMappings, section))
      state.stateMappings[section] = []
    var index = -1;
    for (var i = 0; i < state.stateMappings[section].length; i++) {
      var item = state.stateMappings[section][i]
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
    var mappings = state.stateMappings
    if (index === -1) {
      newObject = {...oldObject, ...newState}
      changed = !equal(oldObject, newObject)
      mappings[section].push(newObject)
    } else {
      oldObject = state.stateMappings[section][index]
      newObject = {...oldObject, ...newState}
      changed = !equal(oldObject, newObject)
      mappings[section][index] = newObject
    }
    if (changed) {
      return {
        stateMappings: mappings
      }
    }
    return {}
  }

  selectButton = (section: Section | undefined, x?: number, y?: number) => {
    x = x || -1
    y = y || -1
    var mappings = this.state.stateMappings;
    for (var sectionMapping in mappings) {
      for (var item of mappings[sectionMapping]) {
          item.editing = false
      }
    }
    this.setState({
      stateMappings: mappings
    })
    if (section === undefined) {
      this.setState({
        selected: undefined
      })
    } else {
      this.setState({...this.changeState(this.state, section, x, y, {
        editing: true
      }), ...{
        selected: {
          section: section,
          x: x,
          y: y
        }
      }})
    }
    this.refreshBoardState()
  }

  changeColor = (section: Section, x: number, y: number, color: RGB6, active: boolean) => {
    console.log('changeColor')
    if (active == false && padManagerInstance.online && padManagerInstance.selectedDevice !== undefined) {
      var launchpad = padManagerInstance.getLaunchpad(padManagerInstance.selectedDevice)
      launchpad?.setColor(section, x, y, Color.fromRgb6(color))
    }
    var changes: any = {}
    if (active)
      changes.activeColor = color
    else
      changes.inactiveColor = color
    this.setState(this.changeState(this.state, section, x, y, changes) as AppState)
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
