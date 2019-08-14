var gulp = require("gulp");
var { watch, series, parallel } = require("gulp");

// Styles
var sass = require("gulp-sass");
var prefix = require("gulp-autoprefixer");
var minifyCss = require("gulp-cssnano");

// scripts
var concat = require("gulp-concat");
var minifyJs = require("gulp-terser");

// images
var imagemin = require("gulp-imagemin");
var newer = require("gulp-changed");

// rename
var rename = require("gulp-rename");

// BrowserSync
var browserSync = require("browser-sync");

var paths = {
  input: "src/",
  output: "dist/",
  reload: "./dist/"
};

var style = function(done) {
  gulp
    .src("src/scss/style.scss")
    .pipe(
      sass({
        outputStyle: "expanded",
        sourceComments: true
      }).on("error", sass.logError)
    )
    .pipe(
      prefix({
        overrideBrowserslist: ["last 2 version", "> 1%"],
        cascade: true,
        remove: true
      })
    )
    .pipe(
      minifyCss({
        discardComments: {
          removeAll: true
        }
      })
    )
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("dist/css"));
  done();
};

var copy = function(done) {
  gulp.src("./src/js/vendor/*.js").pipe(gulp.dest("dist/js/vendor/"));
  done();
};
var script = function(done) {
  gulp
    .src("src/js/*.js")
    .pipe(concat("script.js"))
    .pipe(minifyJs())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("dist/js"));
  done();
};

var image = function(done) {
  gulp
    .src("src/img/*")
    .pipe(newer("dist/img"))
    .pipe(
      imagemin([
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 6 })
      ])
    )
    .pipe(gulp.dest("dist/img"));
  done();
};

// Watch for changes to the src directory
var startServer = function(done) {
  // Initialize BrowserSync
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  // Signal completion
  done();
};

// Reload the browser when files change
var reloadBrowser = function(done) {
  browserSync.reload();
  done();
};

// Watch for changes
var watchSource = function(done) {
  watch(paths.input, series(exports.default, reloadBrowser));
  watch("**/*.html", series(exports.default, reloadBrowser));
  done();
};

// Default task
exports.default = series(parallel(style, script, image, copy));

// Watch and reload
exports.watch = series(exports.default, startServer, watchSource);
