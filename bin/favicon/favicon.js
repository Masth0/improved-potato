/* sources : https://www.npmjs.com/package/favicons */
var favicons = require('favicons'),
    source = 'src/assets/favicon/favicon.png', // Source image(s). `string`, `buffer` or array of `string` 
    configuration = {
        appName: null,                  // Your application's name. `string` 
        appDescription: null,           // Your application's description. `string` 
        developerName: null,            // Your (or your developer's) name. `string` 
        developerURL: null,             // Your (or your developer's) URL. `string` 
        background: "#fff",             // Background colour for flattened icons. `string` 
        path: "'D:/Thomas/front-end-base/dist", // Path for overriding default icons path. `string` 
        display: "standalone",          // Android display: "browser" or "standalone". `string` 
        orientation: "portrait",        // Android orientation: "portrait" or "landscape". `string` 
        start_url: "/?homescreen=1",    // Android start application's URL. `string` 
        version: "1.0",                 // Your application's version number. `number` 
        logging: false,                 // Print logs to console? `boolean` 
        online: false,                  // Use RealFaviconGenerator to create favicons? `boolean` 
        preferOnline: false,            // Use offline generation, if online generation has failed. `boolean` 
        icons: {
            android: true,              // Create Android homescreen icon. `boolean` 
            appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset: offsetInPercentage }` 
            appleStartup: true,         // Create Apple startup images. `boolean` 
            coast: { offset: 25 },      // Create Opera Coast icon with offset 25%. `boolean` or `{ offset: offsetInPercentage }` 
            favicons: true,             // Create regular favicons. `boolean` 
            firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset: offsetInPercentage }` 
            windows: true,              // Create Windows 8 tile icons. `boolean` 
            yandex: true                // Create Yandex browser icon. `boolean` 
        }
    },
    callback = function (error, response) {
        if (error) {
            console.log(error.status);  // HTTP error code (e.g. `200`) or `null` 
            console.log(error.name);    // Error name e.g. "API Error" 
            console.log(error.message); // Error description e.g. "An unknown error has occurred" 
        }
        console.log(response.images);   // Array of { name: string, contents: <buffer> } 
        console.log(response.files);    // Array of { name: string, contents: <string> } 
        console.log(response.html);     // Array of strings (html elements) 
    };
 
//favicons(source, configuration, callback);

var config = favicons.config;

console.log(config);