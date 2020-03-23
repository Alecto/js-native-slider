require('../../gulp/gulp-init.js')({HTML: '.'});

const comb = require('../../gulp/tasks/comb');
const cs = require('../../gulp/tasks/create-structure');
const {scss, scssDev} = require('../../gulp/tasks/scss.js');
const mincss = require('../../gulp/tasks/mincss');
const uglifyes = require('../../gulp/tasks/uglify').uglifyes;
const {sync, syncInit} = require('../../gulp/tasks/sync');

function watchFiles() {
  syncInit();
  watch($.PATH.scss.files, series(scss));
  watch([
    $.PATH.js.files,
    `!${$.PATH.js.filesMin}`
  ], sync);
  watch($.PATH.html.files, sync);
}

task('cs', cs);
task('combScss', comb);
task('uglifyEs6', series(uglifyes, sync));
task('sass', series(scss));
task('sassDev', series(scssDev));
task('watch', watchFiles);
