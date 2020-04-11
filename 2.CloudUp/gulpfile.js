let gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del');

//===== Task Clean
gulp.task('clean', async function(){
    del.sync('dist')
});

//===== Task SCSS to CSS
gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({browsers:['last 8 versions']}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

//===== Task for Normalize
gulp.task('css-normalize', function(){
    return gulp.src([
        'node_modules/node-normalize-scss/_normalize.scss'
    ])
        .pipe(gulp.dest('app/scss'))
        .pipe(browserSync.reload({stream: true}))
});

//===== Task HTML sync
gulp.task('html', function(){
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}))
});

//=====  Task JS sync
gulp.task('script', function(){
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({stream: true}))
});

//===== Task Browser-Sync Init
gulp.task('browser-sync', function(){
   browserSync.init({
       server:{
           baseDir: 'app/'
       }
   });
});


//===== Task for export
gulp.task('export', async function(){
   let buildHtml = gulp.src('app/**/*.html')
       .pipe(gulp.dest('dist'))
    let buildCss = gulp.src('app/**/*.css')
        .pipe(gulp.dest('dist'))
    let buildJS = gulp.src('app/**/*.js')
        .pipe(gulp.dest('dist'))
    let buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
    let buildImg = gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'))
});

//===== Task for watching
gulp.task('watch', function(){
   gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
   gulp.watch('app/**/*.html', gulp.parallel('html'));
   gulp.watch('app/js/*.js', gulp.parallel('script'));
});

//===== Task for Building Dist
gulp.task('build', gulp.series('clean','export'));

//===== Default Task
gulp.task('default', gulp.parallel('css-normalize','scss', 'browser-sync','watch'));
