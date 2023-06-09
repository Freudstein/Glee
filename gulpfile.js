const {src, dest, watch, parallel, series} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const plumber = require('gulp-plumber');
const csso = require('gulp-csso');
const fileInclude = require('gulp-file-include');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');

// HTML
function html(){
    return src('src/*.html')
    .pipe(plumber())
    .pipe(fileInclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(dest('dist/'))
    .pipe(browserSync.reload({stream: true}));
}

// SCSS -> CSS
function style(){
    return src('src/scss/style.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(scss()).on('error', scss.logError)
    .pipe(autoprefixer())
    .pipe(concat('style.css'))  
    .pipe(dest('dist/css/'))
    .pipe(csso())
    .pipe(concat('style.min.css'))
    .pipe(dest('dist/css/'))
    .pipe(browserSync.reload({stream: true}));
}

// JS
function script(){
    return src([
        'node_modules/swiper/swiper-bundle.js',
        'node_modules/mixitup/dist/mixitup.js',
        'src/js/nouislider.js',
        'src/js/app.js'
    ])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
    .pipe(browserSync.reload({stream: true}));
}

// IMAGES
function imagesB(){
    return src('src/img/**/*.*')
    .pipe(plumber())
	.pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 90, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
	.pipe(dest('dist/img'))
}

function imagesD(){
    return src('src/img/**/*.{png,svg,jpg,ico,webp,gif}')
	.pipe(dest('dist/img'))
    .pipe(browserSync.reload({stream: true}));
}

// WATCHER
function watcher(){
    watch(['src/**/*.html'], html);
    watch(['src/scss/style.scss'], style);
    watch(['src/js/app.js'], script);
    watch(['src/img/**/*.*'], imagesD);    
}

function browsersync(){
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
}

function cleaner(){
    return src('dist', {allowEmpty: true})
    .pipe(plumber())
    .pipe(clean())
}

function moveFiles(){
    return src([
        'src/fonts/*.*',
        'src/files/*.*'
    ], { base: 'src'})
    .pipe(plumber())
    .pipe(dest('dist'))
}

exports.html = html;
exports.style = style;
exports.script = script;
exports.imagesB = imagesB;
exports.imagesD = imagesD;

exports.watcher = watcher;
exports.browsersync = browsersync;

exports.build = series(cleaner, parallel(html, style, script, imagesB, moveFiles));
exports.default = series(cleaner, parallel(html, style, script, imagesD, moveFiles, browsersync, watcher));

// SERVICE INFO

/*
In order to use several src's write this:

return src([
    'src/scss/style.scss',
    '--your path--'
])

In order to exclude src from processing:

'!src/scss/style.scss',
*/