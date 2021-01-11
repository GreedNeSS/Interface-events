let ball = document.querySelector('#ball');
ball.addEventListener('mousedown', dropStart);

function dropStart(event) {
	let currentDroppable = null;
	let shiftX = event.clientX - ball.getBoundingClientRect().left;
	let shiftY = event.clientY - ball.getBoundingClientRect().top;
	ball.style.position = 'absolute';
	ball.style.zIndex = 1000;
	document.body.append(ball);

	moveAt(event.pageX, event.pageY);

	function moveAt(pageX, pageY) {
		ball.style.left = pageX - shiftX + 'px';
		ball.style.top = pageY - shiftY + 'px';
	}

	function onMouseMove(event) {
		moveAt(event.pageX, event.pageY);

		ball.hidden = true;
		let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
		ball.hidden = false;

		if (!elemBelow) {
			return;
		}

		let droppableBelow = elemBelow.closest('.droppable');

		if (currentDroppable != droppableBelow) {
			if (currentDroppable) {
				leaveDroppable(currentDroppable);
			}
			currentDroppable = droppableBelow;

			if (currentDroppable) {
				enterDroppable(currentDroppable);
			}
		}
	}

	document.addEventListener('mousemove', onMouseMove);

	function keyUp() {
		document.removeEventListener('mousemove', onMouseMove);
		ball.removeEventListener('mouseup', keyUp);
	}

	ball.addEventListener('mouseup', keyUp);

}

ball.ondragstart = function () {
	return false;
}

function leaveDroppable(elem) {
	elem.style.background = '';
}

function enterDroppable(elem) {
	elem.style.background = 'pink';
}


// ! Задание 1

// let slider = document.querySelector('.slider');
// let thumb = document.querySelector('.thumb');

// thumb.addEventListener('mousedown', thumbStart);

// function thumbStart(event) {
// 	event.preventDefault();
// 	let shiftX = event.clientX - thumb.getBoundingClientRect().left;
// 	let top = thumb.getBoundingClientRect().top;
// 	let start = slider.getBoundingClientRect().left;
// 	let end = slider.getBoundingClientRect().right - thumb.offsetWidth;
// 	thumb.style.position = 'absolute';
// 	thumb.style.zIndex = 1000;
// 	thumb.style.top = top + 'px';
// 	document.body.append(thumb);

// 	function moveAt(pageX) {
// 		let coords = pageX - shiftX;
// 		if (coords < start) {
// 			coords = start;
// 		}
// 		if (coords > end) {
// 			coords = end;
// 		}
// 		thumb.style.left = coords + 'px';
// 	}

// 	function onMouseMove(event) {
// 		moveAt(event.pageX);
// 	}

// 	document.addEventListener('mousemove', onMouseMove);

// 	function mouseUp() {
// 		document.removeEventListener('mousemove', onMouseMove);
// 		document.removeEventListener('mouseup', mouseUp);
// 	}

// 	document.addEventListener('mouseup', mouseUp);
// }

// thumb.ondragstart = function () {
// 	return false;
// }


//! Решение сайта

let thumb = slider.querySelector('.thumb');

thumb.onmousedown = function (event) {
	event.preventDefault(); // предотвратить запуск выделения (действие браузера)

	let shiftX = event.clientX - thumb.getBoundingClientRect().left;
	// shiftY здесь не нужен, слайдер двигается только по горизонтали

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);

	function onMouseMove(event) {
		let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

		// курсор вышел из слайдера => оставить бегунок в его границах.
		if (newLeft < 0) {
			newLeft = 0;
		}
		let rightEdge = slider.offsetWidth - thumb.offsetWidth;
		if (newLeft > rightEdge) {
			newLeft = rightEdge;
		}

		thumb.style.left = newLeft + 'px';
	}

	function onMouseUp() {
		document.removeEventListener('mouseup', onMouseUp);
		document.removeEventListener('mousemove', onMouseMove);
	}

};

thumb.ondragstart = function () {
	return false;
};