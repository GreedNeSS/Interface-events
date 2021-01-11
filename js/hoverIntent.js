'use strict';

// let x;
// let y;

// class HoverIntent {

// 	constructor({
// 		sensitivity = 0.1,
// 		interval = 100,
// 		elem,
// 		over,
// 		out
// 	}) {
// 		this.sensitivity = sensitivity;
// 		this.interval = interval;
// 		this.elem = elem;
// 		this.over = over;
// 		this.out = out;

// 		this.onMouseMove = this.onMouseMove.bind(this);
// 		this.onMouseOver = this.onMouseOver.bind(this);
// 		this.onMouseOut = this.onMouseOut.bind(this);

// 		elem.addEventListener('mouseover', this.onMouseOver);
// 		elem.addEventListener('mouseout', this.onMouseOut);

// 	}

// 	onMouseOver(event) {
// 		let target = event.target.closest('#elem');
// 		if (!target) {
// 			return;
// 		}

// 		let relatedTarget

// 		if (!event.relatedTarget) {
// 			relatedTarget = document.body;
// 		} else {
// 			relatedTarget = event.relatedTarget.closest('#elem');
// 		}

// 		if (relatedTarget == target) {
// 			return;
// 		}

// 		this.onMouseMove(event)
// 	}

// 	onMouseOut(event) {
// 		let target = event.target.closest('#elem');
// 		if (!target) {
// 			return;
// 		}

// 		let relatedTarget

// 		if (!event.relatedTarget) {
// 			relatedTarget = document.body;
// 		} else {
// 			relatedTarget = event.relatedTarget.closest('#elem');
// 		}

// 		if (relatedTarget == target) {
// 			return;
// 		}

// 		this.out();
// 	}

// 	onMouseMove(event) {
// 		console.log(event.target.tagName);

// 		let a;
// 		let b;

// 		let timer = setInterval(() => {
// 			if (!x) {
// 				x = event.clientX;
// 				y = event.clientY;

// 			} else {
// 				a = (x - event.clientX);
// 				b = (y - event.clientY);

// 				let result = Math.max(a, b);
// 				console.log(x, event.clientX);

// 				if (result < this.sensitivity) {
// 					this.over()
// 					setTimeout(() => {
// 						clearInterval(timer);
// 					});

// 				}

// 				x = event.clientX;
// 				y = event.clientY;
// 			}

// 		}, this.interval);

// 	}

// }



// onMouseOver(event) {
// 	let target = event.target.closest('#elem');
// 	if (!target) {
// 		return;
// 	}
// 	if (event.relatedTarget == target) {
// 		return;
// 	}
// 	let x = event.clientX;
// 	let y = event.clientY;
// 	let sensitivity;
// 	let tooltip1 = document.querySelector('#tooltip1');
// 	tooltip1.style.top = (this.elem.getBoundingClientRect().bottom + 5) + 'px';
// 	tooltip1.style.left = (this.elem.getBoundingClientRect().left) + 'px';

// let timer = setInterval(() => {

// 	sensitivity = this.onMouseMove(event, x, y);
// 	x = event.clientX;
// 	y = event.clientY;
// 	if (sensitivity <= this.sensitivity) {
// 		this.over
// 		clearInterval(timer);
// 	}
// }, this.interval);
// }

// onMouseOut(event) {
// 	let target = event.target;
// 	if (!this.elem.contains(target)) return;

// 	this.out();
// }

// onMouseMove(event, x, y) {
// 	let a;
// 	let b;

// 	a = Math.abs(x - event.clientX);
// 	b = Math.abs(y - event.clientY);
// 	console.log(a, b);
// 	return Math.max(a, b);
// }

// }


// ! Решение Сайта

class HoverIntent {

	constructor({
		sensitivity = 0.1,
		interval = 100,
		elem,
		over,
		out
	}) {
		this.sensitivity = sensitivity;
		this.interval = interval;
		this.elem = elem;
		this.over = over;
		this.out = out;

		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);

		this.trackSpeed = this.trackSpeed.bind(this);

		elem.addEventListener('mouseover', this.onMouseOver);
		elem.addEventListener('mouseout', this.onMouseOut);

	}

	onMouseOver(event) {
		if (this.isOverElement) {
			// ! Игнорируем событие над элементом,
			// ! так как мы уже измеряем скорость
			return;
		}

		this.isOverElement = true;
		// после каждого движения измеряем дистанцию
		// между предыдущими и текущими координатами курсора
		// если скорость меньше sensivity, то она считается медленной

		this.prevX = event.pageX;
		this.prevY = event.pageY;
		this.prevTime = Date.now();

		elem.addEventListener('mousemove', this.onMouseMove);
		this.checkSpeedInterval = setInterval(() => {
			this.trackSpeed()
		}, this.interval);
	}

	onMouseOut(event) {
		// Если ушли с элемента
		if (!event.relatedTarget || !elem.contains(event.relatedTarget)) {
			this.isOverElement = false;
			this.elem.removeEventListener('mousemove', this.onMouseMove);
			clearInterval(this.checkSpeedInterval);
			if (this.isHover) {
				// Если была остановка движения на элементе
				this.out.call(this.elem, event);
				this.isHover = false;
			}
		}
	}

	onMouseMove(event) {
		this.lastX = event.pageX;
		this.lastY = event.pageY;
		this.lastTime = Date.now();
	}

	trackSpeed() {

		let speed;

		if (!this.lastTime || this.lastTime == this.prevTime) {
			// курсор не двигается
			speed = 0;
		} else {
			speed = Math.sqrt(
				Math.pow(this.prevX - this.lastX, 2) +
				Math.pow(this.prevY - this.lastY, 2)
			) / (this.lastTime - this.prevTime);
		}

		if (speed < this.sensitivity) {
			clearInterval(this.checkSpeedInterval);
			this.isHover = true;
			this.over.call(this.elem, event);
		} else {
			// скорость высокая запоминаем координаты
			this.prevX = this.lastX;
			this.prevY = this.lastY;
			this.prevTime = this.lastTime;
		}
	}

	destroy() {
		this.elem.removeEventListener('mousemove', this.onMouseMove);
		this.elem.removeEventListener('mouseover', this.onMouseOver);
		this.elem.removeEventListener('mouseout', this.onMouseOut);
	}
}

