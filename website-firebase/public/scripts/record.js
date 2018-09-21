const generateId = () => {
	const part1 = Math.random().toString(36).substr(2, 9);
	const part2 = Math.random().toString(36).substr(2, 9);
 	return part1 + part2;
};

const recordingReady = () => {
	const sliderId = generateId();
	const clientPath = `/faces/client/${sliderId}`;

	const recordText = 'Сохранить';
	const stopText = 'Стоп';

	const recordEl = document.getElementsByClassName('record__start').item(0);
	const nameEl = document.getElementsByClassName('login__name').item(0);
	const secondsEl = document.getElementsByClassName('record__seconds').item(0);
	const hintEl = document.getElementsByClassName('record__hint').item(0);
	// const progressEl = document.getElementsByClassName('progress').item(0);
	const progressStateEl = document.getElementsByClassName('progress__state').item(0);

	const loginEl = document.getElementsByClassName('login_vk').item(0);

	const maxRecordTime = 6000;
	let currentRecordTime = 0;
	let clearRecordInterval;

	window.glanceSlider(
		`${clientPath}/style`,
		document.getElementById('record_slider'),
		document.getElementById('record_slider_handle')
	);

	const stop = () => {
		try {
			window.db.ref(`${clientPath}/stop`).set(1);
		} catch (e) { }

		clearInterval(clearRecordInterval);
		clearRecordInterval = null;

		recordEl.textContent = recordText;
		hintEl.classList.remove('hidden');
		secondsEl.classList.add('hidden');
	};

	recordEl.addEventListener('click', () => {
		if (clearRecordInterval) {
			stop();
			return;
		}

		const inputName = nameEl.value; // because the next instruction is promised
		window.db.ref(`/service/${sliderId}`).set(inputName);

		nameEl.value = ''; // to support new names
		recordEl.textContent = stopText;
		progressStateEl.style.width = 0;
		hintEl.classList.add('hidden');
		secondsEl.classList.remove('hidden');

		currentRecordTime = 0;

		try {
			// stop
			window.db.ref(`${clientPath}/start`).set(0);
			window.db.ref(`${clientPath}/stop`).set(0);

			// then start
			window.db.ref(`${clientPath}/start`).set(1);
		} catch (e) {}

		clearRecordInterval = setInterval(() => {
			currentRecordTime += 10;

			let seconds = parseInt(currentRecordTime / 1000, 10);
			if (seconds < 10) {
				seconds = `0${seconds}`;
			}

			let milliseconds = parseInt((currentRecordTime % 1000) / 10, 10);
			if (milliseconds < 10) {
				milliseconds = `0${milliseconds}`;
			}

			progressStateEl.style.width = `${100.0 * currentRecordTime / maxRecordTime}%`;

			secondsEl.textContent = `${seconds}:${milliseconds}`;
			if (currentRecordTime >= maxRecordTime) {
				stop();
			}
		}, 10);
	});

	loginEl.addEventListener('click', (e) => {
		e.preventDefault();

		VK.Auth.login((response) => {
			if (response.session) {
				const { session: { user: { first_name, last_name } } } = response;
				nameEl.value = `${first_name} ${last_name}`;
			}
		});
	});

	console.log('recording is ready.');
};

document.addEventListener('DOMContentLoaded', recordingReady);
