const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    controlpad: [path.join(__dirname, '/ts/Run')],
    style: [path.join(__dirname, '/less/controlpad.less')]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      name: 'Controlpad',
      type: 'var'
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      fs: false,
      //buffer: require.resolve('buffer'),
      //os: require.resolve('os-browserify'),
      //crypto: require.resolve('crypto-browserify'),
      //http: require.resolve('http-browserify'),
      //https: require.resolve('https-browserify'),
      //stream: require.resolve('stream-browserify'),
      //path: require.resolve('path-browserify')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          /*
          {
            loader: "babel-loader",
            options: {
              presets: ["react", ["es2015", { modules: false }]],
            },
          }, */
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  },
  externals: {
    /* react: 'React',
    // 'react-dom': 'ReactDOM'/*,
    "whatwg-fetch": {
      // polyfill should be supplied externally
    }, */
  },
  plugins: [
    new webpack.DefinePlugin({
      CONTROLPAD_RELEASE: JSON.stringify(process.env.CONTROLPAD_RELEASE) || undefined
    }),
    new TerserPlugin({
      extractComments: false,
      terserOptions: {
        compress: {
          warnings: false
        }
      }
    }),
    new webpack.BannerPlugin({
      banner:
        'CONTROLPAD ' +
        process.env.CONTROLPAD_RELEASE +
        '\n' +
        'https://github.com/KlutzyBubbles/Controlpad'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      chunks: ['controlpad'],
      template: './html/index.html',
      inject: 'header',
      filename: 'index.html'
    })
  ],
  /*
  node: {
    // these modules are (possibly) provided by electron
    fs: "empty",
    net: "empty",
  },
  */
  devtool: 'source-map',
  target: 'web'
}
