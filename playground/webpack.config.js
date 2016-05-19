var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'index.js'),

  output: {
    path: './playground',
    filename: 'bundle.js',
    publicPath: '/'
  },

  devServer: {
    filename: 'index.js',
    contentBase: './playground'
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin()
  ]
};
