const kinput = document.querySelector('#kinput');
kinput.onkeydown = kinput.onkeyup = kinput.onkeypress = handle;

let lastTime = Date.now();

function handle(e) {
	if (form.elements[e.type + 'Ignore'].checked) {
		return;
	}

	let text = e.type +
		' key=' + e.key +
		' code=' + e.code +
		(e.shiftkey ? ' shiftKey' : '') +
		(e.ctrlkey ? ' ctrltKey' : '') +
		(e.altkey ? ' altKey' : '') +
		(e.metakey ? ' metaKey' : '') +
		(e.repeat ? ' (repeat)' : '') +
		'\n';

	if (area.value && Date.now() - lastTime > 250) {
		area.value += new Array(81).join('-') + '\n';
	}
	lastTime = Date.now();

	area.value += text;

	area.scrollTop = area.scrollHeight;

	if (form.elements[e.type + 'Stop'].checked) {
		e.preventDefault();
	}

}

let tel = document.querySelector('.tel');
tel.addEventListener('keydown', handler);

function handler(event) {
	let key = event.key;
	if ((key >= '0' && key <= '9') || key == '+' || key == '(' ||
		key == ')' || key == '-' || key == 'Backspace' ||
		key == 'ArrowRight' || key == 'ArrowLeft' || key == 'Delete') {
		return;
	} else {
		event.preventDefault();
	}

}

function checkPhoneKey(key) {
	return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-' ||
		key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace';
}


// ! Задание 1


function runOnKeys(func, code1, code2) {

	let key = null;
	let result = null;

	document.addEventListener('keydown', dblKey);

	function dblKey(event) {
		document.addEventListener('keyup', keyUp);
		if (event.code != code1 && event.code != code2) {
			console.log('net');
			key = null;
			document.removeEventListener('keyup', keyUp);
			return;
		}


		if (key != event.code && key != null) {
			result = true;
			key = null;
		}

		if (event.code == code1 || event.code == code2) {
			key = event.code;
			console.log(key);
		}

		function keyUp() {
			if (result) {
				func();
				result = null;
				document.removeEventListener('keyup', keyUp);
			}
			key = null;
			return;
		}

	}
}

runOnKeys(
	() => alert("Привет!"),
	"KeyQ",
	"KeyW"
);


// ! Решение сайта

// function runOnKeys(func, ...codes) {
// 	let pressed = new Set();

// 	document.addEventListener('keydown', function (event) {
// 		pressed.add(event.code);

// 		for (const code of codes) {
// 			if (!pressed.has(code)) {
// 				return;
// 			}
// 		}

// 		pressed.clear();

// 		func();
// 	});

// 	document.addEventListener('keyup', function (event) {
// 		pressed.delete(event.code);
// 	});
// }

// runOnKeys(
// 	() => alert("Привет!"),
// 	"KeyQ",
// 	"KeyW"
// );
