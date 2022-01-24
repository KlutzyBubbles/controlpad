const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    controlpad: [path.join(__dirname, '/ts/run')],
    controlpad_debug: [path.join(__dirname, '/ts/debug')]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'Controlpad',
    libraryTarget: 'var'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', ['es2015', { modules: false }]]
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'whatwg-fetch': {
      // polyfill should be supplied externally
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      CONTROLPAD_RELEASE: JSON.stringify(process.env.CONTROLPAD_RELEASE) || undefined
    })
  ],
  node: {
    // these modules are (possibly) provided by electron
    fs: 'empty',
    net: 'empty'
  },
  target: 'electron'
}
