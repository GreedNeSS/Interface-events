// document.addEventListener('mousedown', drag);

// function drag(event) {
// 	let draggable = event.target.closest('.draggable');
// 	if (!draggable) {
// 		return;
// 	}

// 	event.preventDefault();
// 	let scrollHeight = Math.max(
// 		document.body.scrollHeight, document.documentElement.scrollHeight,
// 		document.body.offsetHeight, document.documentElement.offsetHeight,
// 		document.body.clientHeight, document.documentElement.clientHeight
// 	);
// 	let shiftX = event.clientX - draggable.getBoundingClientRect().left;
// 	let shiftY = event.clientY - draggable.getBoundingClientRect().top;
// 	draggable.style.position = 'absolute';
// 	draggable.style.zIndex = 1000;
// 	document.body.append(draggable);

// 	moveAt(event.pageX, event.pageY);

// 	function moveAt(pageX, pageY) {
// 		let left = pageX - shiftX;
// 		let top = pageY - shiftY;
// 		let topEdge = window.pageYOffset;
// 		let bottomEdge = document.documentElement.clientHeight - draggable.offsetHeight + window.pageYOffset;
// 		let rightEdge = document.documentElement.clientWidth + window.pageXOffset - draggable.offsetWidth;

// 		if (top < topEdge) {
// 			top = topEdge;
// 			window.scrollBy(0, -15);
// 			top -= 15;
// 			if (top < 0) {
// 				top = 0;
// 			}
// 		}

// 		if (top > bottomEdge) {
// 			top = bottomEdge;
// 			bottomEdgeScroll = event.clientY;

// 			if (top > scrollHeight - draggable.offsetHeight - 1) {
// 				top = scrollHeight - draggable.offsetHeight
// 				return;
// 			} else {
// 				window.scrollBy(0, 15);
// 				top += 15;
// 			}
// 		}

// 		if (left < 0) {
// 			left = 0;
// 		}

// 		if (left > rightEdge) {
// 			left = rightEdge;
// 		}

// 		draggable.style.left = left + 'px';
// 		draggable.style.top = top + 'px';
// 	}

// 	function onMouseMove(event) {
// 		moveAt(event.pageX, event.pageY);
// 	}

// 	document.addEventListener('mousemove', onMouseMove);

// 	function keyUp() {
// 		document.removeEventListener('mousemove', onMouseMove);
// 		draggable.removeEventListener('mouseup', keyUp);
// 	}

// 	draggable.addEventListener('mouseup', keyUp);

// }


// ! Решение сайта


let isDragging = false;

document.addEventListener('mousedown', function (event) {

	let dragElement = event.target.closest('.draggable');

	if (!dragElement) {
		return;
	}
	event.preventDefault();

	dragElement.ondragstart = function () {
		return false;
	};

	let shiftX, shiftY;

	startDrag(dragElement, event.clientX, event.clientY);

	function onMouseUp(event) {
		finishDrag();
	}

	function onMouseMove(event) {
		moveAt(event.clientX, event.clientY);
	}

	function startDrag(element, clientX, clientY) {
		if (isDragging) {
			return;
		}

		isDragging = true;

		document.addEventListener('mousemove', onMouseMove);
		element.addEventListener('mouseup', onMouseUp);

		shiftX = clientX - element.getBoundingClientRect().left;
		shiftY = clientY - element.getBoundingClientRect().top;

		element.style.position = 'fixed';

		moveAt(clientX, clientY);
	}

	function moveAt(clientX, clientY) {

		let newX = clientX - shiftX;
		let newY = clientY - shiftY;

		let newBottom = newY + dragElement.offsetHeight;

		if (newBottom > document.documentElement.clientHeight) {

			let docBottom = document.documentElement.getBoundingClientRect().bottom;

			let scrollY = Math.min(docBottom - newBottom, 10);

			if (scrollY < 0) {
				scrollY = 0;
			}

			window.scrollBy(0, scrollY);

			newY = Math.min(newY, document.documentElement.clientHeight - dragElement.
				offsetHeight);
		}

		if (newY < 0) {

			let scrollY = Math.min(-newY, 10);
			if (scrollY < 0) {
				scrollY = 0;
			}

			window.scrollBy(0, -scrollY);

			newY = Math.max(newY, 0);
		}

		if (newX < 0) {
			newX = 0;
		}
		if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
			newX = document.documentElement.clientWidth - dragElement.offsetWidth;
		}

		dragElement.style.left = newX + 'px';
		dragElement.style.top = newY + 'px';
	}

	function finishDrag() {
		if (!isDragging) {
			return;
		}

		isDragging = false;

		dragElement.style.top = parseInt(dragElement.style.top) + pageYOffset +
			'px';
		dragElement.style.position = 'absolute';

		document.removeEventListener('mousemove', onMouseMove);
		dragElement.removeEventListener('mouseup', onMouseUp);
	}
})