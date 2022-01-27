import * as React from 'react'
import { SketchPicker, ColorResult } from 'react-color';
import { Color, RGB } from '../../Color';
import { StateMappings } from '../../interfaces';
import { SelectedButton } from '../App';
import { Color as MUIColor, ColorPicker, createColor, ColorFormat } from "mui-color";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import ColorWrapper from './ColorWrapper';
import { create } from 'domain';

interface ColorEditorProps {
    selectedButton: SelectedButton
    stateMappings: StateMappings
    changeColor: Function
}

interface ColorEditorState {
    currentSelected: SelectedButton
    activeColor: MUIColor
    inactiveColor: MUIColor
    selectedInactiveColor: PresetColors
    selectedActiveColor: PresetColors
}

const enum PresetColors {
    None = 'none',
    Black = 'black',
    Red = 'red',
    Orange = 'orange',
    Yellow = 'yellow',
    Lime = 'lime',
    Blue = 'blue',
    Purple = 'purple',
    Pink = 'pink',
    LightBlue = 'lightblue'
}

export default class ColorEditor extends React.Component<ColorEditorProps, ColorEditorState> {

    constructor(props: ColorEditorProps) {
        super(props)
        this.state = {...{
            activeColor: createColor({
                r: 241,
                g: 112,
                b: 19,
            }, "rgb" as any as ColorFormat),
            inactiveColor: createColor({
                r: 241,
                g: 112,
                b: 19,
            }, "rgb" as any as ColorFormat),
            currentSelected: props.selectedButton,
            selectedInactiveColor: PresetColors.None,
            selectedActiveColor: PresetColors.None
        }, ...this.refreshColors(true)}
    }

    // handleActiveClose = () => {
    //     this.setState({ displayActivePicker: false })
    // };
// 
    // handleInactiveClose = () => {
    //     this.setState({ displayInactivePicker: false })
    // };

    handleActiveChange = (color: MUIColor, radio = false) => {
        this.setState({
            activeColor: color
        })
        if (!radio) {
            this.setState({
                selectedActiveColor: PresetColors.None
            })
        }
        // this.state.activeColor = color
        if (this.props.selectedButton !== undefined) {
            console.log("change", color, Color.fromRgbArray(color.rgb).toRgb6());
            this.props.changeColor(this.props.selectedButton.section, this.props.selectedButton.x, this.props.selectedButton.y, Color.fromRgbArray(color.rgb).toRgb8(), true)
        }
    };

    handleInactiveChange = (color: MUIColor, radio = false) => {
        this.setState({
            inactiveColor: color
        })
        if (!radio) {
            // console.log(radio)
            this.setState({
                selectedInactiveColor: PresetColors.None
            })
        }
        //this.state.inactiveColor = color
        if (this.props.selectedButton !== undefined) {
            console.log("change", color, Color.fromRgbArray(color.rgb).toRgb6());
            this.props.changeColor(this.props.selectedButton.section, this.props.selectedButton.x, this.props.selectedButton.y, Color.fromRgbArray(color.rgb).toRgb8(), false)
        }
    };

    /*
    handleActiveChange = (color: ColorResult) => {
        if (this.props.selectedButton !== undefined)
            this.props.changeColor(this.props.selectedButton.section, this.props.selectedButton.x, this.props.selectedButton.y, Color.toRgb6(color.rgb), true)
    };

    handleInactiveChange = (color: ColorResult) => {
        if (this.props.selectedButton !== undefined)
            this.props.changeColor(this.props.selectedButton.section, this.props.selectedButton.x, this.props.selectedButton.y, Color.toRgb6(color.rgb), false)
    };
*/
    handleChange = (newValue: MUIColor) => {
        // console.log("change", newValue);
        // setColor(`#${newValue.hex}`);
        // this.setState({
        //     color: newValue
        // });
        // action('changed')(newValue);
    };

