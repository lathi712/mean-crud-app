(function() {
  'use strict';

  var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    _paths = ['server/**/*.js', 'client/js/*.js'];
var browserSync = require('browser-sync');

  //register nodemon task
  // gulp.task('nodemon', function() {
  //   nodemon({
  //     script: 'server/app.js',
  //     env: {
  //       'NODE_ENV': 'development'
  //     }
  //   })
  //     .on('restart');
  // });
  gulp.task('nodemon', function(cb) {
    return nodemon({
      script: 'server/app.js',
      env: {
        'NODE_ENV': 'development'
      }
    }).on('start', function() {
      cb();
    }).on('restart');
  });


  // Rerun the task when a file changes
  gulp.task('watch', function() {
    livereload.listen();
    gulp.src(_paths, {
      read: false
    })
      .pipe(watch({
        emit: 'all'
      }))
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
    watch(_paths, livereload.changed);
  });

  //lint js files
  gulp.task('lint', function() {
    gulp.src(_paths)
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  });



  gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
      proxy: "http://localhost:3000",
      files:  ['server/**/*.js', 'client/js/*.js','client/partials/*.html'],
      port: 2000,
    });
  });


  // The default task (called when you run `gulp` from cli)
  gulp.task('default', ['lint', 'nodemon', 'watch','browser-sync']);

}());
