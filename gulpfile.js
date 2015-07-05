"use strict";

var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var sass          = require('gulp-sass');
var plumber       = require('gulp-plumber');
var autoprefixer  = require('gulp-autoprefixer');
var include       = require('gulp-include');

// all the paths------------------------------------------------------------------------------------

var stylesheets = 'src/stylesheets';
var javascripts = 'src/javascripts';

var paths = {
  styles: stylesheets,
  stylesheet:  stylesheets + '/styles.{scss,sass}',
  stylesheets: stylesheets + '/**/*.{scss,sass}',
  javascript:  javascripts + '/application.js',
  javascripts: javascripts + '/**/*.js',
  images: "src/images/**.*"
};
gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(plumber())
        .pipe(gulp.dest('public/images'));
});
gulp.task('js', function () {
    return gulp.src(paths.javascripts)
        .pipe(plumber())
        .pipe(include())
        .pipe(gulp.dest('public'));
});
gulp.task('js-watch', ['js'], function () {
    browserSync.reload();
});


gulp.task('sass', function() {
    return gulp.src(paths.stylesheets)
        .pipe(plumber())
        .pipe(sass({
            indentedSyntax: true,
            includePaths: paths.styles,
            imagePath: 'img',
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("public"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['images','sass', 'js'], function() {

    browserSync.init(null, {
        proxy: "http://localhost:3000",
        open: false
    });

    gulp.watch(paths.stylesheets, ['sass']);
    gulp.watch(paths.javascripts, ['js-watch']);
    gulp.watch("views/**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
