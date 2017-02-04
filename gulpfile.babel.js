/* eslint-disable no-console */
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import BrowserSync from 'browser-sync';
import del from 'del';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';

const $ = gulpLoadPlugins();
const browserSync = BrowserSync.create();

const srcDir = 'src';
const distDir = 'docs';

const srcPath = {
  html    : [`${srcDir}/**/*.html`],
  scripts : [`${srcDir}/js/**/*.js`],
  styles  : [`${srcDir}/less/**/*.less`],
  images  : [`${srcDir}/images/**/*.{jpg,png}`]
};

const distPath = {
  html    : [`${distDir}/**/*.html`],
  scripts : [`${distDir}/js/**/*.js`],
  styles  : [`${distDir}/css/*.css`],
  images  : [`${distDir}/images/**/*.{jpg,png}`]
};

gulp.task('serve', ['build', 'serve:init'], () => {
  gulp.watch(srcPath.html, ['build:html']);
  gulp.watch(srcPath.scripts, ['build:scripts']);
  gulp.watch(srcPath.styles, ['build:styles']);
  gulp.watch(srcPath.images, ['build:images']);

  Object.keys(distPath).forEach((type) => {
    gulp.watch(distPath[type], ['serve:reload']);
  });
});

gulp.task('serve:init', () => {
  browserSync.init({
    server: {
      baseDir: distDir,
      index: 'index.html'
    }
  });
});

gulp.task('serve:reload', () => {
  browserSync.reload();
});

gulp.task('build:html', (done) => {
  gulp.src(srcPath.html, { base: srcDir })
    .pipe(gulp.dest(distDir));
  done();
});

gulp.task('build:scripts', (done) => {
  browserify({entries: `${srcDir}/js/app.js`,extensions: ['js']})
    .transform(babelify)
    .bundle()
    .on('error', (err) => {
      console.log(`error: ${err.message}`);
    })
    .pipe($.plumber())
    .pipe(source('app.js'))
    .pipe(gulp.dest(`${distDir}/js`));
  done();
});

gulp.task('build:styles', (done) => {
  gulp.src(`${srcDir}/less/style.less`, { base: `${srcDir}/less` })
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.less())
    .pipe($.cssnano())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(`${distDir}/css`));
  done();
});

gulp.task('build:images', (done) => {
  gulp.src(srcPath.images, { base: `${srcDir}/images` })
    .pipe(gulp.dest(`${distDir}/images`));
  done();
});

gulp.task('build', ['build:html', 'build:scripts', 'build:styles', 'build:images']);

gulp.task('clean', (done) => {
  del([distDir], () => { done(); });
});
