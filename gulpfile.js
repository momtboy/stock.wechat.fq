/**
 Gulpfile for gulp-webpack-demo
 created by fwon
*/

var gulp = require('gulp'),
    os = require('os'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    gulpOpen = require('gulp-open'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    md5 = require('gulp-md5-plus'),
    fileinclude = require('gulp-file-include'),
    clean = require('gulp-clean'),
    //cache = require('gulp-cache'),
    spriter = require('gulp-css-spriter'),
    rubysass = require('gulp-ruby-sass'),
    base64 = require('gulp-css-base64'),
    imagemin = require('gulp-imagemin'), // gulp-imagemin 和 imagemin-pngquant 很容易安装以后运行报错  最好执行npm安装
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    connect = require('gulp-connect');

var host = {
    path: 'dist/',
    port: 3000,
    html: 'index.html'
};

//mac chrome: "Google chrome", 
var browser = os.platform() === 'linux' ? 'Google chrome' : (
  os.platform() === 'darwin' ? 'Google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));
var pkg = require('./package.json');

//将图片压缩拷贝到目标目录
gulp.task('copy:images', function (done) {
    gulp.src(['src/images/**/*.{jpg,png,gif}'])
        .pipe(
            imagemin()
        )
        .pipe(gulp.dest('dist/images'))
        .on('end', done);
});

//将字体拷贝到目标目录
gulp.task('copy:font', function (done) {
    gulp.src(['src/fonts/**/*'])
        .pipe(gulp.dest('dist/fonts'))
        .on('end', done);
});

//压缩合并css, css中既有自己写的.sass, 也有引入第三方库的.css
/*gulp.task('sassmin', function (done) {
    gulp.src(['src/sass/mui.scss','!src/sass/mui/*.scss'])
        .pipe(sass())
        //这里可以加css sprite 让每一个css合并为一个雪碧图
        //.pipe(spriter({}))
        .pipe(concat('mui.min.css'))
        .pipe(gulp.dest('dist/css/'))
        .on('end', done);
});*/

//需要搭建ruby环境
gulp.task('rubysassmin' , () => 
    rubysass('src/sass/*.scss')
    //.pipe(spriter({}))
    .pipe(gulp.dest('dist/css/'))
)

//将js加上10位md5,并修改html中的引用路径，该动作依赖build-js
gulp.task('md5:js', ['build-js'], function (done) {
    gulp.src('dist/js/*.js')
        .pipe(md5(10, 'dist/*.html'))
        .pipe(gulp.dest('dist/js'))
        .on('end', done);
});

//将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
gulp.task('md5:css', ['sprite'], function (done) {
    gulp.src(['dist/css/*.css','!dist/css/mui.css'])
        .pipe(md5(10, 'dist/*.html'))
        .pipe(gulp.dest('dist/css'))
        .on('end', done);
});

//用于在html文件中直接include文件
gulp.task('fileinclude', function (done) {
    gulp.src(['src/*.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('dist/'))
        .on('end', done);
        // .pipe(connect.reload())
});

//雪碧图操作，应该先拷贝图片并压缩合并css
gulp.task('sprite', ['copy:images', 'rubysassmin'], function (done) {
    var timestamp = +new Date();
    gulp.src(['dist/css/*.css','!dist/css/mui.css'])
        .pipe(spriter({
            spriteSheet: 'dist/images/spritesheet' + timestamp + '.png',
            pathToSpriteSheetFromCSS: '../images/spritesheet' + timestamp + '.png',
            spritesmithOptions: {
                padding: 10
            }
        }))
        .pipe(base64())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
        .on('end', done);
});

gulp.task('clean', function (done) {
    gulp.src(['dist'])
        .pipe(clean())
        .on('end', done);
});

gulp.task('watch', function (done) {
    gulp.watch('src/**/*', ['rubysassmin', 'build-js', 'fileinclude'])
        .on('end', done);
});

gulp.task('connect', function () {
    console.log('connect------------');
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true
    });
});

gulp.task('open', function (done) {
    gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: 'http://localhost:3000/'
        }))
        .on('end', done);
});

var myDevConfig = Object.create(webpackConfig);

var devCompiler = webpack(myDevConfig);

//引用webpack对js进行操作
gulp.task("build-js", ['fileinclude'], function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
        callback();
    });
});

//发布
gulp.task('default', ['connect', 'fileinclude', 'md5:css', 'md5:js', 'open','copy:font']);

//开发
gulp.task('dev', ['connect', 'copy:images', 'fileinclude', 'rubysassmin','build-js', 'watch', 'open','copy:font']);