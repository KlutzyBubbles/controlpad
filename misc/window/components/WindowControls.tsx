import classNames from 'classnames';
import React from 'react';
import context from '../titlebarContextApi';

type Props = {
  platform: string;
  tooltips?: boolean;
};

const WindowControls: React.FC<Props> = (props) => {
  return (
    <section
      className={classNames(
        'window-titlebar-controls',
        `type-${props.platform}`,
      )}
    >
      <div
        className='control minimize'
        onClick={() => context.minimize()}
        title={props.tooltips ? 'Minimize' : null}
      >
        ─
      </div>
      <div
        className='control maximize'
        onClick={() => context.toggle_maximize()}
        title={props.tooltips ? 'Maximize' : null}
      >
        ☐
      </div>
      <div
        className='control close'
        onClick={() => context.exit()}
        title={props.tooltips ? 'Close' : null}
      >
        X
      </div>
    </section>
  );
};

export default WindowControls;
