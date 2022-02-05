import electronLog from './ElectronLog';
import log from 'electron-log';

type AddedProps = {
  electron_log: typeof electronLog;
}

type CombinedWindow = typeof window & AddedProps;

const context: typeof log.functions = (window as CombinedWindow).electron_log.log;

export default context;
