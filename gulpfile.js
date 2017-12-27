'use strict';
var gulp = require('gulp'),
	watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	cssmin = require('gulp-clean-css'),
	browserSync = require('browser-sync'),
	compass = require('gulp-compass'),
	changed = require('gulp-changed'),
	nunjucksRender = require('gulp-nunjucks-render'),
	data = require('gulp-data'),
	reload = browserSync.reload;

var path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		styles: 'build/styles/',
		fonts: 'build/fonts/'
	},
	src: {
		html: 'src/app/pages/**/*.+(html|njk)',
		js: 'src/js/main.js',
		styles: 'src/styles/main.scss',
		fonts: 'src/fonts/**/*.*'
	},
	    watch: {
        html: 'src/app/**/*.+(html|njk)',
        js: 'src/js/**/*.js',
        styles: 'src/styles/**/*.scss',
        fonts: 'src/fonts/**/*.*'
    },
	clean: '.build'
};
var config = {
	server: {
		baseDir: "./build/"
	},
	tunnel: false,
	host: 'localhost',
	port: 9000,
	logPrefix: "Starter Project"
};

gulp.task('webserver', function(){
	browserSync(config);
});
gulp.task('html:build', function(){
	return gulp.src(path.src.html)
	.pipe(data(function(){
		return require('./src/app/data.json')
	}))
	.pipe(nunjucksRender({
		path: ['./src/app/templates']
	}))
	.pipe(gulp.dest(path.build.html)) 
	.pipe(reload({stream: true}));
});
gulp.task('js:build', function(){
	gulp.src(path.src.js)
	.pipe(rigger())
	.pipe(sourcemaps.init())
	.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(path.build.js))
	.pipe(reload({stream: true}));
});
gulp.task('styles:build', function(){
	gulp.src(path.src.styles)
	.pipe(sourcemaps.init())
		.pipe(compass({
		config_file: 'config.rb',
		css: 'build/styles/',
		sass: 'src/styles/'
    }))
	.pipe(prefixer({
		browsers: ['last 2 versions'],
		cascade: true
	}))
	.pipe(cssmin())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(path.build.styles))
	.pipe(reload({stream:true}));
});
gulp.task('fonts:build', function(){
	gulp.src(path.src.fonts)
	.pipe(gulp.dest(path.build.fonts))
});
gulp.task('build', [
	'html:build',
	'js:build',
	'styles:build',
	'fonts:build'
]);
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.styles], function(event, cb) {
        gulp.start('styles:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});
gulp.task('default', ['build', 'webserver', 'watch']);
