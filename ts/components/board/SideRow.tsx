import * as React from 'react'
import {
  StateMapping,
  RowMapping, Section
} from '../../interfaces'
import BoardButton, { BoardButtonType } from './BoardButton'

interface SideRowProps extends React.ClassAttributes<SideRow> {
  sideMapping: RowMapping
  sideMappingStates: StateMapping[]
  selectButton: Function
}

export default class SideRow extends React.Component<SideRowProps> {
  public constructor (props: SideRowProps) {
    super(props)
    this.selectButton = this.selectButton.bind(this);
  }

  selectButton(x?: number, y?: number) {
    if (x === undefined || y === undefined) {
      this.props.selectButton(undefined)
    } else {
      this.props.selectButton(Section.Side, x, y)
    }
  }

  getStateMapping(x: number, y: number): StateMapping {
    for (var item of this.props.sideMappingStates) {
      if (item.x === x && item.y === y)
        return item
    }
    return {
      x: x,
      y: y,
      activeColor: { r: 0, g: 0, b: 0 },
      inactiveColor: { r: 0, g: 0, b: 0 },
      pulsing: false,
      flashing: false,
      editing: false,
      pressed: false
    }
  }

  public render (): JSX.Element {
    var buttons: JSX.Element[] = []
    var count = 8;
    for (var id of this.props.sideMapping.two) {
      var stateMapping = this.getStateMapping(1, count)
      buttons.push(
        <BoardButton
          selectButton={this.selectButton}
          section={Section.Side}
          x={1}
          y={count}
          type={BoardButtonType.Circle}
          id={[this.props.sideMapping.one, id]}
          activeColor={stateMapping.activeColor}
          inactiveColor={stateMapping.inactiveColor}
          flashing={stateMapping.flashing}
          pulsing={stateMapping.pulsing}
          editing={stateMapping.editing}
          pressed={stateMapping.pressed}
        />
      )
      count--;
    }
    return <div className={"side-row"}>{buttons}</div>
  }
}
