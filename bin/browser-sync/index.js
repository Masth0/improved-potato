const BS = require('browser-sync').create();

// configuration
let config = {
  host: 'localhost',
  port: 8080,
  server: {
    baseDir: ['./dist']
  },
  // proxy: "name.test"
  files: ['*.css', '*.js', '*.html']
};

// init the server and start it
BS.init(config);
