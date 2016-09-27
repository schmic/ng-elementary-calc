var gulp = require('gulp');

gulp.task('default', () => {
    var browserSync = require('browser-sync').create();

    browserSync.init({
        server: {
            baseDir: __dirname
        },
        port: 8080,
        reloadOnRestart: true
    });

    gulp.watch(['src/**/*', 'indexer.*'], []).on('change', browserSync.reload);
});