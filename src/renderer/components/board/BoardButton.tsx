import * as React from 'react'
import { Color, RGB } from '@common/Color';
import { Section } from '@common/Constants'

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
  selectButton: (x?: number, y?: number) => void
  activeColor: RGB
  inactiveColor: RGB
  flashing: boolean
  pulsing: boolean
  editing: boolean
  pressed: boolean
  hasKeyCombo: boolean
  name: string
}

export default class BoardButton extends React.Component<BoardButtonProps, Record<string, never>> {
  constructor (props: BoardButtonProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.editing) {
      this.props.selectButton(undefined)
    } else {
      this.props.selectButton(this.props.x, this.props.y)
    }
  }

  public render (): JSX.Element {
    const classes = ['board-button']
    if (this.props.pressed) {
      classes.push('pressed')
    }
    if (this.props.type === BoardButtonType.Circle) {
      classes.push('circle')
    }

    let buttonColor = this.props.pressed ? Color.fromRgba(this.props.activeColor).toHex() : Color.fromRgba(this.props.inactiveColor).toHex()

    if (buttonColor === '#000000')
      buttonColor = '#7D8386';
    const styles = {
      "backgroundColor": buttonColor,
      "borderColor": this.props.pressed ? "#fff" : this.props.editing ? "#ff00ef" : buttonColor
    }

    return (
      <div className={classes.join(' ')} onClick={this.handleClick} style={styles}>{this.props.name}</div>
    )
  }
}
