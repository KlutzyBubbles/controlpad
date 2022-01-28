import * as React from 'react'
import './less/App.less'
// import './Application.less'
import LaunchPad from './board/LaunchPad'
import mapping from '../../mappings/mk2.json'
import { StateMappings, StateMapping, StateMappingOptional } from '../../common/Interfaces'
import { Section, PresetColor } from '../Constants'
import Editor from './editor/Editor'
import { Color, RGB } from '../../common/Color'
import { padManagerInstance } from '../utils/PadManager'
import equal from 'fast-deep-equal'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import context from '../preload/ConfigContextApi';
// import { ipcRenderer } from 'electron';
// import configStore from '../utils/ConfigStore'
import { theme } from './Theme'

export interface SelectedButton {
  section: Section,
  x: number,
  y: number
}

interface AppState {
  selected: SelectedButton | undefined
  stateMappings: StateMappings
  lastColorUpdate: number
}

export default class App extends React.Component<Record<string, never>, AppState> {

  constructor(props: Record<string, never>) {
    super(props)
    this.state = {
      selected: undefined,
      // stateMappings: configStore.get('stateMappings') || {}
      stateMappings: {},
      lastColorUpdate: Date.now()
    }
    padManagerInstance.on('connected', (name) => {
      // console.log(`connected ${name}`)
      const launchpad = padManagerInstance.getLaunchpad(name)
      if (launchpad === undefined)
        return;
      // console.log('Ready for listeners')
      launchpad.addListener('pressed', (location) => {
        // console.log(`pressed ${location}`)
        this.setState(this.changeState(this.state, location[0], location[1], location[2], { pressed: true }) as AppState)
        if (padManagerInstance.online && padManagerInstance.selectedDevice !== undefined) {
          const launchpad = padManagerInstance.getLaunchpad(padManagerInstance.selectedDevice)
          launchpad?.setColor(location[0], location[1], location[2], this.getColor(location[0], location[1], location[2], true))
        }
      })
      launchpad.addListener('released', (location) => {
        // console.log(`released ${location}`)
        this.setState(this.changeState(this.state, location[0], location[1], location[2], { pressed: false }) as AppState)
        if (padManagerInstance.online && padManagerInstance.selectedDevice !== undefined) {
          const launchpad = padManagerInstance.getLaunchpad(padManagerInstance.selectedDevice)
          launchpad?.setColor(location[0], location[1], location[2], this.getColor(location[0], location[1], location[2], false))
        }
      })
    })
    context.loadMappings().then((mappings: StateMappings) => {
      this.setState({
        stateMappings: mappings || {}
      })
    })
  }

  refreshBoardState() {
    console.log('refreshBoardState')
    if (padManagerInstance.online && padManagerInstance.selectedDevice !== undefined) {
      // console.log('padManagerInstance not undefined')
      const launchpad = padManagerInstance.getLaunchpad(padManagerInstance.selectedDevice)
      if (launchpad !== undefined) {
        // console.log('launchpad not undefined')
        for (const sectionName in this.state.stateMappings) {
          console.log(`refreshBoardState 0 ${sectionName}`)
          const section = parseInt(sectionName)
          for (const state of this.state.stateMappings[sectionName]) {
            console.log(`refreshBoardState 1 ${section}`)
            launchpad.setColor(section, state.x, state.y, Color.fromRgba(state.pressed ? state.activeColor : state.inactiveColor))
            if (state.editing) {
              // console.log('setting')
              launchpad.startFlash(section, state.x, state.y, PresetColor.White)
            }
          }
        }
      }
    }
  }

  getColor(section: Section, x: number, y: number, active: boolean): Color {
    let stateMappingsSection: StateMapping[] = []
    if (Object.prototype.hasOwnProperty.call(this.state.stateMappings, section))
      stateMappingsSection = this.state.stateMappings[section]
    let index = -1;
    for (let i = 0; i < stateMappingsSection.length; i++) {
      const item = stateMappingsSection[i]
      if (item.x === x && item.y === y) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      return Color.fromRgba({ r: 0, g: 0, b: 0 })
    } else {
      if (active)
        return Color.fromRgba(stateMappingsSection[index].activeColor)
      return Color.fromRgba(stateMappingsSection[index].inactiveColor)
    }
  }

  getTypeofProperty<T, K extends keyof T>(o: T, name: K) {
      return typeof o[name];
  }

  //Partial<AppState>
  //Pick<AppState, keyof AppState>
  //Omit<AppState, keyof AppState>
  changeState = (state: AppState, section: Section, x: number, y: number, newState: StateMappingOptional): Omit<AppState, keyof AppState> => {
    if (!Object.prototype.hasOwnProperty.call(state.stateMappings, section))
      state.stateMappings[section] = []
    let index = -1;
    for (let i = 0; i < state.stateMappings[section].length; i++) {
      const item = state.stateMappings[section][i]
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
      pulsing: false,
      flashing: false,
      editing: false,
      pressed: false,
      name: ''
    }
    let newObject: StateMapping = oldObject
    let changed = false
    const mappings = state.stateMappings
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
      const result = {
        stateMappings: mappings
      }
      context.saveMappings(result)
      // ipcRenderer.invoke('mappings-save', result)
      return result
    }
    return {}
  }

  changeAndSetState = (section: Section, x: number, y: number, newState: StateMappingOptional) => {
    const changedState = this.changeState(this.state, section, x, y, newState)
    if (changedState === {})
      return
    this.setState({...changedState})
  }

  selectButton = (section?: Section, x?: number, y?: number) => {
    x = x || -1
    y = y || -1
    const mappings = this.state.stateMappings;
    for (const sectionMapping in mappings) {
      for (const item of mappings[sectionMapping]) {
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

  changeColor = (section: Section, x: number, y: number, color: RGB, active: boolean) => {
    // console.log('changeColor')
    if (active == false && padManagerInstance.online && padManagerInstance.selectedDevice !== undefined) {
      console.log('actually setting color')
      const launchpad = padManagerInstance.getLaunchpad(padManagerInstance.selectedDevice)
      const now = Date.now()
      if (now - this.state.lastColorUpdate > 100) {
        console.log('greater than')
        console.log(`changeColor 1 ${section}`)
        launchpad?.setColor(section, x, y, Color.fromRgba(color))
        this.setState({
          lastColorUpdate: now
        })
      }
    }
    const changes: StateMappingOptional = {}
    if (active)
      changes.activeColor = color
    else
      changes.inactiveColor = color
      console.log('setting state')
    this.setState(this.changeState(this.state, section, x, y, changes) as AppState)
  }

  changeName = (section: Section, x: number, y: number, name: string) => {
    this.setState(this.changeState(this.state, section, x, y, {
      name: name
    }) as AppState)
  }

  public render (): JSX.Element {
    return <ThemeProvider theme={theme}>
        <Typography variant="h4" gutterBottom component="div" align="center">
          ControlPad
        </Typography>
        <Container>
          <Grid container spacing={3} alignItems="stretch">
            <Grid item xs="auto">
              <LaunchPad
                selectButton={this.selectButton}
                stateMappings={this.state.stateMappings}
                mapping={mapping}
              />
            </Grid>
              <Grid item xs={12} sm>
                <Editor
                  changeColor={this.changeColor}
                  changeName={this.changeName}
                  selectedButton={this.state.selected}
                  stateMappings={this.state.stateMappings}
                />
              </Grid>
          </Grid>
        </Container>
    </ThemeProvider>
  }
}
