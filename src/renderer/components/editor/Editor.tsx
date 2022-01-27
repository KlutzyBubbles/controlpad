import * as React from 'react'
import { StateMappings } from '../../../common/interfaces'
import { sectionToString } from '../../Utils'
import { SelectedButton } from '../App'
import CollapsableSection from './CollapsableSection'
import ColorEditor from './ColorEditor'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

export const enum BoardButtonType {
    Circle = 0,
    Square = 1
}

interface BoardButtonProps extends React.ClassAttributes<BoardButton> {
    selectedButton: SelectedButton | undefined
    changeColor: Function
    changeName: Function
    stateMappings: StateMappings
}

const enum Section {
    None = -1,
    Color = 0,
    Hotkey = 1,
    Audio = 2,
    Request = 3,
    CLR = 4
}

interface EditorState {
    expandedSection: Section
}

export default class BoardButton extends React.Component<BoardButtonProps, EditorState> {

    constructor(props: BoardButtonProps) {
        super(props)
        this.state = {
            expandedSection: Section.Color
        }
        this.handleSectionChange = this.handleSectionChange.bind(this);
    }

    handleSectionChange = (section: Section) => (event: any, isExpanded: boolean) => {
        // console.log('handleSectionChange');
        // console.log(isExpanded);
        // if (this.state.expandedSection === section || !isExpanded)
        //     return
        if (isExpanded)
            this.setState({
                expandedSection: isExpanded ? section : Section.None
            })
    }

    handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        console.log(event.target.value)
        // this.setState({
        //     name: event.target.value
        // })
        this.props.changeName(this.props.selectedButton.section, this.props.selectedButton.x, this.props.selectedButton.y, event.target.value)
    }

    getName = () => {
        if (this.props.selectedButton === undefined)
            return;
        if (!Object.prototype.hasOwnProperty.call(this.props.stateMappings, this.props.selectedButton.section))
            this.props.stateMappings[this.props.selectedButton.section] = []
        for (var state of this.props.stateMappings[this.props.selectedButton.section]) {
            if (state.x === this.props.selectedButton.x && state.y === this.props.selectedButton.y) {
                return state.name
            }
        }
    }

    public render(): JSX.Element {
        var classes = ['options']
        if (this.props.selectedButton === undefined)
            return (<React.Fragment></React.Fragment>)
        return (
            <Paper elevation={0} sx={{ height: "100%", pt: 2 }}>
                <Container>
                    {/*
                    <Typography variant="h6" gutterBottom component="div">
                        {this.props.selectedButton !== undefined ? `Edit Key in ${sectionToString(this.props.selectedButton.section)}, (${this.props.selectedButton.x}, ${this.props.selectedButton.y})` : 'No Button Selected'}
                    </Typography>
                    <Button variant="outlined">Clear All</Button>
                    */}
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={3}
                        alignItems="baseline"
                    >
                            <Typography variant="h6" gutterBottom component="div">
                                {this.props.selectedButton !== undefined ? `Edit Key in ${sectionToString(this.props.selectedButton.section)}, (${this.props.selectedButton.x}, ${this.props.selectedButton.y})` : 'No Button Selected'}
                            </Typography>
                            <Button variant="outlined">Clear All</Button>
                    </Stack>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={2}
                        sx={{ mb: 2 }}
                    >
                            <TextField id="key-name" label="Name" variant="standard" onChange={this.handleTitleChange} value={this.getName()}/>
                    </Stack>
                    <Accordion defaultExpanded={true} disableGutters={true}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography>Color</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ColorEditor
                                changeColor={this.props.changeColor}
                                selectedButton={this.props.selectedButton}
                                stateMappings={this.props.stateMappings}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters={true}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography>Hotkey</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                Aliquam eget maximus est, id dignissim quam.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Container>
            </Paper>
        )
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
                <Accordion expanded={this.state.expandedSection === Section.Color} onChange={this.handleSectionChange(Section.Color)}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Color</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                        Aliquam eget maximus est, id dignissim quam.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={this.state.expandedSection === Section.Hotkey} onChange={this.handleSectionChange(Section.Hotkey)}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                    >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Hotkey</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        You are currently not an owner
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                        varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                        laoreet.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={this.state.expandedSection === Section.Audio} onChange={this.handleSectionChange(Section.Audio)}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                    >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Audio</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Filtering has been entirely disabled for whole web server
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                        amet egestas eros, vitae egestas augue. Duis vel est augue.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={this.state.expandedSection === Section.Request} onChange={this.handleSectionChange(Section.Request)}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                    >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Request</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                        amet egestas eros, vitae egestas augue. Duis vel est augue.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={this.state.expandedSection === Section.CLR} onChange={this.handleSectionChange(Section.CLR)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>CLR Browser</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                        amet egestas eros, vitae egestas augue. Duis vel est augue.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <CollapsableSection
                    title='Color'
                    className='color'>
                        <ColorEditor
                            changeColor={this.props.changeColor}
                            selectedButton={this.props.selectedButton}
                            stateMappings={this.props.stateMappings}
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
