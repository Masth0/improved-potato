const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');


const paths = {
  src: {
    js: __dirname + '/src/js/'
  }
};

/*---- Javascript config -----------------------------------------------------------------------*/
const JS = {
  name: 'js',
  entry: {
    main: paths.src.js + '/main.js'
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
    },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader!eslint-loader'
          }
        }
      }]
  }
};

/*---- SCSS / CSS config -----------------------------------------------------------------------*/
const SCSS = {
  context: __dirname,
  name: 'scss',
  entry: {
    styles: ['./src/scss/style.scss']
  },
  output: {
    filename: 'style.css',
    path: __dirname + '/dist/css'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: /.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader'},
            {loader: 'resolve-url-loader'},
            {loader: 'postcss-loader', options: {
              plugins: () => {
                return [
                  require('autoprefixer')({ browsers: [
                    'last 2 versions',
                    'safari 5',
                    'ie 9',
                    'opera 12.1',
                    'ios 6',
                    'android 4'
                  ]})
                ]
              }
            }},
            {loader: 'sass-loader'}
          ]
        }),
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    })
  ]
};

/*---- PLUGINS -----------------------------------------------------------------------*/
const PLUGINS = [];

/*---- Export -----------------------------------------------------------------------*/
module.exports = [JS, SCSS];
