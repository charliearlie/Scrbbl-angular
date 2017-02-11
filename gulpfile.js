var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var templateCache = require('gulp-angular-templatecache');

gulp.task('sass', function() {
	gulp.src('public/stylesheets/style.scss')
    	.pipe(plumber())
    	.pipe(sass())
    	.pipe(gulp.dest('public/stylesheets'));
});

gulp.task('compress', function() {
	gulp.src([
		'bower_components/angular-cookies/angular-cookies.js',
		'bower_components/angular-messages/angular-messages.js',
		'bower_components/angular-resource/angular-resource.js',
		'bower_components/angular-route/angular-route.js',
		'bower_components/angular-strap/dist/angular-strap.js',
		'bower_components/jquery/jquery.js',
		'bower_components/lodash/dist/lodash.js',
		'bower_components/moment/moment.js',
		'app.js',
		'public/services/*.js',
		'public/controllers/*.js',
		'public/filters/*.js',
		'public/directives/*.js'
		
  	])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public'));
});

gulp.task('templates', function() {
  gulp.src('public/views/**/*.html')
    .pipe(templateCache({ root: 'views', module: 'MyApp' }))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
	gulp.watch('public/stylesheets/*.scss', ['sass']);
  	gulp.watch('public/views/**/*.html', ['templates']);
  	gulp.watch(['public/**/*.js', '!public/app.min.js', '!public/templates.js', '!public/vendor'], ['compress']);
});

gulp.task('default', ['sass', 'compress', 'templates', 'watch']);