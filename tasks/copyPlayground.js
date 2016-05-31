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

var removePlayground = function () {
  return new Promise((resolve) => {
    rimraf.sync('playground');
    resolve();
  });
};

var copyPlayground = function () {
  return new Promise((resolve) => {
    gulp.src('./react-aim/playground/**/*')
      .pipe(replace(/(\.\.\/)+src/g, 'react-aim/lib'))
      .pipe(replace(/import target from 'react-aim\/lib\/target'/, 'import { target } from \'react-aim\''))
      .pipe(replace(/import source from 'react-aim\/lib\/source'/, 'import { source } from \'react-aim\''))
      .pipe(gulp.dest('./playground/'))
      .on('end', resolve);
  });
};

gulp.task('copy-playground', function (cb) {
  removeReactAim()
    .then(removePlayground)
    .then(cloneReactAim)
    .then(copyPlayground)
    .then(removeReactAim)
    .then(cb);
});
