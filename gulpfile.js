var gulp = require('gulp');
var copy = require('gulp-copy');

gulp.task('default', (done) => {
    var browserSync = require('browser-sync').create();

    browserSync.init({
        server: {
            baseDir: __dirname
        },
        port: 8080,
        reloadOnRestart: true
    });

    gulp.watch(['src/**/*', 'index.*'], []).on('change', browserSync.reload);

    // dont call done()
});

gulp.task('dist', (done) => {
    var sources = [
        'index.*',
        'src/**/*',
        'bower_component/angular/angular.js'
    ]

    gulp.src(sources)
        .pipe(copy('docs'))
        .on('end', done);
});