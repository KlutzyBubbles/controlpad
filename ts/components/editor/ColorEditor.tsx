import * as React from 'react'
import { SketchPicker } from 'react-color';
import { Color, RGB } from '../../Color';
import { StateMappings } from '../../interfaces';
import { padManagerInstance } from '../../utils/PadManager';
import { SelectedButton } from '../App';

interface ColorEditorProps {
    selectedButton: SelectedButton
    stateMappings: StateMappings
    changeColor: Function
}

interface ColorEditorState {
    displayActivePicker: boolean
    displayInactivePicker: boolean
}

export default class ColorEditor extends React.Component<ColorEditorProps, ColorEditorState> {

    activeColor: RGB
    inactiveColor: RGB

    constructor(props) {
        super(props)
        this.activeColor = {
            r: 241,
            g: 112,
            b: 19,
        }
        this.inactiveColor = this.activeColor
        this.refreshColors()
        this.state = {
            displayActivePicker: false,
            displayInactivePicker: false
        }
    }

    handleActiveClick = () => {
        this.setState({ displayActivePicker: !this.state.displayActivePicker })
    };

    handleInactiveClick = () => {
        this.setState({ displayInactivePicker: !this.state.displayInactivePicker })
    };

    handleActiveClose = () => {
        this.setState({ displayActivePicker: false })
    };

    handleInactiveClose = () => {
        this.setState({ displayInactivePicker: false })
    };

    handleActiveChange = (color) => {
        if (this.props.selectedButton !== undefined)
            this.props.changeColor(this.props.selectedButton.section, this.props.selectedButton.x, this.props.selectedButton.y, Color.toRgb6(color.rgb), true)
    };

    handleInactiveChange = (color) => {
        if (this.props.selectedButton !== undefined)
            this.props.changeColor(this.props.selectedButton.section, this.props.selectedButton.x, this.props.selectedButton.y, Color.toRgb6(color.rgb), false)
    };

    refreshColors() {
        if (!Object.prototype.hasOwnProperty.call(this.props.stateMappings, this.props.selectedButton.section))
            this.props.stateMappings[this.props.selectedButton.section] = []
        // console.log(this.props.stateMappings[this.props.selectedButton.section])
        for (var state of this.props.stateMappings[this.props.selectedButton.section]) {
            if (state.x === this.props.selectedButton.x && state.y === this.props.selectedButton.y) {
                this.activeColor = Color.fromRgb6(state.activeColor).toRgb8()
                this.inactiveColor = Color.fromRgb6(state.inactiveColor).toRgb8()
            }
        }
    }

    public render(): JSX.Element {
        this.refreshColors()
        var activeColorStyle = {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: `rgb(${ this.activeColor.r }, ${ this.activeColor.g }, ${ this.activeColor.b })`,
        }
        var inactiveColorStyle = {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: `rgb(${ this.inactiveColor.r }, ${ this.inactiveColor.g }, ${ this.inactiveColor.b })`,
        }
        return (
            <React.Fragment>
                <span className="title">Inactive</span>
                <div className='color'>
                    <div className='swatch' onClick={ this.handleInactiveClick }>
                    <div style={ inactiveColorStyle } />
                    </div>
                    { this.state.displayInactivePicker ? <div className='popover'>
                        <div className='cover' onClick={ this.handleInactiveClose }/>
                        <SketchPicker color={ this.inactiveColor } onChange={ this.handleInactiveChange } />
                    </div> : null }
                </div>
                <span className="title">Active</span>
                <div className='color'>
                    <div className='swatch' onClick={ this.handleActiveClick }>
                    <div style={ activeColorStyle } />
                    </div>
                    { this.state.displayActivePicker ? <div className='popover'>
                        <div className='cover' onClick={ this.handleActiveClose }/>
                        <SketchPicker color={ this.activeColor } onChange={ this.handleActiveChange } />
                    </div> : null }
                </div>
            </React.Fragment>
        )
    }
}
