'use strict'

const gulp = require('gulp')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const pug = require('gulp-pug')
const htmlBeautify = require('gulp-html-beautify')
const args = require('yargs').argv
const Parcel = require('parcel-bundler')

const isGhRelease = args[`gh-release`] === true
const DEMO = `dist-demo`

////////
// LIBRARY
////////

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

////////
// DEMO
////////

function cssDemo() {
  return gulp.src([`demo/*.css`]).pipe(gulp.dest(DEMO))
}

function jsDemo() {
  const entryFiles = [
    `./demo/commonjs-example.js`,
    `./demo/esmodule-example.js`,
  ]
  const bundler = new Parcel(entryFiles, {
    outDir: `./${DEMO}`,
    watch: false,
    minify: false,
    sourceMaps: false,
  })
  return bundler.bundle()
}

function htmlDemo() {
  return gulp
    .src([`demo/*.pug`, `!demo/_*.pug`])
    .pipe(
      pug({
        locals: {
          root: isGhRelease ? `https://hiswe.github.io/vh-check` : ``,
        },
      })
    )
    .pipe(htmlBeautify({ indent_size: 2 }))
    .pipe(gulp.dest(DEMO))
}

////////
// EXPOSE TASKS
////////

gulp.task(`css`, css)
gulp.task(`demo:html`, htmlDemo)
gulp.task(`demo:js`, jsDemo)
gulp.task(`demo:css`, cssDemo)
gulp.task(`demo`, gulp.parallel(htmlDemo, jsDemo, cssDemo))
gulp.task(`default`, css)
