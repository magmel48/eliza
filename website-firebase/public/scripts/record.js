const generateId = () => {
	const part1 = Math.random().toString(36).substr(2, 9);
	const part2 = Math.random().toString(36).substr(2, 9);
 	return part1 + part2;
};

const recordingReady = () => {
	console.log('recording is ready.');

	const sliderId = generateId();
	const clientPath = `/faces/client/${sliderId}`;

	const recordText = 'Запись';
	const stopText = 'Стоп';

	const recordEl = document.getElementsByClassName('record__start').item(0);
	const nameEl = document.getElementsByClassName('login__name').item(0);
	const secondsEl = document.getElementsByClassName('record__seconds').item(0);
	// const progressEl = document.getElementsByClassName('progress').item(0);
	const progressStateEl = document.getElementsByClassName('progress__state').item(0);

	const maxRecordTime = 6000;
	let currentRecordTime = 0;
	let clearRecordInterval;

	window.glanceSlider(
		clientPath,
		document.getElementById('record_slider'),
		document.getElementById('record_slider_handle')
	);

	const stop = () => {
		try {
			window.db.ref(`${clientPath}/stop`).set(1);
			window.db.ref(`/service/${sliderId}`).set(nameEl.value);
		} catch (e) { }

		clearInterval(clearRecordInterval);
		clearRecordInterval = null;

		recordEl.textContent = recordText;
	};

	recordEl.addEventListener('click', () => {
		if (clearRecordInterval) {
			stop();
			return;
		}

		nameEl.value = ''; // to support new names
		recordEl.textContent = stopText;
		progressStateEl.style.width = 0;

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
};

document.addEventListener('DOMContentLoaded', recordingReady);
