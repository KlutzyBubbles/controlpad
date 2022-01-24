import * as React from 'react'
import {
  StateMapping,
  RowMapping, Section
} from '../../interfaces'
import BoardButton, { BoardButtonType } from './BoardButton'

interface TopRowProps extends React.ClassAttributes<TopRow> {
  topMapping: RowMapping
  topMappingStates: StateMapping[]
  selectButton: Function
}

export default class TopRow extends React.Component<TopRowProps> {
  public constructor (props: TopRowProps) {
    super(props)
  }

  selectButton(x?: number, y?: number) {
    if (x === undefined || y === undefined) {
      this.props.selectButton(undefined)
    } else {
      this.props.selectButton(Section.Top, x, y)
    }
  }

  getStateMapping(x: number, y: number): StateMapping {
    for (var item of this.props.topMappingStates) {
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
    var count = 1;
    for (var id of this.props.topMapping.two) {
      var stateMapping = this.getStateMapping(count, 1)
      buttons.push(
        <BoardButton
          selectButton={this.selectButton}
          section={Section.Top}
          x={1}
          y={count}
          type={BoardButtonType.Circle}
          id={[this.props.topMapping.one, id]}
          activeColor={stateMapping.activeColor}
          inactiveColor={stateMapping.inactiveColor}
          flashing={stateMapping.flashing}
          pulsing={stateMapping.pulsing}
          editing={stateMapping.editing}
          pressed={stateMapping.pressed}
        />
      )
      count++;
    }
    return <div className={"top-row"}>{buttons}</div>
  }
}