    refreshColors(init = false) {
        if (!Object.prototype.hasOwnProperty.call(this.props.stateMappings, this.props.selectedButton.section))
            this.props.stateMappings[this.props.selectedButton.section] = []
        // console.log(this.props.stateMappings[this.props.selectedButton.section])
        if (init || this.state.currentSelected !== undefined && this.props.selectedButton != this.state.currentSelected) {
            console.log('refreshColors')
            for (var state of this.props.stateMappings[this.props.selectedButton.section]) {
                if (state.x === this.props.selectedButton.x && state.y === this.props.selectedButton.y) {
                    if (init) {
                        return {
                            currentSelected: this.props.selectedButton,
                            activeColor: createColor(state.activeColor, "rgb" as any as ColorFormat),
                            inactiveColor: createColor(state.inactiveColor, "rgb" as any as ColorFormat)
                        }
                    } else {
                        this.setState({
                            currentSelected: this.props.selectedButton,
                            activeColor: createColor(state.activeColor, "rgb" as any as ColorFormat),
                            inactiveColor: createColor(state.inactiveColor, "rgb" as any as ColorFormat)
                        })
                    }
                    // this.activeColor = createColor(Color.fromRgb6(state.activeColor).toRgb8(), "rgb" as any as ColorFormat)
                    // this.inactiveColor = createColor(Color.fromRgb6(state.inactiveColor).toRgb8(), "rgb" as any as ColorFormat)
                }
            }
        }
    }

    handleInactivePresetChange = (event: any) => {
        this.setState({
            selectedInactiveColor: event.target.value
        })
        this.handleInactiveChange(createColor(event.target.value), true)
    }

    inactiveItemProps = (item: PresetColors) => {
        var color = createColor(item).css.backgroundColor
        return {
            checked: this.state.selectedInactiveColor === item,
            onChange: this.handleInactivePresetChange,
            value: item,
            name: 'color-radio-button-demo',
            sx: {
                color: color,
                '&.Mui-checked': {
                    color: color,
                },
            },
            inputProps: { 'aria-label': item },
        }
    };

    handleActivePresetChange = (event: any) => {
        this.setState({
            selectedActiveColor: event.target.value
        })
        this.handleActiveChange(createColor(event.target.value), true)
    }

    activeItemProps = (item: PresetColors) => {
        var color = createColor(item).css.backgroundColor
        return {
            checked: this.state.selectedActiveColor === item,
            onChange: this.handleActivePresetChange,
            value: item,
            name: 'color-radio-button-demo',
            sx: {
                ml: 0,
                color: color,
                '&.Mui-checked': {
                    color: color,
                },
            },
            inputProps: { 'aria-label': item },
        }
    };

    public render(): JSX.Element {
        this.refreshColors()
        console.log(this.state.inactiveColor)
        return (
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={0}
                >
                    <Typography sx={{ mr: 2 }} variant="h6" gutterBottom component="div">
                        Inactive
                    </Typography>
                    <ColorPicker disableAlpha={true} hideTextfield={true} value={this.state.inactiveColor} onChange={this.handleInactiveChange} />
                    <Radio {...this.inactiveItemProps(PresetColors.Black)} />
                    <Radio {...this.inactiveItemProps(PresetColors.Red)} />
                    <Radio {...this.inactiveItemProps(PresetColors.Lime)} />
                    <Radio {...this.inactiveItemProps(PresetColors.Blue)} />
                    <Radio {...this.inactiveItemProps(PresetColors.Yellow)} />
                    <Radio {...this.inactiveItemProps(PresetColors.Orange)} />
                    <Radio {...this.inactiveItemProps(PresetColors.Pink)} />
                    <Radio {...this.inactiveItemProps(PresetColors.Purple)} />
                    <Radio {...this.inactiveItemProps(PresetColors.LightBlue)} />
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={0}
                >
                    <Typography sx={{ mr: 2 }}  variant="h6" gutterBottom component="div">
                        Active
                    </Typography>
                    <ColorPicker disableAlpha={true} hideTextfield={true} value={this.state.activeColor} onChange={this.handleActiveChange} />
                    <Radio {...this.activeItemProps(PresetColors.Black)} />
                    <Radio {...this.activeItemProps(PresetColors.Red)} />
                    <Radio {...this.activeItemProps(PresetColors.Lime)} />
                    <Radio {...this.activeItemProps(PresetColors.Blue)} />
                    <Radio {...this.activeItemProps(PresetColors.Yellow)} />
                    <Radio {...this.activeItemProps(PresetColors.Orange)} />
                    <Radio {...this.activeItemProps(PresetColors.Pink)} />
                    <Radio {...this.activeItemProps(PresetColors.Purple)} />
                    <Radio {...this.activeItemProps(PresetColors.LightBlue)} />
                </Stack>
            </Stack>)
        /*
        return (
            <React.Fragment>
                <span className="title">Inactive</span>
                <ColorPicker value={this.state.color} onChange={this.handleChange} />
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
        */
    }
}
