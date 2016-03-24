const gulp       = require('gulp');
const del        = require('del');
const handlebars = require('gulp-compile-handlebars');
const rename     = require('gulp-rename');
const imagemin   = require('gulp-imagemin');
const browserify = require('browserify');
const babelify   = require('babelify');
const watchify   = require('watchify');
const source     = require('vinyl-source-stream');
const buffer     = require('vinyl-buffer');
const postcss    = require('gulp-postcss');
const cssnext    = require('postcss-cssnext');
const atImport   = require('postcss-import');
const bs         = require('browser-sync').create();
const paths      = require('./paths');

const hbsOptions = {
  ignorePartials: true,
  batch: [paths.partials],
};

const hbsConfig = {
  base: './',
};

const processors = [
  atImport,
  cssnext,
];

gulp.task('clean', () => {
  return del(paths.build);
});

gulp.task('handlebars', () => {
  return gulp.src(paths.viewSrc)
    .pipe(handlebars(hbsConfig, hbsOptions))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(paths.build + '/'))
    .pipe(bs.stream());
});

// Transpile JavaScript through Browserify with Babel
const bundler = watchify(browserify(paths.js.src, watchify.args));

function bundle() {
  return bundler
    .transform(babelify)
    .bundle()
    .pipe(source('./bundle.js'))
      .pipe(buffer())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(bs.stream());
};

bundler.on('update', bundle);
gulp.task('scripts', bundle);

gulp.task('styles', () => {
  return gulp.src(paths.cssSrc)
    .pipe(postcss(processors))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest(paths.build + '/assets/styles/'))
    .pipe(bs.stream());
});

gulp.task('images', () => {
  return gulp.src(paths.img)
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{ removeViewBox: false }],
  }))
  .pipe(gulp.dest(paths.build + '/assets/images/'));
});

gulp.task('connect', () => {
  bs.init({
    server: {
      baseDir: paths.build,
    },
  });
});

gulp.task('watch', () => {
  gulp.watch([paths.cssSrc, paths.cssLib], ['styles']);
  gulp.watch([paths.viewSrc, paths.partials + '*'], ['handlebars']);
});

gulp.task('build', ['handlebars', 'styles', 'scripts', 'images']);
gulp.task('default', ['build', 'watch', 'connect']);
