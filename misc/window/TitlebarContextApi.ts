import { TitlebarContextApi } from './TitlebarContext';
import electronWindow from './ElectronWindow'

type AddedProps = {
  electron_window: typeof electronWindow
}

type CombinedWindow = typeof window & AddedProps

const context: TitlebarContextApi = (window as CombinedWindow).electron_window.titlebar;

export default context;
