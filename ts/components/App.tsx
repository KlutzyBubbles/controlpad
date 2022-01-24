import * as React from 'react'
import LaunchPad from './board/LaunchPad'
import mapping from '../../mappings/mk2.json'
import { ColorMappings, Section } from '../interfaces'
import Editor from './editor/Editor'
import { Color, RGB6 } from '../Color'
import { padManagerInstance } from '../utils/PadManager'

export interface SelectedButton {
  section: Section,
  x: number,
  y: number,
  deselectNotify?: Function
}

interface AppState {
  selected: SelectedButton | undefined
  colorMappings: ColorMappings
}

export default class App extends React.Component<{}, AppState> {

  constructor() {
    super({})
    this.state = {
      selected: undefined,
      colorMappings: {}
    }
  }

  selectButton = (section: Section | undefined, x?: number, y?: number, deselectNotify?: Function) => {
    x = x || -1
    y = y || -1
    if (this.state.selected !== undefined) {
      console.log(this.state.selected)
      if (typeof this.state.selected.deselectNotify === "function") this.state.selected.deselectNotify()
    }
    if (section === undefined) {
      this.setState({
        selected: undefined
      })
    } else {
      this.setState({
        selected: {
          section: section,
          x: x,
          y: y,
          deselectNotify: deselectNotify
        }
      })
    }
  }

  changeColor = (section: Section, x: number, y: number, color: RGB6, active: boolean) => {
    if (!Object.prototype.hasOwnProperty.call(this.state.colorMappings, section))
      this.state.colorMappings[section] = []
    if (padManagerInstance.online && padManagerInstance.selectedDevice !== undefined) {
      var launchpad = padManagerInstance.getLaunchpad(padManagerInstance.selectedDevice)
      launchpad?.setColor(section, x, y, Color.fromRgb6(color))
    }
    var index = -1;
    for (var i = 0; i < this.state.colorMappings[section].length; i++) {
      var item = this.state.colorMappings[section][i]
      if (item.x === x && item.y === y) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      index = this.state.colorMappings[section].length
      this.state.colorMappings[section].push({
        x: x,
        y: y,
        activeColor: { r: 0, g: 0, b: 0 },
        inactiveColor: { r: 0, g: 0, b: 0 },
        pulsing: false,
        flashing: false,
      })
    }
    var mappings = this.state.colorMappings
    if (active)
      mappings[section][index].activeColor = color
    else
      mappings[section][index].inactiveColor = color
    this.setState({
      colorMappings: mappings
    })
  }

  public render (): JSX.Element {
    return <div className='app'>
      <h2>ControlPad</h2>
      <div className='elements'>
        <LaunchPad
          selectButton={this.selectButton}
          colorMappings={this.state.colorMappings}
          mapping={mapping}
        />
        <Editor
          changeColor={this.changeColor}
          selectedButton={this.state.selected}
        />
      </div>
    </div>
  }
}
