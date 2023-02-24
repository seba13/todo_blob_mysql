

import gulp from 'gulp';
import babel from 'gulp-babel';
import postCss from 'gulp-postcss';

import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'autoprefixer';

import browserSync from 'browser-sync';

// crear instancia de servidor
const server = browserSync.create()

const sass = gulpSass(dartSass)


const plugins = [autoprefixer()]

import * as dotenv from 'dotenv'

import {join, dirname} from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({
    path: '.env'
})



gulp.task("pug")
gulp.task("babel", babelCompiler)
gulp.task('styles', sassCompiler)

gulp.task("default", watchTasks)




function babelCompiler() {

    return gulp
        .src("./src/dev/js/*.js")
        .pipe(babel())
        .pipe(gulp.dest("./src/public/js/"))
}

function sassCompiler() {

    return gulp
        .src("./src/dev/scss/styles.scss")
        .pipe(sass(
            {
            errLogToConsole: true,
            }
        ))
        .pipe(postCss(plugins))
        .pipe(gulp.dest("./src/public/css/"))
        .pipe(server.stream())
}



function watchTasks() {
    server.init({
        // proxy: '192.168.0.16:5000',
        // port: 80
        proxy: '192.168.0.16:'+ (process.env.DEVELOP=== true ? '5000' : process.env.PORT),
        port: process.env.DEVELOP=== true ? process.env.PORT : 5000 
    })
    gulp.watch("./src/views/**/*.pug", undefined).on('change', server.reload)
    gulp.watch("./src/dev/js/*.js", gulp.series('babel')).on('change', server.reload)
    gulp.watch("./src/dev/scss/**/*.scss", gulp.series('styles'))

}