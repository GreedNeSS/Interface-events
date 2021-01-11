let click = document.querySelector('.click');
click.addEventListener('click', function (event) {
	if (event.altKey && event.shiftKey) {
		alert('Кнопка нажата!');
	}
});

let coords = document.querySelector('.coords');
coords.addEventListener('mousemove', move);

function move(event) {
	this.value = event.pageX + ' : ' + event.pageY + '||' +
		event.clientX + ' : ' + event.clientY;
}


let dblclick = document.querySelector('.dblclick');
dblclick.addEventListener('dblclick', function () {
	alert('Двойной клик!');
});

dblclick.addEventListener('mousedown', function (event) {
	event.preventDefault();
});

let warning = document.querySelector('.warning');
warning.addEventListener('copy', function (event) {
	alert('Копирование запрещено');
	event.preventDefault();
})

// ! Задание 1

// let arr = [];
// let ul = document.querySelector('.ul');

// ul.addEventListener('mousedown', block);
// ul.addEventListener('click', highlighting);

// function block(event) {
// 	event.preventDefault();
// }

// function highlighting(event) {
// 	let li = event.target.closest('li');
// 	if (!li) return;


// 	if (event.ctrlKey || event.metaKey) {
// 		arr.push(li);
// 		li.classList.toggle('selected');
// 		return;
// 	}

// 	if (arr) {
// 		for (const key of arr) {
// 			key.classList.remove('selected');
// 		}
// 	}

// 	li.classList.add('selected');
// 	arr.push(li);
// }


//! Решение сайта

let ul = document.querySelector('.ul');

ul.onclick = function (event) {
	if (event.target.tagName != 'LI') {
		return;
	}

	if (event.ctrlKey || event.metaKey) {
		toggleSelect(event.target);
	} else {
		singleSelect(event.target);
	}
}

ul.onmousedown = function () {
	return false;
};

function toggleSelect(li) {
	li.classList.toggle('selected');
}

function singleSelect(li) {
	let selected = ul.querySelectorAll('.selected');

	for (const elem of selected) {
		elem.classList.remove('selected');
	}

	li.classList.add('selected');
}
