import * as React from 'react'
import {
  StateMapping,
  RowMapping
} from '../../../common/interfaces'
import { Section } from '../../Constants'
import BoardButton, { BoardButtonType } from './BoardButton'

interface TopRowProps extends React.ClassAttributes<TopRow> {
  topMapping: RowMapping
  topMappingStates: StateMapping[]
  selectButton: (section?: Section, x?: number, y?: number) => void
}

export default class TopRow extends React.Component<TopRowProps> {
  public constructor (props: TopRowProps) {
    super(props)
    this.selectButton = this.selectButton.bind(this);
  }

  selectButton(x?: number, y?: number) {
    if (x === undefined || y === undefined) {
      this.props.selectButton(undefined)
    } else {
      this.props.selectButton(Section.Top, x, y)
    }
  }

  getStateMapping(x: number, y: number): StateMapping {
    for (const item of this.props.topMappingStates) {
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
      pressed: false,
      name: ''
    }
  }

  public render (): JSX.Element {
    const buttons: JSX.Element[] = []
    let count = 1;
    for (const id of this.props.topMapping.two) {
      const stateMapping = this.getStateMapping(count, 1)
      buttons.push(
        <BoardButton
          selectButton={this.selectButton}
          section={Section.Top}
          x={count}
          y={1}
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
