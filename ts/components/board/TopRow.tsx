import * as React from 'react'
import {
  ColorMapping,
  RowMapping, Section
} from '../../interfaces'
import BoardButton, { BoardButtonType } from './BoardButton'

interface TopRowProps extends React.ClassAttributes<TopRow> {
  topMapping: RowMapping
  topMappingColors: ColorMapping[]
  selectButton: Function
}

export default class TopRow extends React.Component<TopRowProps> {
  public constructor (props: TopRowProps) {
    super(props)
  }

  selectButton(x?: number, y?: number, deselectNotify?: Function) {
    if (x === undefined || y === undefined) {
      this.props.selectButton(undefined)
    } else {
      this.props.selectButton(Section.Top, x, y, deselectNotify)
    }
  }

  getColorMapping(x: number, y: number) {
    for (var item of this.props.topMappingColors) {
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
    for (var id of this.props.topMapping.two) {
      var colorMapping = this.getColorMapping(count, 1)
      buttons.push(
        <BoardButton
          selectButton={this.selectButton}
          section={Section.Top}
          x={1}
          y={count}
          type={BoardButtonType.Circle}
          id={[this.props.topMapping.one, id]}
          activeColor={colorMapping.activeColor}
          inactiveColor={colorMapping.inactiveColor}
          flashing={colorMapping.flashing}
          pulsing={colorMapping.pulsing}
        />
      )
      count++;
    }
    return <div className={"top-row"}>{buttons}</div>
  }
}
