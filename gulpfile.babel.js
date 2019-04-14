import { task, watch, src, dest, parallel } from 'gulp'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'
import concat from 'gulp-concat'
import sass from 'gulp-sass'

sass.compiler = require('node-sass')

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

watch(['./index.js', './index.scss'])
	.on('all', parallel('js', 'scss'))

task('default', parallel('js', 'scss'))
