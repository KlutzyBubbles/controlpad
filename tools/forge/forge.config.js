const path = require('path');
const rootDir = process.cwd();

module.exports = {
  packagerConfig: {
    asar: true,
    executableName: 'Control Pad',
    appCopyright: `Copyright (C) ${new Date().getFullYear()} KlutzyBubbles`,
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'electron-react-typescript-webpack-2021',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        devContentSecurityPolicy: '',
        port: 30001, // Webpack Dev Server port
        loggerPort: 9005,
        mainConfig: path.join(rootDir, 'tools/webpack/webpack.main.js'),
        renderer: {
          config: path.join(rootDir, 'tools/webpack/webpack.renderer.js'),
          entryPoints: [
            {
              name: 'app_window',
              rhmr: 'react-hot-loader/patch',
              html: path.join(rootDir, 'src/renderer/app.html'),
              js: path.join(rootDir, 'src/renderer/Renderer.tsx'),
              preload: {
                js: path.join(rootDir, 'src/renderer/Preload.tsx'),
              },
            },
          ],
        },
        devServer: {
          liveReload: false,
        },
      },
    ],
  ],
};
