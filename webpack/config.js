const path = require('path');

module.exports = {
  context: path.resolve('./src/'),
  entry: {
    main: ['./scss/main.scss', './js/main.js']
  },
  port: 3000,
  serverDir: './dist',
  debug: process.env.NODE_ENV === 'dev',
  output: {
    path: path.resolve('./dist'),
  }
};