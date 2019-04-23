// include gulp
var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('build', function () {
    return gulp.src(['./src/overlay.js', './src/updateMarkings.js'])
        .pipe(concat('tiled-overlay.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/minified/'));
});

gulp.task('default', ['build'], function () {
});