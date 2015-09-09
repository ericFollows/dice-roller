'use strict';

  var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
minifyhtml = require('gulp-minify-html'),
      sass = require('gulp-sass'),
livereload = require('gulp-livereload'),
     pages = require('gulp-gh-pages'),
       del = require('del');

gulp.task("concatScripts", function() {
	gulp.src([
		'src/js/ui.js',
		'src/js/dice.js'])
	.pipe(concat("app.js"))
	.pipe(gulp.dest("src/js"))
});

gulp.task("minifyScripts", function() {
	gulp.src("src/js/app.js")
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('dist/js'))
});

gulp.task("compileSass", function() {
  gulp.src("src/scss/styles.scss")
    .pipe(sass())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('dist/css'))
});

gulp.task("minifyHTML", function() {
  gulp.src("src/index.html")
    .pipe(minifyhtml())
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'))
});

gulp.task("watch", function() {
  livereload.listen();
    gulp.watch(styles.scss, ['compileSass']);
    gulp.watch(index.html, ['minifyHTML']);
    gulp.watch(dist + '/**').on('change', livereload.change);
});

gulp.task("deploy", function() {
	return gulp.src(options.dist + '**/*')
			   .pipe(pages());
});

gulp.task('clean:mobile', function () {
  return del([
    'dist/report.csv',
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'dist/mobile/**/*',
    // we don't want to clean this file though so we negate the pattern
    '!dist/mobile/deploy.json'
  ]);
});

gulp.task('default', ['clean:mobile']);