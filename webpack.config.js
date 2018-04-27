const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV == 'dev';

let config = {
  name: 'Assets',
  context: __dirname,
  mode: devMode ? 'development' : 'production',
  watch: devMode,
  performance: {
    hints: devMode ? false : 'warning',
  },
  entry: {
    app: ['./src/scss/app.scss', './src/js/app.js']
  },
  output: {
    path: path.resolve('./dist/build'),
    filename: devMode ? './js/[name].js' : './js/[name].[hash:8].js',
  },
  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          'postcss-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
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
      {
        test: /\.(ttf|svg|eot|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              publicPath: '../fonts',
              outputPath: './fonts',
              useRelativePath: false
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? './css/[name].css' : './css/[name].[hash:8].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new ManifestPlugin()
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};

if (!devMode) {
  config.plugins.unshift(new CleanWebpackPlugin(['./build'], {
    root: path.join(__dirname, './dist'),
    verbose: true,
    dry: false,
  }));
}

module.exports = config;