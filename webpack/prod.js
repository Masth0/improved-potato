const base = require('./base');
const webpack = require('webpack');

base.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    comments: false
  }),
);

module.exports = base;