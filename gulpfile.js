'use strict';

const { task,
    series,
    parallel,
    src,
    dest,
    watch }    = require('gulp'),
  sass         = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  gcmq         = require('gulp-group-css-media-queries'),
  sourcemaps   = require('gulp-sourcemaps'),
  notify       = require('gulp-notify'),
  gutil        = require('gulp-util'),
  ftp          = require('vinyl-ftp'),
  cleanCSS     = require('gulp-clean-css'),
  rename       = require('gulp-rename'),
  uglify       = require('gulp-uglify-es').default,
  concat       = require('gulp-concat'),
  del          = require('del'),
  csscomb      = require('gulp-csscomb'),
  changed      = require('gulp-changed'),
  gulpif       = require('gulp-if'),
  browserSync  = require('browser-sync');


const SCSS = './assets/scss',
  CSS  = './assets/css',
  HTML = '.',
  PHP  = './php',
  JS   = './assets/js',
  TEMP = './temp';

const path = {
  scss: {
    folder: SCSS + '/',
    files: SCSS + '/**/*.scss',
    combFolder: SCSS + '-comb/',
    combFiles: SCSS + '-comb/**/*.scss',
  },
  css: {
    folder: CSS + '/',
    files: CSS + '/**/*.css',
    filesMin: CSS + '/**/*.min.css',
    mapFolder: CSS + '/',
    mapFiles: CSS + '/**/*.map',
  },
  html: {
    folder: HTML + '/',
    files: HTML + '/**/*.html',
  },
  php: {
    folder: PHP + '/',
    files: PHP + '/**/*.php',
  },
  js: {
    folder: JS + '/',
    files: JS + '/**/*.js',
    filesMin: JS + '/**/*.min.js',
  },
  tmp: {
    dist: TEMP + '/dist/',
    temp: TEMP + '/temp/',
    upld: TEMP + '/upload/'
  }
};

function comb () {
  return src(path.scss.files)
    .pipe(csscomb('.csscomb.json')
      .on("error", notify.onError(function (error) {
        return "File: " + error.message;
      })))
    .pipe(dest(path.scss.folder)
      .on('end', () => { if (true) console.log('   ---------------   completed COMB'); }));
}

function scss () {
  return src(path.scss.combFiles)
    .pipe(sourcemaps.init())
    .pipe(csscomb('.csscomb.json')
      .on("error", notify.onError(function (error) {
        return "File: " + error.message;
      })))
    .pipe(sass()
      .on("error", notify.onError(function (error) {
        return "File: " + error.message;
      })))
    .pipe(gcmq())
    .pipe(autoprefixer({ browsers: ['last 5 versions', '> 1%'], cascade: true }))
    .pipe(notify({ message: 'Compiled!', sound: false }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(path.css.folder)
      .on('end', () => { if(true) console.log('   ---------------   completed SCSS'); } ))
    .pipe(browserSync.reload({stream: true}));
}

function mincss () {
  return src([path.css.files,
    '!' + path.css.filesMin
  ])
    .pipe(cleanCSS({ specialComments: 'false' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(path.css.folder)
      .on('end', () => { if(true) console.log('   ---------------   completed MINIFY (.min.css)'); }));
}

function minjs () {
  return src([path.js.files, '!' + path.js.filesMin])
    .pipe(uglify({
      toplevel: true,
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(path.js.folder)
      .on('end', () => { if(true) console.log('   ---------------   completed UGLIFY (.min.js)'); }));
}

function concatjs () {
  return src([
    path.js.folder + 'highslide/highslide-full.min.js',
    path.js.folder + 'highslide/highslide.config.min.js',
    path.js.folder + 'highslide/highslide.init.min.js'
  ])
    .pipe(concat('highslide.min.js'))
    .pipe(dest(path.js.folder)
      .on('end', () => { if(true) console.log('   ---------------   completed successfully   ---   CONCAT'); }));
}

async function sync () {
  browserSync.reload();
}

function watchFiles() {
  browserSync({
    server: {
      baseDir: './'
    },
    notify: false
  });

  watch(path.scss.files, series(scss, mincss));
  watch([path.js.files, '!' + path.js.filesMin], series(minjs, sync));
  watch(path.html.files, sync);
}

task('watch', watchFiles);
task('combSCSSonly', comb);
