import { task, watch, src, dest, series } from 'gulp'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'
import concat from 'gulp-concat'
import sass from 'gulp-sass'
import nodeSass from 'node-sass'
import autoprefixer from 'gulp-autoprefixer'
import uglify from 'gulp-uglify'
import { create as createBrowserSync } from 'browser-sync'

/**
 * You can choose whether to use Dart Sass or Node Sass by setting the
 * sass.compiler property. Node Sass will be used by default,
 * but it's strongly recommended that you set it explicitly for
 * forwards-compatibility in case the default ever changes.
 */
sass.compiler = nodeSass

const browserSync = createBrowserSync()
const autoprefixerOptions = {
	browsers: [
		'> 11%',
		'Chrome >= 10',
		'Explorer >= 6',
		'Opera >= 9',
		'Firefox >= 3.5',
		'Safari >= 4',
		'iOS >= 6'
	],
	remove: true
}

task('js', () => {
	const js = src('./index.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('bundle.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('dist'))

	const jsUglify = src('./index.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat('bundle.min.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('dist'))

	return Promise.all([js, jsUglify])
})

task('scss', () =>
	src('./index.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
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
	watch('./index.js')
		.on('all', series('js', browserSync.reload))

	watch(['./**.scss', './**/*.scss'])
		.on('all', series('scss', browserSync.reload))

	watch('./index.html')
		.on('all', series(browserSync.reload))
}

task('default', series('js', 'scss', 'serve', watchTasks))
