const path = require('path');

module.exports = {
  entry: './public/entry.js',
  output: {
    path: `${__dirname}/public/build`,
    filename: 'bundle.js',
  },
  resolve: {
    root: [
      path.resolve(__dirname),
    ],
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|build)/,
        loaders: ['babel'],
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
      },
    ],
  },
};
