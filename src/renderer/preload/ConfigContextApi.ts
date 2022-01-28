import { ConfigContextApi } from './configContext';
import electronConfig from './ElectronConfig'

type AddedProps = {
  electron_config: typeof electronConfig
}

type CombinedWindow = typeof window & AddedProps

const context: ConfigContextApi = (window as CombinedWindow).electron_config.config;

export default context;
