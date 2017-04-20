'use strict';

var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    includer = require("gulp-x-includer"),
    browserSync = require('browser-sync'),
    cleanCSS = require('gulp-clean-css'),
    watch = require('gulp-watch'),
    newer = require('gulp-newer'),
    rename = require('gulp-rename'),
    svgSprite = require('gulp-svg-sprites'),
    iconify = require('gulp-iconify'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    create = browserSync.create(),
    reload = browserSync.reload,
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    path = require('path'),
    gulpHtmlVersion = require('gulp-html-version');

gulp.task('versions', function() {
    return gulp.src('./build/*.html')
        .pipe(gulpHtmlVersion())
        .pipe(gulp.dest('./build/'));
});

gulp.task('svgstore', function () {
    return gulp
        .src('./source/icons/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('./build/img'));
});


var path = {
        build: { //Тут мы укажем куда складывать готовые после сборки файлы
            html: './build/',
            js: './build/js/',
            css: './build/css/',
            img: './build/img/',
            maps: '../maps/',
            fonts: './build/fonts/'
        },
        src: { //Пути откуда брать исходники
            html: './src/html/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
            js: './src/js/*.js',//В стилях и скриптах нам понадобятся только main файлы
            css: './src/css/*.scss',
            img: './src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
            fonts: './src/fonts/**/*.*'
        },
        watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
            html: './src/html/**/*.html',
            js: './src/js/**/*.js',
            css: './src/css/**/*.scss',
            img: './src/img/**/*.*',
            fonts: './src/fonts/**/*.*'
        },
        clean: './build'
    },
    config = {
        server: {
            baseDir: "./build"
        },
        tunnel: false,
        host: 'localhost',
        port: 9005,
        logPrefix: "frontend",
        devBaseUrl: 'http://localhost'
    };

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('iconify', function () {
    iconify({
        src: './source/icons/*.svg',
        scssOutput: './src/css/common',
        cssOutput: './test/css',
        defaultWidth: '300px',
        defaultHeight: '200px',
        svgoOptions: {
            enabled: true,
            options: {
                plugins: [
                    {removeUnknownsAndDefaults: false},
                    {mergePaths: false}
                ]
            }
        },
        svg2pngOptions: {
            scaling: 1.0,
            verbose: true,
            concurrency: null
        }
    });
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(includer()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений*/
});

gulp.task('img:build', function (cb) {
    gulp.src(path.src.img) //Выберем файлы по нужному пути
        .pipe(newer(path.build.img))
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.img))//Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('css:build', function () {
    gulp.src(path.src.css) //Выберем наш main.scss
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError)) //Скомпилируем
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        })) //Добавим вендорные префиксы
        .pipe(sourcemaps.write(path.build.maps, {
            addComment: true
        }))
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'css:build',
    'fonts:build',
    'img:build'
]);

gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], function (event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('img:build');
    });
});

gulp.task('default', ['build', 'webserver', 'watch']);
