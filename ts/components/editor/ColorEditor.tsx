import * as React from 'react'
import { SketchPicker } from 'react-color';
import { Color, RGB } from '../../Color';
import { padManagerInstance } from '../../utils/PadManager';
import { SelectedButton } from '../App';

interface ColorEditorProps {
    selectedButton: SelectedButton | undefined
    changeColor: Function
}

interface ColorEditorState {
    activeColor: RGB
    inactiveColor: RGB
    displayActivePicker: boolean
    displayInactivePicker: boolean
}

export default class ColorEditor extends React.Component<ColorEditorProps, ColorEditorState> {

    constructor(props) {
        super(props)
        this.state = {
            displayActivePicker: false,
            displayInactivePicker: false,
            activeColor: {
                r: 241,
                g: 112,
                b: 19,
            },
            inactiveColor: {
                r: 241,
                g: 112,
                b: 19,
            },
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
        this.setState({ activeColor: color.rgb })
        if (this.props.selectedButton !== undefined)
            this.props.changeColor(this.props.selectedButton.section, this.props.selectedButton.x, this.props.selectedButton.y, Color.toRgb6(color.rgb), true)
    };

    handleInactiveChange = (color) => {
        console.log(color)
        if (this.props.selectedButton !== undefined)
            this.props.changeColor(this.props.selectedButton.section, this.props.selectedButton.x, this.props.selectedButton.y, Color.toRgb6(color.rgb), false)
        this.setState({ inactiveColor: color.rgb })
    };

    public render(): JSX.Element {
        var activeColorStyle = {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: `rgb(${ this.state.activeColor.r }, ${ this.state.activeColor.g }, ${ this.state.activeColor.b })`,
        }
        var inactiveColorStyle = {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: `rgb(${ this.state.inactiveColor.r }, ${ this.state.inactiveColor.g }, ${ this.state.inactiveColor.b })`,
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
                        <SketchPicker color={ this.state.inactiveColor } onChange={ this.handleInactiveChange } />
                    </div> : null }
                </div>
                <span className="title">Active</span>
                <div className='color'>
                    <div className='swatch' onClick={ this.handleActiveClick }>
                    <div style={ activeColorStyle } />
                    </div>
                    { this.state.displayActivePicker ? <div className='popover'>
                        <div className='cover' onClick={ this.handleActiveClose }/>
                        <SketchPicker color={ this.state.activeColor } onChange={ this.handleActiveChange } />
                    </div> : null }
                </div>
            </React.Fragment>
        )
    }
}
