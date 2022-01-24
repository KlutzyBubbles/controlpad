import * as React from 'react'
import { Section } from '../../interfaces'
import { sectionToString } from '../../Utils'
import { SelectedButton } from '../App'
import CollapsableSection from './CollapsableSection'
import ColorEditor from './ColorEditor'

export const enum BoardButtonType {
    Circle = 0,
    Square = 1
}

interface BoardButtonProps extends React.ClassAttributes<BoardButton> {
    selectedButton: SelectedButton | undefined
    changeColor: Function
}

export default class BoardButton extends React.Component<BoardButtonProps, {}> {

    public render(): JSX.Element {
        var classes = ['options']
        if (this.props.selectedButton === undefined)
            classes.push('hidden')
        return (
            <div className={classes.join(' ')}>
                <div>
                    <div>
                        <span className="main header">
                            Edit Key
                            <span className="key_pos_label">{this.props.selectedButton !== undefined ? `${sectionToString(this.props.selectedButton.section)}, (${this.props.selectedButton.x}, ${this.props.selectedButton.y})` : 'No Button Selected'}</span>
                        </span>
                        <span className="abs-right"><button id="clear_all">CLEAR ALL</button></span>
                    </div>
                </div>
                <div>
                    <span className="title name">Name</span>
                    <input id="key_description" className="opt" data-config="description" type="text" />
                </div>
                <div>
                    <div className="save_buttons">
                        <span className="abs-right">
                            <button id="discard_settings">DISCARD</button>
                            <button id="save_settings">SAVE</button>
                        </span>
                    </div>
                </div>
                <CollapsableSection
                    title='Color'
                    className='color'>
                        <ColorEditor
                            changeColor={this.props.changeColor}
                            selectedButton={this.props.selectedButton}
                        />
                </CollapsableSection>
                <CollapsableSection
                    title='Hotkey'
                    className='hotkey'>
                        <span className="title">Keys</span>
                        <div>
                            <div>
                                <input id="hotkey_string" type="text" />
                            </div>

                        </div>
                        <span className="title">Type</span>
                        <div>
                            <div className="small">
                                <input id="radio1" className="opt wide" data-config="hotkey.type" type="radio"
                                    name="hotkey_type" value="send" checked /><label
                                        htmlFor="radio1" className="wide">SEND KEYS</label>
                                <input id="radio2" className="opt wide" data-config="hotkey.type" type="radio"
                                    name="hotkey_type" value="hold" /><label
                                        htmlFor="radio2" className="wide">HOLD KEYS</label>
                            </div>
                        </div>
                </CollapsableSection>
                <CollapsableSection
                    title='Audio'
                    className='audio'>
                        <span className="title">Path</span>
                        <div>
                            <div className="clear">
                                <div className="flex">
                                    <div>
                                        <input id="audio_path" className="opt" data-config="audio.path" type="text" />
                                        <span className="clear subtext">(URL, UNC, or local file path)</span>
                                    </div>
                                    <div>
                                        <button id="browse">BROWSE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className="title">Volume</span>
                        <div>
                            <div className="clear small">
                                <div className="inline-block">
                                    <div id="volume_slider_container">
                                        <div id="volume_slider"></div>
                                    </div>
                                </div>
                                <span id="vol_val">100%</span>
                            </div>
                        </div>
                        <span className="title">Type</span>
                        <div className="">
                            <div className="small">
                                <input id="radio3" className="opt" data-config="audio.type" type="radio" name="audio_type"
                                    value="normal"
                                    checked /><label htmlFor="radio3">NORMAL</label>
                                <input id="radio4" className="opt" data-config="audio.type" type="radio" name="audio_type"
                                    value="toggle" />
                                <label htmlFor="radio4">TOGGLE</label>
                                <input id="radio5" className="opt" data-config="audio.type" type="radio" name="audio_type"
                                    value="restart" />
                                <label htmlFor="radio5">RESTART</label>
                                <input id="radio6" className="opt" data-config="audio.type" type="radio" name="audio_type"
                                    value="hold" />
                                <label htmlFor="radio6">HOLD</label>
                            </div>
                        </div>
                </CollapsableSection>
                <CollapsableSection
                    title='GET Request'
                    className='api_request'>
                        <span className="title">Address</span>
                        <div>
                            <div>
                                <input id="api_path" className="opt" data-config="api.path" type="text" />
                                <span className="clear subtext">(HTTP / HTTPS to local or remote resource)</span>
                            </div>
                        </div>
                </CollapsableSection>
            </div>
        )
    }
}
