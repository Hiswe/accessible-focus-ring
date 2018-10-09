'use strict'

const gulp = require('gulp')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const pug = require('gulp-pug')
const through = require('through2')
const beautify = require('js-beautify')
const args = require('yargs').argv
const Parcel = require('parcel-bundler')

const isGhRelease = args[`gh-release`] === true
const DEMO = `dist-demo`

////////
// LIBRARY
////////

function libCss() {
  return gulp
    .src(`src/index.css`)
    .pipe(
      rename({
        basename: `focus-ring`,
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
  return gulp.src([`demo/*.css`, `dist/*.css`]).pipe(gulp.dest(DEMO))
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

function beautifyHtml(opts = {}) {
  function modifyFile(file, enc, cb) {
    if (file.isNull()) return cb(null, file) // pass along
    if (file.isStream()) {
      return cb(new Error(`gulp-beautify: Streaming not supported`))
    }
    var str = file.contents.toString(`utf8`)
    file.contents = new Buffer.from(beautify.html(str, opts))
    cb(null, file)
  }

  return through.obj(modifyFile)
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
    .pipe(beautifyHtml({}))
    .pipe(gulp.dest(DEMO))
}

function watchDemo(done) {
  gulp.watch(`index/*.css`, libCss)
  gulp.watch(`demo/*.pug`, htmlDemo)
  gulp.watch([`demo/*.css`, `dist/*.css`], cssDemo)
  gulp.watch(`demo/*.js`, jsDemo)
  done()
}

////////
// EXPOSE TASKS
////////

const buildDemo = gulp.parallel(htmlDemo, jsDemo, cssDemo)
buildDemo.displayName = `build-demo`

gulp.task(`css`, libCss)
gulp.task(`demo:html`, htmlDemo)
gulp.task(`demo:js`, jsDemo)
gulp.task(`demo:css`, cssDemo)
gulp.task(`demo`, buildDemo)
gulp.task(`demo:watch`, watchDemo)
gulp.task(`default`, libCss)