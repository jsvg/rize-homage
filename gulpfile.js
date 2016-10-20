var gulp          = require('gulp');
var plugins       = require('gulp-load-plugins')();
var merge         = require('merge2');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();

// inputs
var sourceDir         = 'src/';
var entryJS           = sourceDir + 'app/app.js';
var entryHTML         = sourceDir + 'index.html';
var assetsDir         = sourceDir + 'assets/';
var templateCacheDir  = sourceDir + 'app/config/';
var templateCacheName = 'app.templates.js';

// outputs
var sourceMapsDir = 'maps/';
var buildDir      = 'build/';
var distDir       = 'dist/';
var assetsDist    = 'assets/';
var jsBundleName  = 'main.js';
var cssBundleName = 'main.css';

// watches
var scssFiles = sourceDir + 'styles/**/*.scss';
var jsFiles   = sourceDir + 'app/**/*.js';
var viewFiles = sourceDir + 'app/**/*.html';

// helpers
var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);
  plugins.notify.onError({
    title: 'Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end');
};

// tasks
gulp.task('js', ['views'], function() {
  return browserify(entryJS)
    .transform(babelify, {presets: ['es2015']})
    .transform(ngAnnotate)
    .bundle()
    .on('error', interceptErrors)
    .pipe(source(jsBundleName))
    .pipe(gulp.dest(buildDir));
});

gulp.task('scss', function() {
  return gulp.src(scssFiles)
    .pipe(plugins.size({ title: 'SCSS pre-comp' }))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .on('error', interceptErrors)
    .pipe(plugins.sourcemaps.write())
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(buildDir))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  return gulp.src(entryHTML)
    .pipe(plugins.size({ title: 'Index.html' }))
    .on('error', interceptErrors)
    .pipe(gulp.dest(buildDir));
});

gulp.task('views', function() {
  return gulp.src(viewFiles)
    .pipe(plugins.size({ title: 'Views pre-comp' }))
    .pipe(plugins.minifyHtml({ empty: true }))
    .pipe(plugins.size({ title: 'Views post-comp' }))
    .pipe(plugins.angularTemplatecache({ standalone: true }))
    .on('error', interceptErrors)
    .pipe(plugins.rename(templateCacheName))
    .pipe(gulp.dest(templateCacheDir));
});

// asset compilation
gulp.task('copy-assets', function() {
  return gulp.src(assetsDir + '**/*')
    .pipe(gulp.dest(buildDir + assetsDist))
});

gulp.task('copy-assets-build', function() {
  return gulp.src(assetsDir + '**/*')
    .pipe(gulp.dest(distDir + assetsDist))
});

// linters
gulp.task('scsslint', function() {
  return gulp.src(scssFiles)
    .pipe(plugins.scssLint())
    .pipe(plugins.scssLint.failReporter())
    .on('error', interceptErrors);
});

gulp.task('htmlhint', function() {
  return gulp.src([viewFiles])
    .pipe(plugins.htmlhint({ 'doctype-first': false }))
    .pipe(plugins.htmlhint.failReporter())
    .on('error', interceptErrors);
});

gulp.task('eslint', function() {
  return gulp.src([jsFiles])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError())
    .on('error', interceptErrors);
});

// shortcuts
gulp.task('lint', ['scsslint', 'htmlhint', 'eslint']);
gulp.task('demodularize', ['scss', 'html', 'js']);

// end-processes
gulp.task('build', ['copy-assets-build', 'demodularize'], function() {
  var html = gulp.src(buildDir + 'index.html')
    .pipe(gulp.dest(distDir));

  var js = gulp.src(buildDir + jsBundleName)
    .pipe(plugins.uglify())
    .pipe(plugins.rename(jsBundleName))
    .pipe(gulp.dest(distDir));

  var css = gulp.src(buildDir + cssBundleName)
    .pipe(plugins.cleanCSS({ debug: true, keepSpecialComments: 0 }))
    .pipe(gulp.dest(distDir));

  browserSync.init({
    server: distDir,
    port: 5000,
    notify: false,
    ui: {
      port: 5001
    }
  });

  return merge(html, js);
});

gulp.task('build-serverless', ['copy-assets-build', 'demodularize'], function() {
  var html = gulp.src(buildDir + 'index.html')
    .pipe(gulp.dest(distDir));

  var js = gulp.src(buildDir + jsBundleName)
    .pipe(plugins.uglify())
    .pipe(plugins.rename(jsBundleName))
    .pipe(gulp.dest(distDir));

  var css = gulp.src(buildDir + cssBundleName)
    .pipe(plugins.cleanCSS({ debug: true, keepSpecialComments: 0 }))
    .pipe(gulp.dest(distDir));

  return merge(html, js);
});

gulp.task('default', ['copy-assets', 'demodularize', 'lint'], function() {
  browserSync.init([buildDir + '**/**.**'], {
    server: buildDir,
    port: 4000,
    notify: false,
    ui: {
      port: 4001
    }
  });

  gulp.watch(scssFiles, ['scss', 'scsslint']);
  gulp.watch(entryHTML, ['html', 'htmlhint']);
  gulp.watch(viewFiles, ['views', 'htmlhint']);
  gulp.watch(jsFiles, ['js', 'eslint']);
});
