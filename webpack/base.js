const config = require('./config');
const webpack = require('webpack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const base = {
  context: config.context,
  devtool: config.debug ? 'inline-source-map' : false,
  watch: config.debug,
  stats: 'errors-only',
  entry: config.entry,
  output: {
    path: config.output.path,
    chunkFilename: '[name].chunk.js',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.scss', '.css']
  },
  module: {
    rules: [
      // Javascript
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      // SCSS
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader'},
            {loader: 'resolve-url-loader'},
            {loader: 'postcss-loader', options: {
              plugins: (loader) => [
                require('autoprefixer')
              ]
            }},
            // SASS-LOADER
            {loader: 'sass-loader'}
          ]
        }),
      },
      // FILES
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  // PLUGINS
  plugins: [
    new ProgressBarPlugin(),
    new ExtractTextPlugin("css/app.css"),
  ]
};

module.exports = base;