import * as React from 'react'
import {
  ColorMappings,
  Mapping,
  Section
} from '../../interfaces'
import TowRow from './TopRow'
import MainBoard from './MainBoard'
import SideRow from './SideRow'

export interface LaunchPadProps extends React.ClassAttributes<LaunchPad> {
  mapping: Mapping
  selectButton: Function
  colorMappings: ColorMappings
}

interface State {
  isOnline: boolean
}

export default class LaunchPad extends React.Component< LaunchPadProps, State > {

  constructor (props: LaunchPadProps) {
    super(props)
    console.log('colorMapping')
    console.log(props.colorMappings)
    this.state = {
      isOnline: false
    }
  }

  public render (): React.ReactNode {
    console.log('%%% LaunchPad %%%')

    const classes = ['launchpad']
    if (!this.state.isOnline) {
      classes.push('offline')
    }

    return (
      <div
        className={classes.join(' ')}
      >
        <TowRow
          selectButton={this.props.selectButton}
          key='top'
          topMapping={this.props.mapping.topRow}
          topMappingColors={Object.prototype.hasOwnProperty.call(this.props.colorMappings, Section.Top) ? this.props.colorMappings[Section.Top] : []}
        />
        <MainBoard
          selectButton={this.props.selectButton}
          key='main'
          mainMapping={this.props.mapping.centerRows}
          mainMappingColors={Object.prototype.hasOwnProperty.call(this.props.colorMappings, Section.Main) ? this.props.colorMappings[Section.Main] : []}
        />
        <SideRow
          selectButton={this.props.selectButton}
          key='side'
          sideMapping={this.props.mapping.sideColumn}
          sideMappingColors={Object.prototype.hasOwnProperty.call(this.props.colorMappings, Section.Side) ? this.props.colorMappings[Section.Side] : []}
        />
      </div>
    )
  }
}
