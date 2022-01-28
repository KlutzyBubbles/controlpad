import * as React from 'react'
import { StateMappings } from '../../../common/interfaces'
import { sectionToString } from '../../Utils'
import { SelectedButton } from '../App'
import ColorEditor from './ColorEditor'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { RGB } from '../../../common/Color'
import { Section } from '../../Constants'

export const enum BoardButtonType {
    Circle = 0,
    Square = 1
}

interface BoardButtonProps extends React.ClassAttributes<BoardButton> {
    selectedButton?: SelectedButton
    changeColor: (section: Section, x: number, y: number, color: RGB, active: boolean) => void
    changeName: (section: Section, x: number, y: number, name: string) => void
    stateMappings: StateMappings
}

export default class BoardButton extends React.Component<BoardButtonProps, Record<string, never>> {

    constructor(props: BoardButtonProps) {
        super(props)
    }

    handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        console.log(event.target.value)
        // this.setState({
        //     name: event.target.value
        // })
        if (this.props.selectedButton === undefined)
          return
        this.props.changeName(this.props.selectedButton.section, this.props.selectedButton.x, this.props.selectedButton.y, event.target.value)
    }

    getName = () => {
        if (this.props.selectedButton === undefined)
            return;
        if (!Object.prototype.hasOwnProperty.call(this.props.stateMappings, this.props.selectedButton.section))
            this.props.stateMappings[this.props.selectedButton.section] = []
        for (const state of this.props.stateMappings[this.props.selectedButton.section]) {
            if (state.x === this.props.selectedButton.x && state.y === this.props.selectedButton.y) {
                return state.name
            }
        }
    }

    public render(): JSX.Element {
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
    }
}
