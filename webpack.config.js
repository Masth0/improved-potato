const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ENV = process.env.NODE_ENV;

let config = {
  name: 'Assets',
  context: __dirname,
  mode: ENV === 'dev' ? 'development' : 'production',
  watch: ENV === 'dev',
  performance: {
    hints: ENV === 'prod' ? 'warning' : false,
  },
  entry: {
    app: ['./src/scss/app.scss', './src/js/app.js']
  },
  output: {
    path: path.resolve('./dist/build'),
    filename: ENV === 'dev' ? './js/[name].js' : './js/[name].[hash:8].js',
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
          fallback: 'style-loader?sourceMap',
          use: [
            {loader: 'css-loader?sourceMap'},
            {loader: 'postcss-loader',
              options: {
                plugins: (loader) => [ require('autoprefixer') ]
              }
            },
            {loader: 'resolve-url-loader'},
            {loader: 'sass-loader?sourceMap'},
          ]
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              publicPath: '../images',
              outputPath: './images',
              useRelativePath: false
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: ENV === 'dev' ? './css/[name].css' : './css/[name].[hash:8].css',
      allChunks: true,
    }),
    new ManifestPlugin()
  ]
};

if (ENV === 'prod') {
  config.plugins.unshift(new CleanWebpackPlugin(['./build'], {
    root: path.join(__dirname, './dist'),
    verbose: true,
    dry: false,
  }));
}

module.exports = config;