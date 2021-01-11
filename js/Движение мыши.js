container.onmouseover = container.onmouseout = handler;

function handler(event) {
	function str(el) {
		if (!el) {
			return 'null'
		}
		return el.className || el.tagName;
	}

	log1.value += event.type + ': ' +
		'target=' + str(event.target) +
		', relatedTarget=' + str(event.relatedTarget) + '\n';
	log1.scrollTop = log1.scrollHeight;

	if (event.type == 'mouseover') {
		event.target.style.background = 'pink';
	}
	if (event.type == 'mouseout') {
		event.target.style.background = '';
	}
}


// let text = document.querySelector('#text');
// let parent = document.querySelector('#parent');
// let child = document.querySelector('#child');
// let clear = document.querySelector('.clear');
// clear.addEventListener('click', clearText);
// parent.addEventListener('mouseover', handler1);
// // parent.addEventListener('mousemove', handler1);
// parent.addEventListener('mouseout', handler1);


// function handler1(event) {
// 	let type = event.type;
// 	while (type < 11) {
// 		type += ' ';
// 	}

// 	log(type + 'target=' + event.target.id)
// 	event.preventDefault();
// }

// function clearText() {
// 	text.value = '';
// 	lastMessage = '';
// }

// let lastMessageTime = 0;
// let lastMessage = '';
// let repeatCounter = 1;

// function log(message) {
// 	if (lastMessageTime == 0) {
// 		lastMessageTime = new Date();
// 	}
// 	let time = new Date();

// 	if (time - lastMessageTime > 500) {
// 		message = '------------------------------\n' + message;
// 	}

// 	if (message === lastMessage) {
// 		repeatCounter++;
// 		if (repeatCounter == 2) {
// 			text.value = text.value.trim() + ' x2\n';
// 		} else {
// 			text.value = text.value.slice(0, text.value.lastIndexOf('x') + 1) +
// 				repeatCounter + '\n';
// 		}
// 	} else {
// 		repeatCounter = 1;
// 		text.value += message + '\n';
// 	}

// 	text.scrollTop = text.scrollHeight;

// 	lastMessage = message;
// 	lastMessageTime = time;
// }


// function handler1(event) {
// 	let d = new Date();
// 	text.value += `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | ${event.type} [target: ${event.target.id}]\n`.replace(/(:|^)(\d\D)/, '$10$2');
// 	text.scrollTop = text.scrollHeight;
// }

// function clearText() {
// 	text.value = '';
// }


//! mouseenter mouseleave

let text = document.querySelector('#text');
let parent = document.querySelector('#parent');
let child = document.querySelector('#child');
let clear = document.querySelector('.clear');
clear.addEventListener('click', clearText);
parent.addEventListener('mouseenter', handler1);
parent.addEventListener('mouseleave', handler1);

function handler1(event) {
	let d = new Date();
	text.value += `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | ${event.type} [target: ${event.target.id}]\n`.replace(/(:|^)(\d\D)/, '$10$2');
	text.scrollTop = text.scrollHeight;
}

function clearText() {
	text.value = '';
}


//! Делегирование событий

let tableResult = document.querySelector('#tableResult');
let clearTable = document.querySelector('.clearTable');
let table = document.querySelector('#table');

clearTable.addEventListener('click', clearTableButton);
table.addEventListener('mouseover', handlerTable);
table.addEventListener('mouseout', handlerTableCl);

function clearTableButton() {
	tableResult.value = '';
}


// ! Первый вариант

// function handlerTable(event) {
// 	let target = event.target.closest('td');
// 	if (!target) {
// 		return
// 	}
// 	target.style.background = 'pink';
// 	tableResult.value += 'mouseover' + target.tagName + '\n';
// 	tableResult.scrollTop = tableResult.scrollHeight;
// }

// function handlerTableCl(event) {
// 	let target = event.target.closest('td');
// 	target.style.background = '';
// 	tableResult.value += 'mouseout' + target.tagName + '\n';
// 	tableResult.scrollTop = tableResult.scrollHeight;
// }


// ! Второй вариант

let currentElem = null;

function handlerTable(event) {

	if (currentElem) {
		return
	}

	let target = event.target.closest('td');

	if (!target) {
		return
	}

	if (!table.contains(target)) {
		return
	}

	currentElem = target;
	target.style.background = 'pink';
	tableResult.value += 'mouseover' + target.tagName + '\n';
	tableResult.scrollTop = tableResult.scrollHeight;
}

function handlerTableCl(event) {

	if (!currentElem) {
		return
	}

	let relatedTarget = event.relatedTarget;

	while (relatedTarget) {
		if (relatedTarget == currentElem) {
			return;
		}
		relatedTarget = relatedTarget.parentNode;
	}

	currentElem.style.background = '';
	tableResult.value += 'mouseout' + currentElem.tagName + '\n';
	tableResult.scrollTop = tableResult.scrollHeight;
	currentElem = null;
}