const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const isDev = process.env.NODE_ENV === 'dev';

// JAVASCRIPT config
const js = {
  name: 'js',
  context: path.resolve('./src/js/'),
  watch: isDev,
  entry: {
    main: './main.js'
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: __dirname + '/dist/js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
        }],
      }
    ]
  },
};
// SCSS config
const scss = {
  context: path.resolve('./src/scss/'),
  name: 'scss',
  watch: isDev,
  entry: {
    styles: ['./main.scss']
  },
  output: {
    filename: 'main.css',
    path: __dirname + '/dist/css'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader', options: {importLoaders: 1, minimize: !isDev}},
            {loader: 'resolve-url-loader'},
            {loader: 'postcss-loader', options: {
              plugins: (loader) => [
                require('autoprefixer')()
              ]
            }},
            {loader: 'sass-loader'}
          ]
        }),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'main.css',
      allChunks: true,
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] },
      files: ['*.html.twig', '*.css' , './dist/**/*.js']
    })
  ]
};

module.exports = [js, scss];