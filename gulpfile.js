'use strict'

const gulp = require('gulp')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')

function css() {
  return gulp
    .src(`src/index.css`)
    .pipe(
      rename({
        basename: `accessible-focus-ring`,
      })
    )
    .pipe(gulp.dest(`dist`))
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: `.min`,
      })
    )
    .pipe(gulp.dest(`dist`))
}

gulp.task(`css`, css)
gulp.task(`default`, css)
