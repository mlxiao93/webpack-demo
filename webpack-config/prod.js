const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const base = require('./base');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = webpackMerge(base, {
  output: {
    filename: 'bundle.[chunkhash].js',
    path: process.cwd() + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "bundle.[chunkhash].css"
    }),
    new UglifyJSPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false
      }
    }),
    new CleanWebpackPlugin(['dist'], {
      root: process.cwd(),
      exclude: []
    })
  ],
  resolve: {
    alias: {
      config: path.resolve(__dirname, './../src/config/prod.js')
    }
  }
});
