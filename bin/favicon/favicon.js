var fs = require('fs');
var favicons = require('favicons'),
  source = './src/icons/favicon/favicon.png',         // Source image(s). `string`, `buffer` or array of `string`
  configuration = {
    appName: 'Beam-Finishing-Centre',                  // Your application's name. `string`
    appDescription: null,           // Your application's description. `string`
    developerName: null,            // Your (or your developer's) name. `string`
    developerURL: null,             // Your (or your developer's) URL. `string`
    background: "#fff",             // Background colour for flattened icons. `string`
    theme_color: "#fff",            // Theme color for browser chrome. `string`
    dir: './',
    path: "/",                      // Path for overriding default icons path. `string`
    display: "standalone",          // Android display: "browser" or "standalone". `string`
    orientation: "portrait",        // Android orientation: "portrait" or "landscape". `string`
    start_url: "/?homescreen=1",    // Android start application's URL. `string`
    version: "1.0",                 // Your application's version number. `number`
    logging: false,                 // Print logs to console? `boolean`
    online: false,                  // Use RealFaviconGenerator to create favicons? `boolean`
    preferOnline: false,            // Use offline generation, if online generation has failed. `boolean`
    icons: {
      // Platform Options:
      // - offset - offset in percentage
      // - shadow - drop shadow for Android icons, available online only
      // - background:
      //   * false - use default
      //   * true - force use default, e.g. set background for Android icons
      //   * color - set background for the specified icons
      //
      android: true,              // Create Android homescreen icon. `boolean` or `{ offset, background, shadow }`
      appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background }`
      appleStartup: true,         // Create Apple startup images. `boolean` or `{ offset, background }`
      coast: { offset: 25 },      // Create Opera Coast icon with offset 25%. `boolean` or `{ offset, background }`
      favicons: true,             // Create regular favicons. `boolean`
      firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset, background }`
      windows: true,              // Create Windows 8 tile icons. `boolean` or `{ background }`
      yandex: true                // Create Yandex browser icon. `boolean` or `{ background }`
    }
  },
  callback = function (error, response) {
    if (error) {
      console.log(error.status);  // HTTP error code (e.g. `200`) or `null`
      console.log(error.name);    // Error name e.g. "API Error"
      console.log(error.message); // Error description e.g. "An unknown error has occurred"
      return;
    }
    // console.log(response.images);   // Array of { name: string, contents: <buffer> }
    // console.log(response.files);    // Array of { name: string, contents: <string> }
    // console.log(response.html);     // Array of strings (html elements)

    if (!fs.existsSync('./dist/images/favicon')) {
      fs.mkdirSync('./dist/images/favicon', (err, folder) => {
        if (err) throw err;
        console.log(folder);
      });
    }

    response.files.forEach((file, index) => {
      let name = './dist/images/favicon/' + file.name;
      fs.writeFileSync(name, file.contents);
    });

    response.images.forEach((image, index) => {
      let name = './dist/images/favicon/' + image.name;
      fs.writeFileSync(name, new Buffer(image.contents, 'base64'));
    });

  };

favicons(source, configuration, callback);