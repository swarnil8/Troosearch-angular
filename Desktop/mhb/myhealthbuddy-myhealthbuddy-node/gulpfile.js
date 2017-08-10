var gulp      = require('gulp'),
    useref    = require('gulp-useref'),
    gulpif    = require('gulp-if'),
    uglify    = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    concat    = require('gulp-concat'),
    obfuscate = require('./obfuscate.js'),
    fs        = require('fs'),
    compressor = require('node-minify'),
    rename = require('gulp-rename'),
    gulpSequence = require('gulp-sequence'),
    templateCache = require('gulp-angular-templatecache'),
    rev    = require('gulp-rev'),
    collect = require('gulp-rev-collector'),
    merge = require('gulp-merge-json'),
    config = require('dotenv').config(),
    replace = require('gulp-replace'),
    nodemon = require('gulp-nodemon'),
    del = require('del');

gulp.task('clean', function () {
    return del([
        'dist/**/*'
    ]);
});

gulp.task('minify:agent', function(cb) {
    return gulp.src('public/dashboard/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss({processImport: false})))
        .pipe(gulp.dest('dist/dashboard'))
});

gulp.task('img', function() {
    return gulp.src('public/img/**/*').pipe(gulp.dest('dist/img'));
});

gulp.task('images:front', function() {
    return gulp.src('public/images/**/*').pipe(gulp.dest('dist/images'));
});

gulp.task('fonts:front', function() {
    return gulp.src('public/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('css:front', function() {
    return gulp.src('public/css/**/*').pipe(gulp.dest('dist/css'));
});

gulp.task('js:front', function() {
    return gulp.src('public/js/**/*').pipe(gulp.dest('dist/js'));
});

gulp.task('images', function() {
    return gulp.src('public/dashboard/images/**/*').pipe(gulp.dest('dist/images'));
});

gulp.task('svg', function() {
    return gulp.src('public/dashboard/svg/**/*').pipe(gulp.dest('dist/dashboard/svg'));
});

gulp.task('fonts', function() {
    return gulp.src('public/dashboard/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('css:agent', function() {
    return gulp.src('public/dashboard/css/**/*').pipe(gulp.dest('dist/dashboard/css'));
});

gulp.task('new-fonts', function() {
    return gulp.src('public/dashboard/css/new-fonts/**/*').pipe(gulp.dest('dist/dashboard/new-fonts'));
});

gulp.task('vendor', function() {
    return gulp.src('public/dashboard/vendor/**/*').pipe(gulp.dest('dist/dashboard/vendor'));
});

gulp.task('obfuscate:agent', ['minify:agent'], function(){
    obfuscate('dist/dashboard/app.min.js', function( str ){
        fs.writeFile('dist/dashboard/ob.min.js', str, function() {
            new compressor.minify({
                type: 'gcc',
                fileIn: 'dist/dashboard/ob.min.js',
                fileOut: 'dist/dashboard/app.min.js'
            });
        });
    });
});

gulp.task('config:agent', function() {
    return gulp.src('configuration-user.js')
        .pipe(rename('configuration.js'))
        .pipe(gulp.dest('public/dashboard/js'));
});

//gulp.task('revision', function() {
//    return gulp.src( 'dist/dashboard/user/**/*' )
//        .pipe(rev())
//        .pipe(gulp.dest( 'dist/dashboard/user' ))
//        .pipe(rev.manifest({ path: 'map-cdn.json' }))
//        .pipe(gulp.dest('dist/dashboard/user/cdn'))
//});

//gulp.task('cdn', function() {
//    return gulp.src('public/dashboard/user/call-cdn.html')
//        .pipe(useref())
//        .pipe(gulpif('*.js', uglify()))
//        .pipe(gulp.dest('dist/dashboard/user'))
//});

//gulp.task('json', function() {
//    return gulp.src('./dist/dashboard/user/cdn/map-cdn.json')
//        .pipe(merge('cdn.js', false, false, false, 'var cdn'))
//        .pipe(gulp.dest('./public/dashboard/user/js'))
//});

gulp.task('templates', function () {
    return gulp.src('public/dashboard/tpl/**/*.html')
        .pipe(templateCache({ root: 'tpl' }))
        .pipe(gulp.dest('public/dashboard/js/'));
});

gulp.task('watch', function(){
    gulp.watch('public/dashboard/tpl/**/*.html', function( val ){
        return gulp.src('public/dashboard/tpl/**/*.html')
            .pipe(templateCache({ root: 'tpl' }))
            .pipe(gulp.dest('public/dashboard/js/'));
    });
});

gulp.task('dev',['watch', 'templates'], function(){
    console.log("Running in development environment");
    nodemon({
        script: 'app.js',
        watch: ['server/', 'app.js']
    });
});

gulp.task('configuration', ['config:agent']);
gulp.task('agent', [ 'minify:agent', 'img', 'images', 'svg', 'fonts', 'new-fonts', 'vendor','css:agent']);
gulp.task('front', [ 'images:front', 'css:front', 'js:front', 'fonts:front']);
gulp.task('templates', function () {
    return gulp.src('public/dashboard/tpl/**/*.html')
        .pipe(templateCache({ root: 'tpl' }))
        .pipe(gulp.dest('public/dashboard/js/'));
});

gulp.task('default', gulpSequence('clean','templates','configuration', 'agent', 'front' ));