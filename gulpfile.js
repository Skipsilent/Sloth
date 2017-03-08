// 载入外挂
var gulp = require('gulp'),  
 jshint = require('gulp-jshint'),
 uglify = require('gulp-uglify'),
 rename = require('gulp-rename'),
 minifycss = require('gulp-minify-css'),
 clean = require('gulp-clean'),
 concat = require('gulp-concat'),
 notify = require('gulp-notify'),
 cache = require('gulp-cache'),
 livereload = require('gulp-livereload'),
 less = require('gulp-less'),
 plumber = require('gulp-plumber'),
LessPluginAutoPrefix = require('less-plugin-autoprefix');;

var autoprefix = new LessPluginAutoPrefix({
    browsers: ["last 5 versions"],
    cascade: true
});
// 样式
gulp.task('less',function(){
   return gulp.src('./src/styles/*.less')
    .pipe(plumber({errorHandler:notify.onError('Error:less--<%= error.message.split("less")[1] %>')}))
    .pipe(less({
        plugins: [autoprefix]
    }))
     .pipe(concat('Sloth-0.0.3.css'))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/styles'));
})
// 脚本
gulp.task('scripts', function() {  
return gulp.src('./src/scripts/**/*.js')
 .pipe(plumber({errorHandler:notify.onError('Error:js--<%= error.message%>')}))
 .pipe(jshint('jshintrc'))
 .pipe(jshint.reporter('default'))
 .pipe(gulp.dest('./dist/scripts/src'))
 //.pipe(rename({ suffix: '.min' }))
 //.pipe(uglify())
 //.pipe(gulp.dest('./dist/scripts/src'))
 .pipe(concat('Sloth-0.0.3.js'))
 .pipe(gulp.dest('./dist/scripts'))
 .pipe(rename({ suffix: '.min' }))
 .pipe(uglify())
 .pipe(gulp.dest('./dist/scripts'))
 .pipe(notify({ message: 'Scripts task complete' }));
});
// 清理
gulp.task('clean', function() {  
return gulp.src(['dist/styles', 'dist/scripts'], {read: false})
 .pipe(clean());
});
// 预设任务
gulp.task('default', ['clean'], function() {  
 gulp.start('less', 'scripts');
});
// 看手
gulp.task('watch', function() {
    // 看守所有.less档
 gulp.watch('src/**/*.less', ['less']);
// 看守所有.scss档
//gulp.watch('src/styles/**/*.scss', ['styles']);
// 看守所有.js档
gulp.watch('src/scripts/**/*.js', ['scripts']);
// 看守所有图片档
//gulp.watch('src/images/**/*', ['images']);
// 建立即时重整伺服器
//var server = livereload();
// 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
//gulp.watch(['www/dist/**']).on('change', function(file) {
 //server.changed(file.path);
//});
});