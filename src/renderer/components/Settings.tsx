import * as React from 'react';

interface SettingsProps extends React.ClassAttributes<Settings> {
  locale: string;
  onSelectLocale?: (locale: string, loaded?: () => void) => void;
  isLogVisible: boolean;
  replayFilename?: string;
  onToggleLog: () => void;
  onClose?: () => void;
}

export default class Settings extends React.Component<SettingsProps> {
  protected downloadXML(): void {
    console.error('NOT IMPLEMENTED');
  }

  public render(): JSX.Element {
    const release = CONTROLPAD_RELEASE;

    return (
      <div className='controlpad-scrubber-settings'>
        {this.props.onClose !== undefined && (
          <header>
            <span>Settings</span>
            <a title='Close' onClick={this.props.onClose.bind(null)}>
              &times;
            </a>
          </header>
        )}
        <section>
          <label>
            <span>Card Language:</span>
          </label>
        </section>
        <section>
          <label className='controlpad-scrubber-settings-checkbox'>
            <input
              type='checkbox'
              checked={this.props.isLogVisible}
              onChange={() => this.props.onToggleLog()}
            />
            <span>Show Event Log</span>
          </label>
        </section>
        <footer>
          <a
            href='https://github.com/HearthSim/Controlpad/issues'
            target='_blank'
            rel='noreferrer'
          >
            Report Issue
          </a>
          <a
            href='https://hearthsim.info/controlpad/'
            target='_blank'
            title={`Controlpad ${release}`}
            rel='noreferrer'
          >
            About
          </a>
        </footer>
      </div>
    );
  }
}
