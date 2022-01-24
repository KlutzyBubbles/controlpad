import * as React from 'react'
import {
  StateMapping,
  RowMapping, Section
} from '../../interfaces'
import BoardButton, { BoardButtonType } from './BoardButton'

interface MainBoardProps extends React.ClassAttributes<MainBoard> {
  mainMapping: RowMapping[]
  mainMappingStates: StateMapping[]
  selectButton: Function
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
    for (var item of this.props.mainMappingStates) {
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
    var rows: JSX.Element[] = []
    // console.log('mainMappingStates')
    // console.log(this.props.mainMappingStates)
    var yCount = 8;
    for (var rowMapping of this.props.mainMapping) {
      var buttons: JSX.Element[] = []
      var xCount = 1;
      for (var id of rowMapping.two) {
        var stateMapping = this.getStateMapping(xCount, yCount)
        // console.log('mainMappingStates stateMapping')
        // console.log(stateMapping)
        buttons.push(
          <BoardButton
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
          />
        )
        xCount++;
      }
      rows.push(
        <div className={"row"}>
          {buttons}
        </div>
      )
      yCount--;
    }
    return <div className={"main-board"}>{rows}</div>
  }
}
