import { ConfigContextApi } from './configContext';

const context: ConfigContextApi = (window as any).electron_config.config;

export default context;
