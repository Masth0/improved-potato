const config = require('./config');
const base = require('./base');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

base.plugins.push(
  new BrowserSyncPlugin({
    host: 'localhost',
    port: config.port,
    server: { baseDir: [config.serverDir] },
    files: ['*.html.twig', '*.css' , '*.js']
  })
);

module.exports = base;