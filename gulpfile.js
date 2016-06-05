'use strict';

let gulp = require('gulp');
let sourcemaps = require('gulp-sourcemaps');
let tsc = require('gulp-typescript');
let tsProject = tsc.createProject('tsconfig.json');
let sass = require('gulp-sass');
let nodemon = require('gulp-nodemon');

gulp.task('serve', ['compile-ts', 'compile-scss'], () => {
	nodemon({script: './server/server.js'});
	
	gulp.watch(['./src/ts/*.ts', './src/scss/*.scss'], ['src-watch']);
});

gulp.task('src-watch', ['compile-ts', 'compile-scss']);

gulp.task('compile-scss', function() {
	var sourceScssFiles = [
		'./src/scss/*.scss'
	];
	
	var scssResult = gulp
		.src(sourceScssFiles)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError));
		
	var stream = scssResult
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./public/css'));
		
	return stream;
});

gulp.task('compile-ts', function() {
	var sourceTsFiles = [
		'./src/ts/*.ts',			// Path to typscript files
		'./typings/index.d.ts' 		// Reference to typings so tsc knows where it is
	];
	
	var tsResult = gulp
		.src(sourceTsFiles)
		.pipe(sourcemaps.init())
		.pipe(tsc(tsProject));
	
	var stream = tsResult
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./public/js'));
		
	return stream;
});