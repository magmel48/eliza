const generateId = () => {
	const part1 = Math.random().toString(36).substr(2, 9);
	const part2 = Math.random().toString(36).substr(2, 9);

	return part1 + part2;
};

const recordingReady = () => {
	console.log('recording is ready.');

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

	const sliderId = nameEl.value || generateId();
	window.glanceSlider(
		`/client/${sliderId}`,
		document.getElementById('record_slider'),
		document.getElementById('record_slider_handle')
	);

	const stop = () => {
		try {
			db.ref(`/client/${clientId}/stop`).set(1);
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

		clientId = nameEl.value;
		nameEl.value = ''; // to support new names

		currentRecordTime = 0;
		recordEl.textContent = stopText;

		progressStateEl.style.width = 0;

		try {
			// stop
			db.ref(`/client/${clientId}/start`).set(0);
			db.ref(`/client/${clientId}/stop`).set(0);

			// then start
			db.ref(`/client/${clientId}/start`).set(1);
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
