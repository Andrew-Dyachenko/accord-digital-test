'use strict'

const findCurrent = currentClassName =>
	document.querySelector(`.${currentClassName}`)

const updateCarret = (carret, current) => {
	if (carret && current) {
		const { offsetWidth = 0, offsetLeft = 0 } = current
		carret.style.width = `${offsetWidth}px`
		carret.style.left = `${offsetLeft}px`
	}
}
const menuCarret = () => {
	const carretRailsClassName = 'menu__carret-rails'
	const carretClassName = 'menu__carret'
	const currentClassName = 'menu__link--current'
	const menuLinkClassName = 'menu__link'

	let current = findCurrent(currentClassName)

	const rails = document.querySelector(`.${carretRailsClassName}`)
	const carret = document.createElement('div')
	carret.setAttribute('class', carretClassName)
	updateCarret(carret, current)
	rails.append(carret)

	const links = document.querySelectorAll(`.${menuLinkClassName}`)

	links.forEach(link => {
		link.addEventListener('mouseover', e => updateCarret(carret, e.target))
		link.addEventListener('mouseout', () => {
			current = findCurrent(currentClassName)
			updateCarret(carret, current)
		})

		link.addEventListener('click', e => {
			e.stopPropagation()
			const siblings = Array.prototype.filter.call(link.parentNode.children, child => child !== link)
			siblings.forEach(link => link.classList.remove(currentClassName))
			link.classList.add(currentClassName)

			current = findCurrent(currentClassName)
			updateCarret(carret, current)
		})
	})

	window.onresize = () => updateCarret(carret, current)
}

const asyncImages = () => {
	for(let i = 0; i < document.images.length; i++) {
		const img = document.images[i]
		const data_src = img.getAttribute('data-src')

		// Про­пус­тить изо­бра­же­ния без data-src
		if (!data_src) continue

		// Обес­пе­чить за­груз­ку смен­но­го изо­бра­же­ния в кэш
		(new Image()).src = data_src

		// Установить загруженное изображение вместо прелоадера
		img.src = data_src
	}
}

document.addEventListener('DOMContentLoaded', () => {
	menuCarret()
	asyncImages()
})
