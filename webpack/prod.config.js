const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let base = require('./base.config');

module.exports = merge(base, {
  plugins: [
    new CleanWebpackPlugin(['./dist/js', './dist/css'], {
      root: path.resolve('./'),
      verbose: true,
      dry: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      },
      comments: false
    }),
    // Minify CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]
});