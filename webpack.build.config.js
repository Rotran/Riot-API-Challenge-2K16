const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: './public/entry.js',
  output: {
    path: __dirname + '/public/build',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.png', '.jpg', '.gif', '.mp3'],
    root: [
      path.resolve('./node_modules'),
      path.resolve('./public/js'),
    ],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'public'),
        loaders: ['babel'],
      },
      {
        include: /\.json$/,
        loaders: ['json-loader'],
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'public', 'scss'),
        loader: ExtractTextPlugin.extract('css!postcss!sass?sourceMap'),
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: path.join(__dirname, 'public', 'images'),
        loader: 'url-loader?limit=8192',
      },
      {
        test: /\.mp3$/,
        include: path.join(__dirname, 'public', 'audio'),
        loader: 'url-loader',
      },
    ],
  },
};
