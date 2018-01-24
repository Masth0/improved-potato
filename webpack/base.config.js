const webpack = require('webpack');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let ENV = process.env.NODE_ENV;

module.exports = {
  context: path.resolve('./src/'),
  watch: ENV === 'dev',
  devtool: 'eval',
  stats: 'normal',
  entry: {
    main: ['./scss/main.scss', './js/main.js']
  },
  output: {
    path: path.resolve('./dist'),
    chunkFilename: '[name].chunk.js',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.scss', '.css']
  },
  module: {
    rules: [
      // JS
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
            {loader: 'postcss-loader', 
              options: {
                plugins: (loader) => [ require('autoprefixer') ]
              }
            },
            {loader: 'sass-loader'}
          ]
        }),
      },
      // FILES
      { 
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      }
    ]
  },
  // PLUGINS
  plugins: [
    new ProgressBarPlugin(),
    new ExtractTextPlugin("css/app.css"),
  ]
};