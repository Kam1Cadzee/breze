var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});
gulp.task('bs-reload', function () {
  browserSync.reload();
});
gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});


gulp.task('autoprefix', function () {
  return gulp.src('css/style.css')
    .pipe(autoprefix({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css'))
    .pipe(reload({stream:true}));
});
gulp.task('html', function(){
  gulp.src('index.html')
    .pipe(reload({stream:true}));
});
gulp.task('watch', function () {
  gulp.watch('src/scss/*.scss', ['sass']);
  //gulp.watch('css/style.css', ['autoprefix']);
  gulp.watch('index.html', ['html']);
});

gulp.task('default', ['watch', 'browser-sync']);
