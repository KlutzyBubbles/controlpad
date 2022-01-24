import * as React from 'react'
import {
  ColorMapping,
  RowMapping, Section
} from '../../interfaces'
import BoardButton, { BoardButtonType } from './BoardButton'

interface MainBoardProps extends React.ClassAttributes<MainBoard> {
  mainMapping: RowMapping[]
  mainMappingColors: ColorMapping[]
  selectButton: Function
}

export default class MainBoard extends React.Component<MainBoardProps> {
  public constructor (props: MainBoardProps) {
    super(props)
    this.selectButton = this.selectButton.bind(this);
  }

  selectButton(x?: number, y?: number, deselectNotify?: Function) {
    if (x === undefined || y === undefined) {
      this.props.selectButton(undefined)
    } else {
      this.props.selectButton(Section.Main, x, y, deselectNotify)
    }
  }

  getColorMapping(x: number, y: number) {
    for (var item of this.props.mainMappingColors) {
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
    }
  }

  public render (): JSX.Element {
    var rows: JSX.Element[] = []
    var yCount = 8;
    for (var rowMapping of this.props.mainMapping) {
      var buttons: JSX.Element[] = []
      var xCount = 1;
      for (var id of rowMapping.two) {
        var colorMapping = this.getColorMapping(xCount, yCount)
        buttons.push(
          <BoardButton
            selectButton={this.selectButton}
            section={Section.Main}
            x={xCount}
            y={yCount}
            type={BoardButtonType.Square}
            id={[rowMapping.one, id]}
            activeColor={colorMapping.activeColor}
            inactiveColor={colorMapping.inactiveColor}
            flashing={colorMapping.flashing}
            pulsing={colorMapping.pulsing}
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
