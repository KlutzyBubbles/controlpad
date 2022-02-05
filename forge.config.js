const path = require('path');
const rootDir = process.cwd();
const package = require('./package.json');

module.exports = {
  packagerConfig: {
    asar: false,
    executableName: 'controlpad',
    appCopyright: `Copyright (C) ${new Date().getFullYear()} KlutzyBubbles`,
    extraResource: path.resolve(rootDir, 'assets', 'icon.ico'),
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      // platforms: ['win32'],
      config: (arch) => {
        return {
          name: 'controlpad',
          authors: 'KlutzyBubbles',
          exe: 'controlpad.exe',
          noMsi: true,
          remoteReleases: '',
          setupExe: `controlpad-${package.version}-setup-${arch}.exe`,
          setupIcon: path.resolve(rootDir, 'assets', 'icon.ico'),
          // certificateFile: process.env['WINDOWS_CODESIGN_FILE'],
          // certificatePassword: process.env['WINDOWS_CODESIGN_PASSWORD'],
        }
      }
    },
    {
      name: '@electron-forge/maker-zip',
      // platforms: ['darwin', 'win32']
    },
    {
      name: '@electron-forge/maker-deb',
      // platforms: ['linux']
    },
    {
      name: '@electron-forge/maker-rpm',
      // platforms: ['linux']
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
