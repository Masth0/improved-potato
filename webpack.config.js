var webpack = require('webpack');
var paths = {
  src: {
    js: __dirname + '/src/js/'
  }
};
module.exports = {
  watch: true,
  entry: {
    main: paths.src.js + 'main.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/js'
  },
  module: {
    rules: [
      // Javascript es6
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  }
}