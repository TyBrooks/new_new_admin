var gulp = require('gulp');
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var tap = require('gulp-tap');
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
    console.log(argv.old, argv.new)
    var regexps = [
      new RegExp("(module\\(\\s*)" + argv.old + "((?:\\..+)?\\s*\\))", "g"),
      new RegExp("(" + "describe\\(" + "\\s*" + ")" + argv.old + "(" + "(?:\\..+)?" + "\\s*" + "\\)" + ")", "g"),
      new RegExp("(" + "ng\\-app\\=" + "(?:\\'|\\\")" + "\\s*" + ")" + argv.old + "(" + "\\s+" + "(?:\\'|\\\")" + ")", "g")
    ]
    
    var replacement = "$1" + argv.new + "$2";
    
    gulp.src([
      bases.app + '**',
      "!" + paths.bower_components
    ], {base: './'} )
      .pipe( replace( regexps[0], replacement) )
      .pipe( tap( function( file ) {
        console.log( file.path );
      } ) )
      .pipe( replace( regexps[1], replacement) )
      .pipe( replace( regexps[2], replacement) )
      .pipe( gulp.dest('./'))
  }
})