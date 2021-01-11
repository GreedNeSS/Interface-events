// ! Задание 1

// while (document.body.scrollHeight < document.documentElement.clientHeight + 100) {
// 	let p = document.createElement('p');
// 	p.innerHTML = `${new Date()}`
// 	document.body.append(p);
// 	console.log(document.body.scrollHeight, document.documentElement.clientHeight);
// }

// window.addEventListener('scroll', scroll);

// function scroll() {
// 	let documentHeight = document.body.scrollHeight;
// 	let windowHeight = document.documentElement.clientHeight;

// 	if (documentHeight < windowHeight + pageYOffset) {
// 		let p = document.createElement('p');
// 		p.innerHTML = `${new Date()}`
// 		document.body.append(p);
// 	}
// }

//! Решение сайта

// function populate() {
// 	while (true) {
// 		let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
// 		if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;
// 		document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
// 	}
// }

// window.addEventListener('scroll', populate);

// populate();

// ! Задание 2

// const matrix = document.querySelector('#matrix');
// const arrowTop = document.querySelector('#arrowTop');
// arrowTop.hidden = true;

// window.addEventListener('scroll', arrowHidden);

// function arrowHidden() {
// 	let windowRelativeTop = pageYOffset;
// 	console.log('fah');
// 	if (document.documentElement.clientHeight / 2 < windowRelativeTop) {
// 		arrowTop.hidden = false;
// 	}

// 	if (document.documentElement.clientHeight / 2 > windowRelativeTop) {
// 		arrowTop.hidden = true;
// 	}
// }

// arrowTop.addEventListener('pointerup', scroll);

// function scroll() {
// 	window.scrollTo(0, 0);
// }

// ! Решение сайта

// arrowTop.onclick = function() {
// 	window.scrollTo(pageXOffset, 0);
// 	// после scrollTo возникнет событие "scroll", так что стрелка автоматически скроется
//  };

//  window.addEventListener('scroll', function() {
// 	arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight);
//  });


// ! Задание 3

function isVisible(elem) {
	let coords = elem.getBoundingClientRect();
	let windowHeight = document.documentElement.clientHeight;

	let isVisibleTop = coords.top > 0 && coords.top < windowHeight;
	let isVisibleBottom = coords.bottom > 0 && coords.bottom < windowHeight;

	return isVisibleTop || isVisibleBottom;
}

window.addEventListener('scroll', showVisible);

function showVisible() {
	for (const img of document.querySelectorAll('img')) {
		let realSrc = img.dataset.src;
		if (!realSrc) continue;

		if (isVisible(img)) {
			// realSrc += '?nocache=' + Math.random();

			img.src = realSrc;

			img.dataset.src = '';
		}
	}
}

window.addEventListener('scroll', showVisible);
showVisible();
