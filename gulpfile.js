const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const favicons = require("gulp-favicons");
const twig = require('gulp-twig');
const browsersync = require('browser-sync');

/*---- Config -----------------------------------------------------------------------*/
browsersync.create(); // create server Browser-sync

console.log(gutil.env.type);

const config = {
  env: gutil.env.env || 'dev',
  port: 8000,
	appName: "",
  folder: {
    dist: './dist',
    twig: './src/views',
    js: './src/js',
    scss: './src/scss',
    icons: './src/icons',
    css: './dist/css',
    images: './dist/images',
    fonts: './dist/fonts'
  },
  files: {
    twig: './src/views/**/*.twig',
    scss:  './src/scss/**/*.scss',
    js: './src/js/**/*.js',
    jsStatic: './src/js/static/*.js'
  }
};

/*---- Browser Sync -----------------------------------------------------------------------*/
gulp.task('browser-sync', function() {
  browsersync.init({
     server: {
			baseDir: "./dist"
		}
  })
});

/*---- Twig -----------------------------------------------------------------------*/
gulp.task('twig', function () {
    return gulp.src(config.files.twig)
    	.pipe(plumber())
      .pipe(twig())
      .pipe(gulp.dest('./dist/'));
});

/*---- Sass -----------------------------------------------------------------------*/
gulp.task('sass', function() {
	gulp.src(config.files.scss) // on cible tous les fichiers scss
		.pipe(plumber())
		.pipe(sass({
		  	outputStyle: config.env === 'prod' ? 'compressed' : 'expanded'
		})) // on compile
    .pipe(autoprefixer({
      browsers : [
        'last 2 versions',
        'safari 5',
        'ie 9',
        'opera 12.1',
        'ios 6',
        'android 4'
      ],
        cascade: false
    }))
  .pipe(gulp.dest(config.folder.css))
  .pipe(browsersync.reload({stream: true}));
});

/*---- Favicon -----------------------------------------------------------------------*/
gulp.task("favicon", function () {
    return gulp.src("./src/assets/favicon/favicon.png").pipe(favicons({
        appName: config.appName,
        appDescription: "",
        developerName: "",
        developerURL: "",
        background: "#020307",
        path: "./dist/images/favicon",
        url: "./dist/images/favicon",
        display: "standalone",
        orientation: "portrait",
        start_url: "/?homescreen=1",
        version: 1.0,
        logging: false,
        online: false,
        html: "index.html",
        pipeHTML: true,
        replace: true
    }))
    .pipe(gulp.dest("./dist/images/favicon"));
});

/*---- Watch -----------------------------------------------------------------------*/
gulp.task('watch', function() {
	gulp.watch(config.files.scss, ['sass']);
	gulp.watch(config.files.twig, ['twig']);
  gulp.watch(config.files.html).on('change', browsersync.reload);
  gulp.watch('./dist/js/**/*.js').on('change', browsersync.reload);
});

/*---- Default -----------------------------------------------------------------------*/
gulp.task('default', ['browser-sync', 'watch']);