import * as React from 'react'
import {
  ColorMapping,
  RowMapping, Section
} from '../../interfaces'
import BoardButton, { BoardButtonType } from './BoardButton'

interface SideRowProps extends React.ClassAttributes<SideRow> {
  sideMapping: RowMapping
  sideMappingColors: ColorMapping[]
  selectButton: Function
}

export default class SideRow extends React.Component<SideRowProps> {
  public constructor (props: SideRowProps) {
    super(props)
  }

  selectButton(x?: number, y?: number, deselectNotify?: Function) {
    if (x === undefined || y === undefined) {
      this.props.selectButton(undefined)
    } else {
      this.props.selectButton(Section.Side, x, y, deselectNotify)
    }
  }

  getColorMapping(x: number, y: number) {
    for (var item of this.props.sideMappingColors) {
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
    var buttons: JSX.Element[] = []
    var count = 1;
    for (var id of this.props.sideMapping.two) {
      var colorMapping = this.getColorMapping(1, count)
      buttons.push(
        <BoardButton
          selectButton={this.selectButton}
          section={Section.Side}
          x={count}
          y={1}
          type={BoardButtonType.Circle}
          id={[this.props.sideMapping.one, id]}
          activeColor={colorMapping.activeColor}
          inactiveColor={colorMapping.inactiveColor}
          flashing={colorMapping.flashing}
          pulsing={colorMapping.pulsing}
        />
      )
      count++;
    }
    return <div className={"side-row"}>{buttons}</div>
  }
}
