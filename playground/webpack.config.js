var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'index.js'),

  output: {
    path: path.join(__dirname),
    filename: 'bundle.js',
    publicPath: '/'
  },

  devServer: {
    filename: 'index.js',
    contentBase: path.join(__dirname)
  },

  devtool: 'source-map',

  resolve: {
    alias: {
      'react-aim/lib/corners': path.join(__dirname, '..', 'src', 'corners'),
      'react-aim': path.join(__dirname, '..', 'src', 'index')
    }
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin()
  ]
};
