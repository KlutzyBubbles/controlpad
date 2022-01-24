import * as React from 'react'
import { Color, RGB6 } from '../../Color';
import { Section } from '../../interfaces'
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
  activeColor: RGB6
  inactiveColor: RGB6
  flashing: boolean
  pulsing: boolean
}

interface BoardButtonState {
  pressed: boolean
  editing: boolean
  color: Color
  pressedColor: Color
}

export default class BoardButton extends React.Component<BoardButtonProps, BoardButtonState> {
  constructor (props: BoardButtonProps) {
    super(props)
    this.state = {
      pressed: false,
      editing: false,
      color: Color.fromRgb6(this.props.inactiveColor),
      pressedColor: Color.fromRgb6(this.props.activeColor)
    }
    if (padManagerInstance.online && padManagerInstance.selectedDevice !== undefined) {
      var launchpad = padManagerInstance.getLaunchpad(padManagerInstance.selectedDevice)
      launchpad?.setColor(this.props.section, this.props.x, this.props.y, this.state.color)
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.editing) {
      this.props.selectButton(undefined)
      this.setState({
        editing: false
      })
    } else {
      this.props.selectButton(this.props.x, this.props.y, () => this.setState({ editing: false }))
      this.setState({
        editing: true
      })
    }
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
    if (this.state.pressed) {
      classes.push('pressed')
    }
    if (this.props.type === BoardButtonType.Circle) {
      classes.push('circle')
    }

    var buttonColor = this.state.pressed ? this.state.pressedColor.toHex() : this.state.color.toHex()
    if (buttonColor === '#000000')
      buttonColor = '#7D8386';
    var styles = {
      "backgroundColor": buttonColor,
      "borderColor": this.state.editing ? "#ff00ef" : buttonColor
    }

    return (
      <div className={classes.join(' ')} onClick={this.handleClick} style={styles}></div>
    )
  }
}
