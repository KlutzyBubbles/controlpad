module.exports = {
  entry: ['./src/main/app.ts'],
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: require('./webpack.aliases'),
  },
  stats: 'minimal',
};
