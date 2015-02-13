var gulp = require('gulp');
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var tap = require('gulp-tap');
var argv = require('yargs').argv;

var paths = {
  css: "app/stylesheets/build/",
  sass: "app/stylesheets/src/",
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
  //regexp pieces to make the semantics a little more clear
  var rquot         =   "(?:\\'|\\\")";
  var roptSpaces    =   "\\s*";
  var rstartCap     =   "(";
  var rstopCap      =   ")";
  var roptExtension =   "(?:\\.\\S+)?"
  
  if ( argv.old && argv.new ) {
    var regexps = [
      new RegExp(rstartCap + "module\\(" + roptSpaces + rquot + roptSpaces + rstopCap + argv.old + rstartCap + roptExtension + roptSpaces + rquot + rstopCap, "g"),
      new RegExp(rstartCap + "describe\\(" + roptSpaces + rquot + roptSpaces + rstopCap + argv.old + rstartCap + roptExtension + roptSpaces + "(?:.*\s?)?" + rquot + rstopCap, "g"),
      new RegExp(rstartCap + "ng\\-app\\=" + rquot + roptSpaces + rstopCap + argv.old + rstartCap + roptSpaces + rquot + rstopCap, "g"),
      // new RegExp(rstartCap + "module" + "(?:.|[\\\r\\\n])*" + "\\[" + "(?:.|[\\\r\\\n])*" + rquot + rstopCap + argv.old + rstartCap + roptExtension + roptSpaces + rquot + rstopCap, "g")
      new RegExp(rstartCap + rquot + roptSpaces + rstopCap + argv.old + rstartCap + roptExtension + roptSpaces + rquot + rstopCap, "g")
    ]
    
    var replacement = "$1" + argv.new + "$2";
    
    gulp.src([
      bases.app + '**',
      "!" + paths.bower_components
    ], {base: './'} )
      .pipe( replace( regexps[0], replacement) )
      .pipe( replace( regexps[1], replacement) )
      .pipe( replace( regexps[2], replacement) )
      .pipe( replace( regexps[3], replacement) )
      .pipe( gulp.dest('./'))
  }
})