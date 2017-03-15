var webpack = require('webpack');
var path = require('path');
var paths = {
  src: {
    js: __dirname + '/src/js/'
  }
};

module.exports = {
  entry: {
    main: paths.src.js + 'main.js',
    //vendor: ['']
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: __dirname + '/dist/js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['es2015', {modules: false}]],
          plugins: ['syntax-dynamic-import', 'transform-runtime']
        }
      }]
    }]
  },
  // plugins: [
  //   new webpack.optimize.CommonsChunkPlugin({
  //     names: ['vendor']
  //   })
  // ]
}