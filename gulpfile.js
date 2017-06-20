var gulp=require('gulp');
var stylus=require('gulp-stylus');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var rename = require('gulp-rename');
var yoyoify = require('yo-yoify-standalone');
var babelify   = require('babelify');
var buffer     = require('vinyl-buffer');





gulp.task('build:js', function () {
  return browserify("./dev/js/index.js")
  .transform("babelify", {presets: ["es2015"]})
  .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(rename('app.js'))
    .pipe(gulp.dest('assets/js/'));
});


gulp.task('stylus',function(){
	 gulp.src('dev/stylus/estilo.styl')
	 .pipe(stylus({
	 	'include css':true
	 }))
	 .pipe(gulp.dest('assets/css/'));
});



function compile(watch) {
  var bundle = watchify(browserify('./dev/js/index.js'));

  function rebundle() {
    bundle
      .transform("babelify", {presets: ["es2015"]})
      .bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(rename('app.js'))
      .pipe(gulp.dest('assets/js/'));
  }

  if (watch) {
    bundle.on('update', function () {
      console.log('--> Bundling...');
      rebundle();
    });
  }

  rebundle();
}

gulp.task('build', function () {
  return compile();
});

gulp.task('watch', function () { return compile(true); });

/*
gulp.task('templates',function(){

  yoyoify('dev/js/yoyoTemplates/tables/head/table.js','dev/js/templates/tables/head/table.js');
  yoyoify('dev/js/yoyoTemplates/tables/body/bodyTable.js','dev/js/templates/tables/body/bodyTable.js');

yoyoify('dev/js/yoyoTemplates/forms/insert/Caracteres.js','dev/js/templates/forms/insert/Caracteres.js');
yoyoify('dev/js/yoyoTemplates/forms/update/Caracteres.js','dev/js/templates/forms/update/Caracteres.js');
yoyoify('dev/js/yoyoTemplates/forms/insert/Acciones.js','dev/js/templates/forms/insert/Acciones.js');
yoyoify('dev/js/yoyoTemplates/forms/update/Acciones.js','dev/js/templates/forms/update/Acciones.js');
yoyoify('dev/js/yoyoTemplates/forms/insert/SubTiposDocumentos.js','dev/js/templates/forms/insert/SubTiposDocumentos.js');
yoyoify('dev/js/yoyoTemplates/forms/update/SubTiposDocumentos.js','dev/js/templates/forms/update/SubTiposDocumentos.js');
yoyoify('dev/js/yoyoTemplates/forms/insert/Volantes.js','dev/js/templates/forms/insert/Volantes.js');
yoyoify('dev/js/yoyoTemplates/forms/update/Volantes.js','dev/js/templates/forms/update/Volantes.js');


});
*/

gulp.task('default',['stylus','build:js']);