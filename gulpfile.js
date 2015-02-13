var gulp = require('gulp');
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var argv = require('yargs').argv;

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


gulp.task('rename-app', function() {
  if ( argv.old && argv.new ) {
    var regexs = [
      new RegExp("(module\\(\\s*)" + argv.old + "((?:\\..+)?\\s*\\))", "g"),
      new RegExp("(" + "describe\\(" + "\\s*" + ")" + argv.old + "(" + "(?:\\..+)?" + "\\s*" + "\\)" + ")", "g"),
      new RegExp("(" + "ng\\-app\\=" + "(?:\\'|\\\")" + "\\s*" + ")" + argv.old + "(" + "\\s+" + "(?:\\'|\\\")" + ")", "g")
    ]
    
    var replacement = "$1" + argv.new + "$2";
    
    gulp.src([
      bases.app + '**',
      "!" + paths.bower_components
    ]).pipe( replace( regexs[0], replacement) )
      .pipe( replace( regexs[1], replacement) )
      .pipe( replace( regexs[2], replacement) )
      .pipe( gulp.dest('./'))
  }
})