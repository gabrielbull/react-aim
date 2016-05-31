'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');

var compress = function() {
  return gulp.src('bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('.'));
};

gulp.task('bundle', compress);
