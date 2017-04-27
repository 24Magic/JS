 var gulp = require('gulp');
 //引入组件
 var minifycss = require('gulp-minify-css'), //css压缩
     concat = require('gulp-concat'), //合并文件
     minhtml = require('gulp-htmlmin') //html压缩

 gulp.task('html', function() {
     return gulp.src('src/index.html').pipe(minhtml({
         collapseWhitespace: true
     })).pipe(gulp.dest('dist'))
 });

 gulp.task('css', function(argument) {
     gulp.src(['src/css/index.css', 'src/css/reset.css']).pipe(concat('merge.css')).pipe(minifycss()).pipe(gulp.dest('dist/css'))
 });

 gulp.task('build', ['html', 'css'])