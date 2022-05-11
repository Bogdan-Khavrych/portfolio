const { src, dest, watch, parallel, series } = require('gulp');

const scss       = require('gulp-sass')(require('sass')),
    concat       = require('gulp-concat'),
    browserSync  = require('browser-sync').create(),
    uglify       = require('gulp-uglify-es').default,
    autoprefixer = require('gulp-autoprefixer'),
    clean        = require('gulp-clean'),
    fileinclude  = require('gulp-file-include');



    
function html(){
    src(['src/_index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(concat('index.html'))
    .pipe(dest('./src'))
    

    .pipe(browserSync.stream());
}

function styles(){
    return src(['src/scss/style.scss', 'src/scss/media.scss'])
    .pipe(autoprefixer({
        overrideBrowserslist:  ['last 10 versions'],
        grid: true,
    }))
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(dest('src/css'))

    .pipe(browserSync.stream());
}

function scripts(){
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        'src/js/main.js',
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js'))

    .pipe(browserSync.stream());
}

function server(){
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
}

function watching(){
    watch(['src/_*.html']).on('change', html)
    watch(['src/scss/**/*.scss'], styles)
    watch(['src/js/**/*.js', '!src/js/**/*.min.js'], scripts);
}

function cleanDist(){
    return src('dist', {read: false})
    .pipe(clean())
}

function make(){
    return src([
        'src/css/**/*',
        'src/en/**/*',
        'src/uk/**/*',
        'src/favicon/**/*',
        'src/fonts/**/*',
        'src/images/**/*',
        'src/js/**/*',
        '!src/js/**/_*.js',
        '!src/js/**/main.js',
        'src/*.html',
        '!src/_*.html',
        'src/*.ico'
    ], {base: 'src'})

    .pipe(dest('dist/'))
}

function images(){
    return src('dist/images/**/*')


    .pipe(imagemin())
    .pipe(dest('dist/images/'))

}



exports.styles      = styles;
exports.scripts     = scripts;
exports.server      = server;
exports.watching    = watching;
exports.cleanDist = cleanDist;
exports.images      = images;
exports.make        = make;

exports.build       = series(cleanDist, make);
exports.default     = parallel(watching, server);