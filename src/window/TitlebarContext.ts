import { ipcRenderer } from 'electron';

const titlebarContext = {
  exit() {
    ipcRenderer.invoke('window-close');
  },
  minimize() {
    ipcRenderer.invoke('window-minimize');
  },
  toggle_maximize() {
    ipcRenderer.invoke('window-toggle-maximize');
  },
  reload() {
    ipcRenderer.invoke('web-reload');
  },
  toggle_devtools() {
    ipcRenderer.invoke('web-toggle-devtools');
  },
  actual_size() {
    ipcRenderer.invoke('web-actual-size');
  },
  zoom_in() {
    ipcRenderer.invoke('web-zoom-in');
  },
  zoom_out() {
    ipcRenderer.invoke('web-zoom-out');
  },
  toggle_fullscreen() {
    ipcRenderer.invoke('web-toggle-fullscreen');
  },
  export() {
    ipcRenderer.invoke('file-export');
  },
  import() {
    return ipcRenderer.invoke('file-import');
  },
  close_tray() {
    ipcRenderer.invoke('window-close-tray');
  },
  minimize_tray() {
    ipcRenderer.invoke('window-minimize-tray');
  },
  startup_launch() {
    ipcRenderer.invoke('window-startup-launch');
  },
  start_minimized() {
    ipcRenderer.invoke('window-startup-minimized');
  },
  update_check() {
    ipcRenderer.invoke('app-update-check');
  },
  open_about() {
    ipcRenderer.invoke('app-open-about');
  },
  open_url(url: string) {
    ipcRenderer.invoke('open-url', url);
  },
};

export type TitlebarContextApi = typeof titlebarContext;

export default titlebarContext;
