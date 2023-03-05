import * as React from 'react';
import './less/App.less';
import LaunchPad from './board/LaunchPad';
import {
  StateMappings,
  KeyCombo,
  PlaySound,
  AppState,
} from '@common/Interfaces';
import { Section } from '@common/Constants';
import Editor from './editor/Editor';
import { RGB } from '@common/Color';
import { padManagerInstance } from '@common/PadManager';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import configContext from '@preload/config/ConfigContextApi';
import Chip from '@mui/material/Chip';
import {
  selectButton,
  changeColor,
  changeName,
  changeKeyCombo,
  changePlaySound,
  clearAll
} from '@common/ConfigFunctions'
import { initiateLaunchpad, pressed, released } from '@common/LaunchpadFunctions'

export default class App extends React.Component<
  Record<string, never>,
  AppState
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      selected: undefined,
      stateMappings: {},
      lastColorUpdate: Date.now(),
    };
    padManagerInstance.on('connected', (name) => {
      if (padManagerInstance.online) {
        const launchpad = padManagerInstance.getLaunchpad(name);
        if (launchpad !== undefined) {
          this.prepareInput(name);
        }
      }
    });
    configContext.loadMappings().then((mappings: StateMappings) => {
      this.setState({
        stateMappings: mappings || {},
      });
    });
    configContext.addChangeListener((loadedMappings) => {
      this.setState({
        stateMappings: loadedMappings || {},
      });
    });
  }

  prepareInput(name: string) {
    if (padManagerInstance.online) {
      const launchpad = padManagerInstance.getLaunchpad(name);
      if (launchpad !== undefined) {
        const listenerTimer = setTimeout(() => {
          if (launchpad !== undefined) {
            initiateLaunchpad(this.state, launchpad).then((newState) => this.setState(newState));
          }
        }, 5000);
        launchpad.once('type', () => {
          clearTimeout(listenerTimer);
          if (launchpad !== undefined) {
            initiateLaunchpad(this.state, launchpad).then((newState) => this.setState(newState));
          }
        });
        launchpad.getType();
        launchpad.on('pressed', (location, name) => {
          pressed(this.state, location, name);
        });
        launchpad.on('released', (location, name) => {
          released(this.state, location, name);
        });
      }
    }
  }

  selectButton = (section?: Section, x?: number, y?: number) => {
    this.setState(selectButton(this.state, section, x, y))
  };

  changeColor = (section: Section, x: number, y: number, color: RGB, active: boolean) => {
    this.setState(changeColor(this.state, section, x, y, color, active))
  };

  changeName = (section: Section, x: number, y: number, name: string) => {
    this.setState(changeName(this.state, section, x, y, name))
  };

  changeKeyCombo = (section: Section, x: number, y: number, combo: KeyCombo) => {
    this.setState(changeKeyCombo(this.state, section, x, y, combo))
  };

  changePlaySound = (section: Section, x: number, y: number, playSound: PlaySound) => {
    this.setState(changePlaySound(this.state, section, x, y, playSound))
  };

  clearAll = (section: Section, x: number, y: number) => {
    this.setState(clearAll(this.state, section, x, y))
  };

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Typography
          sx={{ mt: 2 }}
          variant='h4'
          gutterBottom
          component='div'
          align='center'
        >
          ControlPad
        </Typography>
        <Chip
          sx={{ position: 'absolute', top: 10, right: 10 }}
          label={
            this.state.padStatus ? this.state.padStatus.name : 'Disconnected'
          }
          color={
            this.state.padStatus
              ? this.state.padStatus.preparing
                ? 'warning'
                : 'success'
              : 'error'
          }
          variant='outlined'
        />
        <Container>
          <Grid container spacing={3} alignItems='stretch'>
            <Grid item xs='auto'>
              <LaunchPad
                selectButton={this.selectButton}
                stateMappings={this.state.stateMappings}
                mapping={this.state.padStatus?.mapping}
              />
            </Grid>
            <Grid item xs={12} sm>
              <Editor
                key={`${this.state.selected?.section},${this.state.selected?.x},${this.state.selected?.y}`}
                changeColor={this.changeColor}
                changeName={this.changeName}
                changeKeyCombo={this.changeKeyCombo}
                changePlaySound={this.changePlaySound}
                clearAll={this.clearAll}
                selectedButton={this.state.selected}
                stateMappings={this.state.stateMappings}
              />
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}
