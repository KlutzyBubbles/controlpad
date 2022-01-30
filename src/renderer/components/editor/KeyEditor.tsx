import * as React from 'react'
import { KeyCombo, StateMappings } from '../../../common/Interfaces';
import { SelectedButton } from '../App';
import Stack from '@mui/material/Stack';
import { Section } from '@renderer/Constants';
import keycode from 'keycode';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface KeyEditorProps {
    selectedButton: SelectedButton
    stateMappings: StateMappings
    changeKeyCombo: (section: Section, x: number, y: number, combo: KeyCombo) => void
}

interface KeyEditorState {
    currentSelected: SelectedButton
    keyCombo: KeyCombo
}

export default class KeyEditor extends React.Component<KeyEditorProps, KeyEditorState> {

    constructor(props: KeyEditorProps) {
        super(props)
        this.state = {...{
            keyCombo: {},
            currentSelected: props.selectedButton
        }, ...this.refreshKeys(true)}
    }
/*
    handleKeyTextFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        this.setState({
            keyCombo: {}
        })
        const combo: KeyCombo = {}
        event.currentTarget.addEventListener('keydown', (keydownEvent: KeyboardEvent) => {
            keydownEvent.preventDefault();
            console.log(keydownEvent)
            //const keyName = keycode(keydownEvent).toUpperCase();
            const keyName = keydownEvent.key
            const ignoredKeys = [
                'CAPS LOCK',
                'NUM LOCK',
                'SCROLL LOCK',
                'PAUSE/BREAK',
                'MY CALCULATOR',
            ];
            var changed = true
            if (ignoredKeys.indexOf(keyName) !== -1) return;
            if (keyName.includes('CTRL')) {
                combo.ctrl = 'CTRL';
            } else if (keyName.includes('SHIFT')) {
                combo.shift = 'SHIFT';
            } else if (keyName.includes('ALT')) {
                combo.alt = 'ALT';
            } else {
                if (combo.keys === undefined)
                    combo.keys = []
                if (!combo.keys.includes(keyName)) {
                    combo.keys.push(keyName.length > 1 ? `${keyName.charAt(0).toUpperCase()}${keyName.slice(1)}` : keyName.toUpperCase());
                } else {
                    changed = false
                }
            }
            if (changed) {
                this.props.changeKeyCombo(this.props.selectedButton.section, this.props.selectedButton.x, this.props.selectedButton.y, combo)
                this.setState({
                    keyCombo: combo
                })
            }
        })
        /*
        event.currentTarget.addEventListener('keyup', (keyupEvent) => {
            keyupEvent.preventDefault();
            var changed = true
            const keyName = keycode(keyupEvent).toUpperCase();
            if (keyName.includes('CTRL')) {
                combo.ctrl = undefined;
            } else if (keyName.includes('SHIFT')) {
                combo.shift = undefined;
            } else if (keyName.includes('ALT')) {
                combo.alt = undefined;
            } else {
                if (combo.keys.includes(keyName)) {
                    combo.keys.splice(combo.keys.indexOf(keyName), 1)
                } else {
                    changed = false
                }
            }
            if (changed) {
                this.props.changeKeyCombo(this.props.selectedButton.section, this.props.selectedButton.x, this.props.selectedButton.y, combo)
                this.setState({
                    keyCombo: combo
                })
            }
        });
        *
    }/*/
    handleKeyTextFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        this.setState({
            keyCombo: {}
        })
    }

    handleKeyDown = (keydownEvent: React.KeyboardEvent) => {
        const combo: KeyCombo = this.state.keyCombo || {}
        
        keydownEvent.preventDefault();
        console.log(keydownEvent)
        //const keyName = keycode(keydownEvent).toUpperCase();
        const keyName = keydownEvent.key
        const ignoredKeys = [
            'CAPS LOCK',
            'NUM LOCK',
            'SCROLL LOCK',
            'PAUSE/BREAK',
            'MY CALCULATOR',
        ];
        var changed = true
        if (ignoredKeys.indexOf(keyName) !== -1) return;
        if (keyName.includes('Control')) {
            combo.ctrl = keydownEvent.code.includes('Left') ? 'LeftControl' : 'RightControl';
        } else if (keyName.includes('Shift')) {
            combo.shift = keydownEvent.code.includes('Left') ? 'LeftShift' : 'RightShift';
        } else if (keyName.includes('Alt')) {
            combo.alt = keydownEvent.code.includes('Left') ? 'LeftAlt' : 'RightAlt';
        } else {
            if (combo.keys === undefined)
                combo.keys = []
            if (!combo.keys.includes(keyName)) {
                combo.keys.push(keyName.length > 1 ? `${keyName.charAt(0).toUpperCase()}${keyName.slice(1)}` : keyName.toUpperCase());
            } else {
                changed = false
            }
        }
        if (changed) {
            this.props.changeKeyCombo(this.props.selectedButton.section, this.props.selectedButton.x, this.props.selectedButton.y, combo)
            this.setState({
                keyCombo: combo
            })
        }
        /*
        event.currentTarget.addEventListener('keyup', (keyupEvent) => {
            keyupEvent.preventDefault();
            var changed = true
            const keyName = keycode(keyupEvent).toUpperCase();
            if (keyName.includes('CTRL')) {
                combo.ctrl = undefined;
            } else if (keyName.includes('SHIFT')) {
                combo.shift = undefined;
            } else if (keyName.includes('ALT')) {
                combo.alt = undefined;
            } else {
                if (combo.keys.includes(keyName)) {
                    combo.keys.splice(combo.keys.indexOf(keyName), 1)
                } else {
                    changed = false
                }
            }
            if (changed) {
                this.props.changeKeyCombo(this.props.selectedButton.section, this.props.selectedButton.x, this.props.selectedButton.y, combo)
                this.setState({
                    keyCombo: combo
                })
            }
        });
        */
    }

    getKeyDisplay = () => {
        const combo = this.state.keyCombo
        const display = []; // Create an empty array to be filled with combo keys
        // Only add the keys to the display array if they exist
        if (combo.ctrl) display.push(combo.ctrl);
        if (combo.shift) display.push(combo.shift);
        if (combo.alt) display.push(combo.alt);
        if (combo.keys !== undefined) {
            for (const key of combo.keys) {
                display.push(key);
            }
        }
        // Stringify the combo key options array and display it in the text field
        return display.join(' + ');
    }

    refreshKeys(init = false) {
        if (!Object.prototype.hasOwnProperty.call(this.props.stateMappings, this.props.selectedButton.section))
            this.props.stateMappings[this.props.selectedButton.section] = []
        // console.log(this.props.stateMappings[this.props.selectedButton.section])
        if (init || this.state.currentSelected !== undefined && this.props.selectedButton != this.state.currentSelected) {
            console.log('refreshKeys')
            for (const state of this.props.stateMappings[this.props.selectedButton.section]) {
                if (state.x === this.props.selectedButton.x && state.y === this.props.selectedButton.y) {
                    console.log('combo')
                    console.log(state.keyCombo)
                    if (init) {
                        return {
                            keyCombo: state.keyCombo || {},
                            currentSelected: this.props.selectedButton
                        }
                    } else {
                        this.setState({
                            keyCombo: state.keyCombo || {},
                            currentSelected: this.props.selectedButton
                        })
                    }
                    // this.activeColor = createColor(Color.fromRgb6(state.activeColor).toRgb8(), "rgb" as any as ColorFormat)
                    // this.inactiveColor = createColor(Color.fromRgb6(state.inactiveColor).toRgb8(), "rgb" as any as ColorFormat)
                }
            }
        }
    }

    handleTapToggleClick = (toggle: boolean) => {
        if (this.state.keyCombo.toggle === undefined)
            this.setState({
                keyCombo: {
                    toggle: false
                }
            })
        if (this.state.keyCombo.toggle === toggle)
            return
        const combo = this.state.keyCombo;
        combo.toggle = toggle;
        this.props.changeKeyCombo(this.props.selectedButton.section, this.props.selectedButton.x, this.props.selectedButton.y, combo)
        this.setState({
            keyCombo: combo
        })
    }
//<TextField id="key-name" label="Name" variant="standard" onFocus={this.handleKeyTextFocus} value={this.getKeyDisplay()} onKeyDown={}/>
    public render(): JSX.Element {
        this.refreshKeys()
        return (
            <React.Fragment>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={2}
                    sx={{ mb: 2 }}
                >
                    <TextField id="key-name" label="Name" variant="standard" onFocus={this.handleKeyTextFocus} value={this.getKeyDisplay()} onKeyDown={this.handleKeyDown}/>
                </Stack>
                <Button variant={this.state.keyCombo.toggle ? 'outlined' : 'contained'} onClick={this.handleTapToggleClick.bind(this, false)}>Tap</Button>
                <Button variant={this.state.keyCombo.toggle ? 'contained' : 'outlined'} onClick={this.handleTapToggleClick.bind(this, true)}>Toggle</Button>
            </React.Fragment>
        )
    }
}
