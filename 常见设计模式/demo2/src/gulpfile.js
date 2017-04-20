 var gulp = require('gulp');
 //引入组件
 var minifycss = require('gulp-minify-css'), //css压缩
     concat = require('gulp-concat'), //合并文件
     minhtml = require('gulp-htmlmin'), //html压缩
     imagemin = require('gulp-imagemin'); //图片压缩

 gulp.task('html', function() {
     return gulp.src('index.html').pipe(minhtml({
         collapseWhitespace: true
     })).pipe(gulp.dest('../dist'))
 });

 gulp.task('css', function(argument) {
     gulp.src('css/*.css').pipe(concat('merge.css')).pipe(minifycss()).pipe(gulp.dest('../dist/css'))
 });

 gulp.task('img', function(argument) {
     gulp.src('imgs/*.jpg').pipe(imagemin()).pipe(gulp.dest('../dist/imgs'))
 })

 gulp.task('build', ['html', 'css', 'img'])