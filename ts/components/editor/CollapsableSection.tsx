import * as React from 'react'

export const enum CollapsableSectionType {
    Circle = 0,
    Square = 1
}

interface CollapsableSectionProps extends React.ClassAttributes<CollapsableSection> {
    title: string
    className: string
    clearClicked?: Function
}

interface CollapsableSectionState {
    hidden: boolean
}

export default class CollapsableSection extends React.Component<CollapsableSectionProps, CollapsableSectionState> {

    constructor(props: CollapsableSectionProps) {
        super(props)
        this.state = {
            hidden: true
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            hidden: !this.state.hidden
        })
    }

    public render(): JSX.Element {
        var clearButton = <span className="clear_opt" onClick={() => this.props.clearClicked ? this.props.clearClicked() : undefined}>
            Clear
        </span>
        var contentClasses = ['content']
        if (this.state.hidden) {
            contentClasses.push('hidden')
        }
        return (
            <div className={this.props.className}>
                <div className="expandable" onClick={this.handleClick}>
                    <div className="header">{this.props.title}
                        {this.props.clearClicked ? clearButton : ''}
                    </div>
                </div>
                <div className={contentClasses.join(' ')}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
