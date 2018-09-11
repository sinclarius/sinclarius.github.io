var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var pug = require('gulp-pug');

// Static Server + watching scss/html files
gulp.task('start', ['sass', 'views'], function () {

    browserSync.init({
        browser: 'Firefox Developer Edition',
        files: ["**/*.css", "*.html", "**/*.js", "!node_modules/**/*"],
        port: 7777,
        server: {
            baseDir: "./",
            directory: true
        }
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("views/*.pug", ['views']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('views', function buildHTML() {
    return gulp.src('views/*.pug')
        .pipe(pug({
            // Your options in here.
        }))
        .pipe(gulp.dest("./"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['start']);
