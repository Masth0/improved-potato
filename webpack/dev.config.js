const merge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
let base = require('./base.config');

module.exports = merge(base, {
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['./dist'] },
      files: ['*.html.twig', '*.css' , '*.js']
    })
  ]
});