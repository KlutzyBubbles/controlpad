export type TitlebarMenuItem = {
  name: string;
  action?: string;
  shortcut?: string;
  value?: string | number;
  items?: TitlebarMenuItem[];
};

export type TitlebarMenu = {
  name: string;
  items: TitlebarMenuItem[];
};

const titlebarMenus: TitlebarMenu[] = [
  {
    name: 'File',
    items: [
      {
        name: 'Export Configuration',
        action: 'export',
      },
      {
        name: 'Import Configuration',
        action: 'import',
      },
      {
        name: '__',
      },
      {
        name: 'Exit',
        action: 'exit',
      },
    ],
  },
  {
    name: 'View',
    items: [
      {
        name: 'Reload',
        action: 'reload',
        shortcut: 'Ctrl+R',
      },
      {
        name: 'Toogle Developer Tools',
        action: 'toggle_devtools',
        shortcut: 'Ctrl+Shift+I',
      },
      {
        name: '__',
      },
      {
        name: 'Actual Size',
        action: 'actual_size',
        shortcut: 'Ctrl+0',
      },
      {
        name: 'Zoom In',
        action: 'zoom_in',
        shortcut: 'Ctrl++',
      },
      {
        name: 'Zoom Out',
        action: 'zoom_out',
        shortcut: 'Ctrl+-',
      },
      {
        name: '__',
      },
      {
        name: 'Toggle Fullscreen',
        action: 'toggle_fullscreen',
        shortcut: 'F11',
      },
    ],
  },
  {
    name: 'Settings',
    items: [
      {
        name: 'Minimize to Tray',
        action: 'minimize_tray',
        shortcut: 'Ctrl+M',
      },
      {
        name: 'Launch on Startup',
        action: 'startup_launch',
        shortcut: 'Ctrl+W',
      },
      {
        name: 'Start Minimized',
        action: 'start_minimized',
        shortcut: 'Ctrl+W',
      },
    ],
  },
  {
    name: 'Help',
    items: [
      {
        name: 'Check for Updates',
        action: 'update_check',
      },
      {
        name: 'View on Github',
        action: 'open_url',
        value: 'https://github.com/KlutzyBubbles',
      },
      {
        name: 'About',
        action: 'open_about'
      },
    ],
  },
];

export default titlebarMenus;
