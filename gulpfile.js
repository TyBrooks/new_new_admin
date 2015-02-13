var gulp = require('gulp');
var sass = require('gulp-sass');
var replace = require('gulp-replace');

var paths = {
  css: "app/stylesheets/compiled/",
  sass: "app/stylesheets/scss/",
  bower: "app/bower_components/"
}

var bases = {
  app: "app/"
}

gulp.task('default', function() {
  
})

gulp.task('watch', function() {
  gulp.watch(paths.scss + '*.scss', ['sass']);
})

gulp.task('sass', function() {
  gulp.src(paths.sass + 'app.scss')
    .pipe(sass())
    .pipe(gulp.dest(paths.css))
})
