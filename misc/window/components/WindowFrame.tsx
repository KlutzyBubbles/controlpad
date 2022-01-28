import React, { useEffect, useRef } from 'react';
import Titlebar from './Titlebar';
import logo from '@assets/logo.png';

type Props = {
  title?: string;
  borderColor?: string;
  platform: 'windows' | 'mac';
};

type Context = {
  platform: 'windows' | 'mac';
};

export const WindowContext = React.createContext<Context>({
  platform: 'windows',
});

const WindowFrame: React.FC<Props> = (props) => {
  const itsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { parentElement } = itsRef.current;
    parentElement.classList.add('has-electron-window');
    parentElement.classList.add('has-border');

    if (props.borderColor) {
      parentElement.style.borderColor = props.borderColor;
    }
  }, []);

  return (
    <WindowContext.Provider value={{ platform: props.platform }}>
      <div className='start-electron-window' ref={itsRef}></div>
      <Titlebar
        title={props.title ?? 'Electron Window'}
        mode='centered-title'
        icon={logo}
      />
      <div className='window-content'>{props.children}</div>
    </WindowContext.Provider>
  );
};

export default WindowFrame;
