import { hasKeyCombo } from '@common/StateUtil'
import * as React from 'react'
import {
  StateMapping,
  RowMapping
} from '@common/Interfaces'
import { Section } from '../../../common/Constants'
import BoardButton, { BoardButtonType } from './BoardButton'

interface MainBoardProps extends React.ClassAttributes<MainBoard> {
  mainMapping?: RowMapping[]
  mainMappingStates: StateMapping[]
  selectButton: (section?: Section, x?: number, y?: number) => void
}

export default class MainBoard extends React.Component<MainBoardProps> {
  public constructor (props: MainBoardProps) {
    super(props)
    this.selectButton = this.selectButton.bind(this);
  }

  selectButton(x?: number, y?: number) {
    if (x === undefined || y === undefined) {
      this.props.selectButton(undefined)
    } else {
      this.props.selectButton(Section.Main, x, y)
    }
  }

  getStateMapping(x: number, y: number): StateMapping {
    for (const item of this.props.mainMappingStates) {
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
    const rows: JSX.Element[] = []
    // console.log('mainMappingStates')
    // console.log(this.props.mainMappingStates)
    let yCount = 8;
    for (const rowMapping of this.props.mainMapping) {
      const buttons: JSX.Element[] = []
      let xCount = 1;
      for (const id of rowMapping.two) {
        const stateMapping = this.getStateMapping(xCount, yCount)
        // console.log('mainMappingStates stateMapping')
        // console.log(stateMapping)
        buttons.push(
          <BoardButton
            key={`${xCount},${yCount}`}
            selectButton={this.selectButton}
            section={Section.Main}
            x={xCount}
            y={yCount}
            type={BoardButtonType.Square}
            id={[rowMapping.one, id]}
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
        xCount++;
      }
      rows.push(
        <div key={yCount} className={"row"}>
          {buttons}
        </div>
      )
      yCount--;
    }
    return <div className={"main-board"}>{rows}</div>
  }
}
