var gulp = require('gulp');
var plumber = require('gulp-plumber'); // Pour les erreurs
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var twig = require('gulp-twig');
var gulpWebpack = require('webpack-stream');
var webpack = require('webpack');

/*---- Paths -----------------------------------------------------------------------*/
var root = './';

var folder = {
	dist : './dist/',
	views : root + 'src/views/',
	js : root + 'src/js/',
	scss : root + 'src/scss/',
	icons : root + 'src/icons/',
	css : root + 'dist/css/',
	images : root + 'dist/images/',
	fonts : root + 'dist/fonts/'
};

var file = {
	views : folder.views + '**/*.twig',
	html : folder.dist + '**/*.html',
	scss : folder.scss + '**/*.scss',
	js : folder.js + '**/*.js',
	jsStatic : folder.js + 'static/*.js',
	iconsPng : folder.icons + 'png/*.png'
};

/*---- Connect  -----------------------------------------------------------------------*/
gulp.task('connect', function() {
	connect.server({
		port : 8000,
		livereload : true
	});
});

/*---- Copy static js files -----------------------------------------------------------------------*/
gulp.task('copyJsStatic', function() {
  return gulp.src(file.jsStatic)
    .pipe(gulp.dest('./dist/js/static/'))
    .pipe(connect.reload());
});

/*---- Webpack -----------------------------------------------------------------------*/
gulp.task('webpack', function() {
  return gulp.src(file.js)
    .pipe(gulpWebpack(require('./webpack.config.js'), webpack))
    .pipe(gulp.dest('dist/js'));
});

/*---- Twig -----------------------------------------------------------------------*/
gulp.task('twig', function () {
    return gulp.src(file.views)
    	.pipe(plumber())
      .pipe(twig())
      .pipe(gulp.dest(folder.dist))
      .pipe(connect.reload());
});

/*---- Html -----------------------------------------------------------------------*/
gulp.task('html', function() {
	gulp.src(file.html)
  .pipe(connect.reload());
});

/*---- Js -----------------------------------------------------------------------*/
gulp.task('js', function() {
	gulp.src(file.js)
		.pipe(plumber())
    .pipe(connect.reload());
});

/*---- Sass -----------------------------------------------------------------------*/
gulp.task('sass', function() {
	gulp.src(file.scss) // on cible tous les fichiers scss
		.pipe(plumber())
		.pipe(sass({
		  	outputStyle : 'expanded'
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
		.pipe(gulp.dest(folder.css))
	  	.pipe(connect.reload());
});

/*---- Watch -----------------------------------------------------------------------*/
gulp.task('watch', function() {
	gulp.watch(file.scss, ['sass']);
	gulp.watch(file.js, ['webpack']);
	gulp.watch(file.js, ['js']);
	gulp.watch(file.html, ['html']);
	gulp.watch(file.views, ['twig']);
});

/*---- Default -----------------------------------------------------------------------*/
gulp.task('default', ['connect', 'watch']);