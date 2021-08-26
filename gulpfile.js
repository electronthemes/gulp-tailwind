const { series, dest, src, watch } = require("gulp");
const twig = require("gulp-twig");
const sass = require("gulp-sass");
const sourcemap = require("gulp-sourcemaps");
const browsersync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const postcss = require("gulp-postcss");

// Template engine twig
function templateTask() {
  return src("./src/*.twig").pipe(twig()).pipe(dest("dist"));
}

function htmlTask() {
  return src("./src/*.html").pipe(dest("dist"));
}

// SCSS Styles
function styleTask() {
  return src("./src/assets/scss/*.scss")
    .pipe(sourcemap.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(sourcemap.write("."))
    .pipe(dest("dist/assets/css"))
    .pipe(browsersync.stream());
}

function postcssTask() {
  return src("./dist/assets/css/*.css")
    .pipe(postcss())
    .pipe(sourcemap.write("."))
    .pipe(dest("dist/assets/css"))
    .pipe(browsersync.stream());
}

// CSS Styles
function cssPluginTask() {
  return src("./src/assets/css/*.css")
    .pipe(concat("plugins.min.css"))
    .pipe(dest("dist/assets/css"));
}
// CSS Styles
function videoTask() {
  return src("./src/assets/video/**").pipe(dest("dist/assets/video"));
}

// Image asssets
function imageTask() {
  return src("./src/assets/img/**").pipe(dest("dist/assets/img"));
}

// js asssets
function jsPluginsTask() {
  return src(["./src/assets/js/**/*.js", "!src/assets/js/scripts.js"])
    .pipe(concat("app.min.js"))
    .pipe(uglify())
    .pipe(dest("dist/assets/js"));
}

// Custom JS task
function customJsTask() {
  return src("src/assets/js/scripts.js").pipe(dest("dist/assets/js"));
}

// Fonts file
function custonFonts() {
  return src("src/assets/fonts/**").pipe(dest("dist/assets/fonts"));
}

// Live reload browsersync
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: "./dist",
    },
  });
  cb();
}

// zipper
function zipper(done) {
  const filename = require("./package.json").name + ".zip";

  pump(
    [
      src([
        "**",
        "!node_modules",
        "!node_modules/**",
        "!dist",
        "!dist/**",
        "!yarn-error.log",
      ]),
      zip(filename),
      dest("dist/"),
    ],
    handleError(done)
  );
}

// Watch all files
function watcher() {
  watch("./src/**/*.html").on("change", series(htmlTask, browsersync.reload));
  watch("./src/assets/img/**", imageTask);
  watch("./src/assets/js/**/*.js", jsPluginsTask);
  watch("./src/assets/js/scripts.js", customJsTask);
  watch("./src/assets/css/*.css", cssPluginTask);
  watch("./src/assets/scss/**/*.scss", styleTask);
  watch("./src/assets/fonts/**", custonFonts);
  watch("./src/assets/video/**", videoTask);
}
const build = series(
  htmlTask,
  styleTask,
  cssPluginTask,
  postcssTask,
  videoTask,
  imageTask,
  jsPluginsTask,
  customJsTask,
  custonFonts
);

exports.zip = series(build, zipper);
exports.build = build;
exports.default = series(build, browsersyncServe, watcher);
