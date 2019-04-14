import { task, watch, src, dest, series } from 'gulp'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'
import concat from 'gulp-concat'
import sass from 'gulp-sass'

/**
 * You can choose whether to use Dart Sass or Node Sass by setting the
 * sass.compiler property. Node Sass will be used by default,
 * but it's strongly recommended that you set it explicitly for
 * forwards-compatibility in case the default ever changes.
 */
sass.compiler = require('node-sass')

const browserSync = require('browser-sync').create()

task('js', () =>
	src('./index.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('bundle.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('dist'))
)

task('scss', () =>
	src('./index.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('bundle.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('dist'))
)

task('serve', done => {
	browserSync.init({
		server: './',
		open: false,
		reloadOnRestart: true,
		notify: true
	})
	done()
})

function watchTasks() {
	console.log('launched!')
	watch('./index.js')
		.on('all', series('js', browserSync.reload))

	watch('./index.scss')
		.on('all', series('scss', browserSync.reload))
}

task('default', series('js', 'scss', 'serve', watchTasks))
