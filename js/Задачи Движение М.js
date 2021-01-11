// ! Задание 1

// document.addEventListener('mouseover', showTooltip);
// document.addEventListener('mouseout', removeTooltip);

// function showTooltip(event) {

// 	let elem = event.target;

// 	let tooltip = null;

// 	while (elem) {
// 		tooltip = elem.dataset.tooltip;
// 		if (tooltip) {
// 			break
// 		}
// 		elem = elem.parentNode;
// 	}

// 	if (tooltip) {
// 		let coords = elem.getBoundingClientRect();
// 		let text = document.createElement('p');

// 		text.classList.add('tooltip');
// 		text.innerHTML = tooltip;

// 		let coordsTop;
// 		let coordsLeft;
// 		document.body.append(text);

// 		if (coords.top - text.offsetHeight - 5 < 0) {
// 			coordsTop = coords.bottom + 5;
// 		} else {
// 			coordsTop = (coords.top - text.offsetHeight) - 15;
// 		}

// 		if (coords.left - ((text.offsetWidth - coords.width) / 2) < 0) {
// 			coordsLeft = 0;
// 		} else {
// 			coordsLeft = coords.left - ((text.offsetWidth - coords.width) / 2);
// 		}

// 		text.style.top = coordsTop + 'px';
// 		text.style.left = coordsLeft + 'px';

// 		document.body.append(text);
// 	}

// }

// function removeTooltip(event) {
// 	let elem = event.target;

// 	let tooltip = null;

// 	while (elem) {
// 		tooltip = elem.dataset.tooltip;
// 		if (tooltip) {
// 			break
// 		}
// 		elem = elem.parentNode;
// 	}

// 	if (tooltip) {
// 		let text = document.querySelector('.tooltip');
// 		text.remove();
// 	}
// }


// ! Вариант сайта

// let tooltip;

// document.addEventListener('mouseover', function (event) {
// 	let anchorElem = event.target.closest('[data-tooltip]');

// 	if (!anchorElem) {
// 		return;
// 	}

// 	tooltip = showTooltip(anchorElem, anchorElem.dataset.tooltip);
// });

// document.addEventListener('mouseout', function () {
// 	if (tooltip) {
// 		tooltip.remove();
// 		tooltip = false;
// 	}
// });

// function showTooltip(anchorElem, html) {
// 	let tooltipElem = document.createElement('div');
// 	tooltipElem.classList.add('tooltip');
// 	tooltipElem.innerHTML = html;
// 	document.body.append(tooltipElem);

// 	let coords = anchorElem.getBoundingClientRect();

// 	let left = coords.left + (anchorElem.offsetWidth - tooltipElem.offsetWidth) / 2;
// 	if (left < 0) {
// 		left = 0;
// 	}

// 	let top = coords.top - tooltipElem.offsetHeight - 5;
// 	if (top < 0) {
// 		top = coords.top + anchorElem.offsetHeight + 5;
// 	}

// 	tooltipElem.style.left = left + 'px';
// 	tooltipElem.style.top = top + 'px';

// 	return tooltipElem;
// }


// ! Задание 2

setTimeout(function () {
	new HoverIntent({
		elem,
		over() {
			tooltip.style.left = elem.getBoundingClientRect().left + 5 + 'px';
			tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
			tooltip.hidden = false;
		},
		out() {
			tooltip.hidden = true;
		}
	});
}, 2000);