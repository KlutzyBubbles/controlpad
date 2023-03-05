import * as React from 'react';
import { KeyCombo, StateMappings, SelectedButton, PlaySound } from '@common/Interfaces';
import Stack from '@mui/material/Stack';
import { Section } from '@common/Constants';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

interface KeyEditorProps {
  selectedButton: SelectedButton;
  stateMappings: StateMappings;
  soundOptions: String[];
  changePlaySound: (
    section: Section,
    x: number,
    y: number,
    playSound: PlaySound,
  ) => void;
}

interface KeyEditorState {
  currentSelected: SelectedButton;
  playSound: PlaySound;
}

export default class KeyEditor extends React.Component<
  KeyEditorProps,
  KeyEditorState
> {
  constructor(props: KeyEditorProps) {
    super(props);
    this.state = {
      ...{
        keyCombo: {},
        currentSelected: props.selectedButton,
      },
      ...this.refreshKeys(true),
    };
  }

  handleKeyTextFocus = (/* event: React.FocusEvent<HTMLInputElement> */) => {
    this.setState({
      keyCombo: {},
    });
    this.refreshKeys();
  };

  handleKeyDown = (keydownEvent: React.KeyboardEvent) => {
    const combo: KeyCombo = this.state.keyCombo || {};
    keydownEvent.preventDefault();
    const keyName = keydownEvent.key;
    const ignoredKeys = [
      'CAPS LOCK',
      'NUM LOCK',
      'SCROLL LOCK',
      'PAUSE/BREAK',
      'MY CALCULATOR',
    ];
    let changed = true;
    if (ignoredKeys.indexOf(keyName) !== -1) return;
    if (keyName.includes('Control')) {
      combo.ctrl = keydownEvent.code.includes('Left')
        ? 'LeftControl'
        : 'RightControl';
    } else if (keyName.includes('Shift')) {
      combo.shift = keydownEvent.code.includes('Left')
        ? 'LeftShift'
        : 'RightShift';
    } else if (keyName.includes('Alt')) {
      combo.alt = keydownEvent.code.includes('Left') ? 'LeftAlt' : 'RightAlt';
    } else {
      if (combo.keys === undefined) combo.keys = [];
      if (!combo.keys.includes(keyName)) {
        combo.keys.push(
          keyName.length > 1
            ? `${keyName.charAt(0).toUpperCase()}${keyName.slice(1)}`
            : keyName.toUpperCase(),
        );
      } else {
        changed = false;
      }
    }
    if (changed) {
      this.props.changeKeyCombo(
        this.props.selectedButton.section,
        this.props.selectedButton.x,
        this.props.selectedButton.y,
        combo,
      );
      this.setState({
        keyCombo: combo,
      });
    }
    this.refreshKeys();
  };

  getKeyDisplay = () => {
    const combo = this.state.keyCombo;
    const display = [];
    if (combo.ctrl) display.push(combo.ctrl);
    if (combo.shift) display.push(combo.shift);
    if (combo.alt) display.push(combo.alt);
    if (combo.keys !== undefined) {
      for (const key of combo.keys) {
        display.push(key);
      }
    }
    return display.join(' + ');
  };

  refreshSounds(init = false) {
    if (
      !Object.prototype.hasOwnProperty.call(
        this.props.stateMappings,
        this.props.selectedButton.section,
      )
    )
      this.props.stateMappings[this.props.selectedButton.section] = [];
    if (
      init ||
      (this.state.currentSelected !== undefined &&
        this.props.selectedButton != this.state.currentSelected)
    ) {
      for (const state of this.props.stateMappings[
        this.props.selectedButton.section
      ]) {
        if (
          state.x === this.props.selectedButton.x &&
          state.y === this.props.selectedButton.y
        ) {
          if (init) {
            return {
              playSound: state.playSound || {},
              currentSelected: this.props.selectedButton,
            };
          } else {
            this.setState({
              playSound: state.playSound || {},
              currentSelected: this.props.selectedButton,
            });
          }
        }
      }
    }
  }

  handleTapColorToggleClick = (toggle: boolean) => {
    if (this.state.playSound.colorToggle === undefined)
      this.setState({
        playSound: {
          colorToggle: false,
        },
      });
    if (this.state.playSound.colorToggle === toggle) return;
    const sound = this.state.playSound;
    sound.colorToggle = toggle;
    this.props.changePlaySound(
      this.props.selectedButton.section,
      this.props.selectedButton.x,
      this.props.selectedButton.y,
      sound,
    );
    this.setState({
      playSound: sound,
    });
  };

  handleTapSoundToggleClick = (toggle: boolean) => {
    if (this.state.playSound.toggle === undefined)
      this.setState({
        playSound: {
          toggle: false,
        },
      });
    if (this.state.playSound.toggle === toggle) return;
    const sound = this.state.playSound;
    sound.toggle = toggle;
    this.props.changePlaySound(
      this.props.selectedButton.section,
      this.props.selectedButton.x,
      this.props.selectedButton.y,
      sound,
    );
    this.setState({
      playSound: sound,
    });
  };

  public render(): JSX.Element {
    let options = []
    for (var option of this.props.soundOptions) {
      options.push(<MenuItem value={option}>{option}</MenuItem>)
    }
    return (
      <React.Fragment>
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='stretch'
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Select
            id='sound-name'
            label='Sound'
            variant='standard'
            onFocus={this.handleKeyTextFocus}
            value={this.getKeyDisplay()}
            onKeyDown={this.handleKeyDown}
          >
            {options}
          </Select>
        </Stack>
        <Stack
          direction='row'
          justifyContent='left'
          alignItems='stretch'
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Button
            variant={this.state.playSound.toggle ? 'outlined' : 'contained'}
            onClick={this.handleTapColorToggleClick.bind(this, false)}
          >
            Color Hold
          </Button>
          <Button
            variant={this.state.playSound.toggle ? 'contained' : 'outlined'}
            onClick={this.handleTapColorToggleClick.bind(this, true)}
          >
            Color Toggle
          </Button>
        </Stack>
        <Stack
          direction='row'
          justifyContent='left'
          alignItems='stretch'
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Button
            variant={this.state.playSound.toggle ? 'outlined' : 'contained'}
            onClick={this.handleTapSoundToggleClick.bind(this, false)}
          >
            Sound Hold
          </Button>
          <Button
            variant={this.state.playSound.toggle ? 'contained' : 'outlined'}
            onClick={this.handleTapSoundToggleClick.bind(this, true)}
          >
            Sound Toggle
          </Button>
        </Stack>
      </React.Fragment>
    );
  }
}
