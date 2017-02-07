const webpackMerge = require('webpack-merge');
const base = require('./base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = webpackMerge(base, {
  output: {
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',   //enable srouce map
  plugins: [],
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      config: path.resolve(__dirname, './../src/config/dev.js')
    }
  }
});
