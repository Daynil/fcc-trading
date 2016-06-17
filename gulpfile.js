'use strict';

let gulp = require('gulp');
let sourcemaps = require('gulp-sourcemaps');
let tsc = require('gulp-typescript');
let tsProject = tsc.createProject('tsconfig.json');
let sass = require('gulp-sass');
let nodemon = require('gulp-nodemon');

/** Development Builds **/

gulp.task('serve', ['compile-ts', 'compile-scss', 'copy-untransformed'], () => {
  nodemon({script: './server/server.js'});
  
  gulp.watch(
        ['./src/**/*.ts', 
         './src/**/*.scss', 
         './src/**/*.html', 
         './src/**/*.js' ], ['src-watch']);
});

gulp.task('src-watch', ['compile-ts', 'compile-scss', 'copy-untransformed']);

gulp.task('compile-scss', function() {
  var sourceScssFiles = [
    './src/**/*.scss'
  ];
  
  var scssResult = gulp
    .src(sourceScssFiles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError));
    
  var stream = scssResult
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
    
  return stream;
});

gulp.task('compile-ts', function() {
  var sourceTsFiles = [
    './src/**/*.ts',			// Path to typscript files
    './typings/index.d.ts' 		// Reference to typings so tsc knows where it is
  ];
  
  var tsResult = gulp
    .src(sourceTsFiles)
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));
  
  var stream = tsResult
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
    
  return stream;
});

/** Copy untransformed files to destination folder */
gulp.task('copy-untransformed', function() {
  var sourceFiles = [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.css'
  ];

  var stream = gulp
    .src(sourceFiles)
    .pipe(gulp.dest('./dist'));

  return stream;
});

/** Production Builds **/

gulp.task('build-production', ['compile-ts-prod', 'compile-scss-prod', 'copy-untransformed']);

gulp.task('compile-scss-prod', function() {
  var sourceScssFiles = [
    './src/**/*.scss'
  ];
  
  var scssResult = gulp
    .src(sourceScssFiles)
    .pipe(sass().on('error', sass.logError));
    
  var stream = scssResult
    .pipe(gulp.dest('./dist'));
    
  return stream;
});

gulp.task('compile-ts-prod', function() {
  var sourceTsFiles = [
    './src/**/*.ts',			      // Path to typscript files
    './typings/index.d.ts'	  	// Reference to typings so tsc knows where it is
  ];
  
  var tsResult = gulp
    .src(sourceTsFiles)
    .pipe(tsc(tsProject));
  
  var stream = tsResult
    .pipe(gulp.dest('./dist'));
    
  return stream;
});