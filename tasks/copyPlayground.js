'use strict';

var fs = require('fs');
var gulp = require('gulp');
var git = require('gulp-git');
var rimraf = require('rimraf');
var Promise = require('bluebird');
var replace = require('gulp-replace');

var cloneReactAim = function () {
  return new Promise((resolve) => {
    git.clone('https://github.com/gabrielbull/react-aim.git', function (err) {
      resolve();
    });
  });
};

var removeReactAim = function () {
  return new Promise((resolve) => {
    rimraf.sync('react-aim');
    resolve();
  });
};

var removeExamples = function () {
  return new Promise((resolve) => {
    rimraf.sync('examples');
    resolve();
  });
};

var removePlayground = function () {
  return new Promise((resolve) => {
    rimraf.sync('playground');
    resolve();
  });
};

var copyExamples = function () {
  return new Promise((resolve) => {
    gulp.src('./react-aim/examples/**/*')
      .pipe(gulp.dest('./examples/'))
      .on('end', resolve);
  });
};

var copyPlayground = function () {
  return new Promise((resolve) => {
    gulp.src('./react-aim/playground/**/*')
      .pipe(gulp.dest('./playground/'))
      .on('end', resolve);
  });
};

gulp.task('copy-playground', function (cb) {
  removeReactAim()
    .then(removeExamples)
    .then(removePlayground)
    .then(cloneReactAim)
    .then(copyExamples)
    .then(copyPlayground)
    .then(removeReactAim)
    .then(cb);
});
