let area = document.querySelector('#area');
area.addEventListener('pointerdown', log);
area.addEventListener('pointerup', log);

function log(event) {
	area.insertAdjacentHTML('beforeend', `<div>${event.type} isPrimary=${event.isPrimary} 
	pointerId= ${event.pointerId}</div>`)
	area.scrollTop = 1e9;
}

let ball = document.querySelector('#ball');
let text = document.querySelector('#text');
ball.addEventListener('pointerdown', log1);
ball.addEventListener('pointerup', log1);
ball.addEventListener('pointermove', log1);
ball.addEventListener('pointercancel', log1);

let lastEventType;
let n = 1;

function log1(event) {
	event.preventDefault(); //Для мыши
	if (lastEventType == event.type) {
		n++;
		text.value = text.value.replace(/.*\n$/, `${event.type} * ${n}\n`);
		return;
	}

	lastEventType = event.type;
	n = 1;
	text.value += event.type + '\n';
	text.scrollTop = 1e9;
}


// ! Слайдер

let thumb = document.querySelector('.thumb');
let slider = document.querySelector('.slider');
let shiftX;

thumb.addEventListener('pointerdown', handler);

function handler(event) {
	event.preventDefault();

	shiftX = event.clientX - thumb.getBoundingClientRect().left;

	thumb.setPointerCapture(event.pointerId);

	thumb.addEventListener('pointermove', moveHandler);

	function moveHandler(event) {
		let newLeft = event.clientX - shiftX -
			slider.getBoundingClientRect().left;

		if (newLeft < 0) {
			newLeft = 0;
		}

		let rightEdge = slider.offsetWidth - thumb.offsetWidth;
		if (newLeft > rightEdge) {
			newLeft = rightEdge;
		}

		thumb.style.left = newLeft + 'px';
	};

	thumb.addEventListener('pointerup', upHandler);

	function upHandler() {
		thumb.removeEventListener('pointermove', moveHandler);
		thumb.removeEventListener('pointerup', upHandler);
	}
};



// thumb.ondragstart = () => false;