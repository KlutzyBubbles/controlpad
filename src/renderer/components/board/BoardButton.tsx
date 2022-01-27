import * as React from 'react'
import { Color, RGB } from '../../../common/Color';
import { PresetColor, Section } from '../../Constants'
import { padManagerInstance } from '../../utils/PadManager';

export const enum BoardButtonType {
  Circle = 0,
  Square = 1
}

interface BoardButtonProps extends React.ClassAttributes<BoardButton> {
  section: Section
  x: number
  y: number
  type: BoardButtonType
  id: number[]
  selectButton: Function
  activeColor: RGB
  inactiveColor: RGB
  flashing: boolean
  pulsing: boolean
  editing: boolean
  pressed: boolean
}

export default class BoardButton extends React.Component<BoardButtonProps, {}> {
  constructor (props: BoardButtonProps) {
    super(props)
    // if (padManagerInstance.online && padManagerInstance.selectedDevice !== undefined) {
    //   var launchpad = padManagerInstance.getLaunchpad(padManagerInstance.selectedDevice)
    //   launchpad?.setColor(this.props.section, this.props.x, this.props.y, Color.fromRgb6(this.props.inactiveColor))
    // }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.editing) {
      this.props.selectButton(undefined)
    } else {
      this.props.selectButton(this.props.x, this.props.y)
    }
    // if (padManagerInstance.online && padManagerInstance.selectedDevice !== undefined) {
    //   var launchpad = padManagerInstance.getLaunchpad(padManagerInstance.selectedDevice)
    //   launchpad?.startFlash(this.props.section, this.props.x, this.props.y, PresetColor.White)
    // }
    // if (padManagerInstance.online && padManagerInstance.selectedDevice !== undefined) {
    //   var launchpad = padManagerInstance.getLaunchpad(padManagerInstance.selectedDevice)
    //   var color = Color.random()
    //   console.log(color)
    //   console.log(color.toHex())
    //   launchpad?.setColor(this.props.section, this.props.x, this.props.y, color)
    //   this.setState({
    //     color: color
    //   })
    // }
  }

  public render (): JSX.Element {
    const classes = ['board-button']
    if (this.props.pressed) {
      classes.push('pressed')
    }
    if (this.props.type === BoardButtonType.Circle) {
      classes.push('circle')
    }

    var buttonColor = this.props.pressed ? Color.fromRgba(this.props.activeColor).toHex() : Color.fromRgba(this.props.inactiveColor).toHex()
    if (this.props.x === 8 && this.props.y === 1 && this.props.section === Section.Main) {
      // console.log(this.props.pressed)
      // console.log(this.props.inactiveColor)
      // console.log(this.props.activeColor)
      // console.log(buttonColor)
    }
    if (buttonColor === '#000000')
      buttonColor = '#7D8386';
    var styles = {
      "backgroundColor": buttonColor,
      "borderColor": this.props.pressed ? "#fff" : this.props.editing ? "#ff00ef" : buttonColor
    }

    return (
      <div className={classes.join(' ')} onClick={this.handleClick} style={styles}></div>
    )
  }
}