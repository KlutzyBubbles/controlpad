import { hasKeyCombo } from '@common/StateUtil'
import * as React from 'react'
import {
  StateMapping,
  RowMapping
} from '@common/Interfaces'
import { Section } from '../../Constants'
import BoardButton, { BoardButtonType } from './BoardButton'

interface SideRowProps extends React.ClassAttributes<SideRow> {
  sideMapping: RowMapping
  sideMappingStates: StateMapping[]
  selectButton: (section?: Section, x?: number, y?: number) => void
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
    for (const item of this.props.sideMappingStates) {
      if (item.x === x && item.y === y)
        return item
    }
    return {
      x: x,
      y: y,
      activeColor: { r: 0, g: 0, b: 0 },
      inactiveColor: { r: 0, g: 0, b: 0 },
      keyCombo: {},
      pulsing: false,
      flashing: false,
      editing: false,
      pressed: false,
      name: ''
    }
  }

  public render (): JSX.Element {
    const buttons: JSX.Element[] = []
    let count = 8;
    for (const id of this.props.sideMapping.two) {
      const stateMapping = this.getStateMapping(1, count)
      buttons.push(
        <BoardButton
          key={`${1},${count}`}
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
          hasKeyCombo={hasKeyCombo(stateMapping.keyCombo)}
          name={stateMapping.name}
        />
      )
      count--;
    }
    return <div className={"side-row"}>{buttons}</div>
  }
}
