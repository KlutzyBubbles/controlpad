import * as React from 'react'
import {
  StateMappings,
  Mapping
} from '@common/Interfaces'
import {
  Section
} from '@common/Constants'
import TowRow from './TopRow'
import MainBoard from './MainBoard'
import SideRow from './SideRow'

export interface LaunchPadProps extends React.ClassAttributes<LaunchPad> {
  mapping?: Mapping
  selectButton: (section?: Section, x?: number, y?: number) => void
  stateMappings: StateMappings
}

interface State {
  isOnline: boolean
}

export default class LaunchPad extends React.Component< LaunchPadProps, State > {

  constructor (props: LaunchPadProps) {
    super(props)
    this.state = {
      isOnline: false
    }
  }

  public render (): React.ReactNode {

    const classes = ['launchpad']
    if (!this.state.isOnline) {
      classes.push('offline')
    }

    if (this.props.mapping === undefined)
      return (<React.Fragment></React.Fragment>)
    return (
      <div
        className={classes.join(' ')}
      >
        <TowRow
          selectButton={this.props.selectButton}
          key='top'
          topMapping={this.props.mapping.topRow}
          topMappingStates={this.props.stateMappings !== undefined ? Object.prototype.hasOwnProperty.call(this.props.stateMappings, Section.Top) ? this.props.stateMappings[Section.Top] : [] : []}
        />
        <MainBoard
          selectButton={this.props.selectButton}
          key='main'
          mainMapping={this.props.mapping.centerRows}
          mainMappingStates={this.props.stateMappings !== undefined ? Object.prototype.hasOwnProperty.call(this.props.stateMappings, Section.Main) ? this.props.stateMappings[Section.Main] : [] : []}
        />
        <SideRow
          selectButton={this.props.selectButton}
          key='side'
          sideMapping={this.props.mapping.sideColumn}
          sideMappingStates={this.props.stateMappings !== undefined ? Object.prototype.hasOwnProperty.call(this.props.stateMappings, Section.Side) ? this.props.stateMappings[Section.Side] : [] : []}
        />
      </div>
    )
  }
}
