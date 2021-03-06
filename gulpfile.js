'use strict'

const gulp = require('gulp')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const pug = require('gulp-pug')
const through = require('through2')
const beautify = require('js-beautify')
const args = require('yargs').argv
const Parcel = require('parcel-bundler')
const size = require('gulp-size')
const sass = require('gulp-sass')

const isGhRelease = args[`gh-release`] === true
const DEMO = `dist-demo`

////////
// LIBRARY
////////

function libCss() {
  return gulp
    .src(`src/focus-ring.scss`)
    .pipe(gulp.dest(`dist`))
    .pipe(sass())
    .pipe(rename({ extname: `.css` }))
    .pipe(gulp.dest(`dist`))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: `.min` }))
    .pipe(gulp.dest(`dist`))
}

const libMin = `dist/focus-ring.min.*`
const sOpts = { name: `regular`, showFiles: true }
const libSizeMin = () => gulp.src(libMin).pipe(size(sOpts))
const libSizeGzip = () => gulp.src(libMin).pipe(size({ ...sOpts, gzip: true }))
const libSize = gulp.series(libSizeMin, libSizeGzip)

////////
// DEMO
////////

function cssDemo() {
  return gulp.src([`src-demo/*.css`, `dist/*.css`]).pipe(gulp.dest(DEMO))
}

function jsDemo() {
  const entryFiles = [
    `./src-demo/commonjs-example.js`,
    `./src-demo/esmodule-example.ts`,
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
    .src([`src-demo/*.pug`, `!src-demo/_*.pug`])
    .pipe(
      pug({
        locals: {
          root: isGhRelease
            ? `https://hiswe.github.io/accessible-focus-ring`
            : ``,
        },
      })
    )
    .pipe(beautifyHtml({}))
    .pipe(gulp.dest(DEMO))
}

function watchDemo(done) {
  gulp.watch(`index/*.css`, libCss)
  gulp.watch(`src-demo/*.pug`, htmlDemo)
  gulp.watch([`src-demo/*.css`, `dist/*.css`], cssDemo)
  gulp.watch(`src-demo/*.js`, jsDemo)
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
gulp.task(`size`, libSize)
