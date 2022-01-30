import { KeyboardContextApi } from './KeyboardContext';
import electronKeyboard from './ElectronKeyboard'

type AddedProps = {
  electron_keyboard: typeof electronKeyboard
}

type CombinedWindow = typeof window & AddedProps

const context: KeyboardContextApi = (window as CombinedWindow).electron_keyboard.keyboard;

export default context;
