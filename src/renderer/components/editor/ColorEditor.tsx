import * as React from 'react';
import { Color, RGB } from '@common/Color';
import { StateMappings, SelectedButton } from '@common/Interfaces';
import {
  Color as MUIColor,
  ColorPicker,
  createColor,
  ColorFormat,
} from 'mui-color';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import { Section } from '@common/Constants';
import Container from '@mui/material/Container';

interface ColorEditorProps {
  selectedButton: SelectedButton;
  stateMappings: StateMappings;
  changeColor: (
    section: Section,
    x: number,
    y: number,
    color: RGB,
    active: boolean,
  ) => void;
}

interface ColorEditorState {
  currentSelected: SelectedButton;
  activeColor: MUIColor;
  inactiveColor: MUIColor;
  selectedInactiveColor: PresetColor;
  selectedActiveColor: PresetColor;
}

const enum PresetColor {
  None = 'none',
  Black = 'black',
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Lime = 'lime',
  Blue = 'blue',
  Purple = 'purple',
  Pink = 'pink',
  LightBlue = 'lightblue',
}

export default class ColorEditor extends React.Component<
  ColorEditorProps,
  ColorEditorState
> {
  constructor(props: ColorEditorProps) {
    super(props);
    this.state = {
      ...{
        activeColor: createColor(
          {
            r: 241,
            g: 112,
            b: 19,
          },
          'rgb' as unknown as ColorFormat,
        ),
        inactiveColor: createColor(
          {
            r: 241,
            g: 112,
            b: 19,
          },
          'rgb' as unknown as ColorFormat,
        ),
        currentSelected: props.selectedButton,
        selectedInactiveColor: PresetColor.None,
        selectedActiveColor: PresetColor.None,
      },
      ...this.refreshColors(true),
    };
  }

  handleActiveChange = (color: MUIColor, radio = false) => {
    this.setState({
      activeColor: color,
    });
    if (!radio) {
      this.setState({
        selectedActiveColor: PresetColor.None,
      });
    }
    if (this.props.selectedButton !== undefined) {
      this.props.changeColor(
        this.props.selectedButton.section,
        this.props.selectedButton.x,
        this.props.selectedButton.y,
        Color.fromRgbArray(color.rgb).toRgb8(),
        true,
      );
    }
    this.refreshColors();
  };

  handleInactiveChange = (color: MUIColor, radio = false) => {
    this.setState({
      inactiveColor: color,
    });
    if (!radio) {
      this.setState({
        selectedInactiveColor: PresetColor.None,
      });
    }
    if (this.props.selectedButton !== undefined) {
      this.props.changeColor(
        this.props.selectedButton.section,
        this.props.selectedButton.x,
        this.props.selectedButton.y,
        Color.fromRgbArray(color.rgb).toRgb8(),
        false,
      );
    }
    this.refreshColors();
  };

  refreshColors(init = false) {
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
              currentSelected: this.props.selectedButton,
              activeColor: createColor(
                state.activeColor,
                'rgb' as unknown as ColorFormat,
              ),
              inactiveColor: createColor(
                state.inactiveColor,
                'rgb' as unknown as ColorFormat,
              ),
              selectedInactiveColor: PresetColor.None,
              selectedActiveColor: PresetColor.None,
            };
          } else {
            this.setState({
              currentSelected: this.props.selectedButton,
              activeColor: createColor(
                state.activeColor,
                'rgb' as unknown as ColorFormat,
              ),
              inactiveColor: createColor(
                state.inactiveColor,
                'rgb' as unknown as ColorFormat,
              ),
              selectedInactiveColor: PresetColor.None,
              selectedActiveColor: PresetColor.None,
            });
          }
        }
      }
    }
  }

  handleInactivePresetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      selectedInactiveColor: event.target.value as PresetColor,
    });
    this.handleInactiveChange(createColor(event.target.value), true);
  };

  inactiveItemProps = (item: PresetColor) => {
    const color = createColor(item).css.backgroundColor;
    return {
      checked: this.state.selectedInactiveColor === item,
      onChange: this.handleInactivePresetChange,
      value: item,
      name: 'color-radio-button-demo',
      sx: {
        color: color,
        '&.Mui-checked': {
          color: color,
        },
      },
      inputProps: { 'aria-label': item },
    };
  };

  handleActivePresetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      selectedActiveColor: event.target.value as PresetColor,
    });
    this.handleActiveChange(createColor(event.target.value), true);
  };

  activeItemProps = (item: PresetColor) => {
    const color = createColor(item).css.backgroundColor;
    return {
      checked: this.state.selectedActiveColor === item,
      onChange: this.handleActivePresetChange,
      value: item,
      name: 'color-radio-button-demo',
      sx: {
        ml: 0,
        color: color,
        '&.Mui-checked': {
          color: color,
        },
      },
      inputProps: { 'aria-label': item },
    };
  };

  public render(): JSX.Element {
    return (
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='flex-start'
        spacing={2}
      >
        <Container>
          <Stack
            direction='row'
            justifyContent='space-between'
            spacing={3}
            alignItems='baseline'
          >
            <Typography sx={{ mr: 2 }} variant='h6' gutterBottom component='div'>
              Inactive
            </Typography>
            <Stack
              direction='row'
              justifyContent='flex-start'
              alignItems='center'
              spacing={0}
            >
              <ColorPicker
                disableAlpha={true}
                hideTextfield={true}
                value={this.state.inactiveColor}
                onChange={this.handleInactiveChange}
              />
              <Radio {...this.inactiveItemProps(PresetColor.Black)} />
              <Radio {...this.inactiveItemProps(PresetColor.Red)} />
              <Radio {...this.inactiveItemProps(PresetColor.Lime)} />
              <Radio {...this.inactiveItemProps(PresetColor.Blue)} />
              <Radio {...this.inactiveItemProps(PresetColor.Yellow)} />
              <Radio {...this.inactiveItemProps(PresetColor.Orange)} />
              <Radio {...this.inactiveItemProps(PresetColor.Pink)} />
              <Radio {...this.inactiveItemProps(PresetColor.Purple)} />
              <Radio {...this.inactiveItemProps(PresetColor.LightBlue)} />
            </Stack>
          </Stack>
        </Container>
        <Container>
          <Stack
            direction='row'
            justifyContent='space-between'
            spacing={3}
            alignItems='baseline'
          >
            <Typography sx={{ mr: 2 }} variant='h6' gutterBottom component='div'>
              Active
            </Typography>
            <Stack
              direction='row'
              justifyContent='flex-start'
              alignItems='center'
              spacing={0}
            >
              <ColorPicker
                disableAlpha={true}
                hideTextfield={true}
                value={this.state.activeColor}
                onChange={this.handleActiveChange}
              />
              <Radio {...this.activeItemProps(PresetColor.Black)} />
              <Radio {...this.activeItemProps(PresetColor.Red)} />
              <Radio {...this.activeItemProps(PresetColor.Lime)} />
              <Radio {...this.activeItemProps(PresetColor.Blue)} />
              <Radio {...this.activeItemProps(PresetColor.Yellow)} />
              <Radio {...this.activeItemProps(PresetColor.Orange)} />
              <Radio {...this.activeItemProps(PresetColor.Pink)} />
              <Radio {...this.activeItemProps(PresetColor.Purple)} />
              <Radio {...this.activeItemProps(PresetColor.LightBlue)} />
            </Stack>
          </Stack>
        </Container>
      </Stack>
    );
  }
}
