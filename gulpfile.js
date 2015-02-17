var gulp = require('gulp');
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var tap = require('gulp-tap');
var argv = require('yargs').argv;
var concat = require('gulp-concat');

var bases = {
  app: "app/",
  bower: "app/bower_components/",
  build: "app/build/"
}

var paths = {
  style: {
    target:     bases.build + "/target",
    sassFiles:  "app/stylesheets/*.scss",
    bootstrap:  "app/stylesheets/src/bootstrap/bootstrap.scss",
    build:      bases.build
  }
}

gulp.task('default', function() {
  
})

gulp.task('watch', function() {
  gulp.watch(paths.style.sassFiles, ['sass']);
})

gulp.task('sass', function() {
  gulp.src([paths.style.sassFiles, paths.style.bootstrap])
    .pipe(sass())
    .pipe(gulp.dest(paths.style.target))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(paths.style.build));
});

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
      "!" + bases.bower_components
    ], {base: './'} )
      .pipe( replace( regexps[0], replacement) )
      .pipe( replace( regexps[1], replacement) )
      .pipe( replace( regexps[2], replacement) )
      .pipe( replace( regexps[3], replacement) )
      .pipe( gulp.dest('./'))
  }
})