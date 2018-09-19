const recordingReady = () => {
	const recordDb = window.db.ref('/service/last_record_id');

	recordDb.on('value', (snapshot) => {
		console.log('recording is ready.');

		const sliderId = snapshot.val();
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
				db.ref(`${clientPath}/stop`).set(1);
				recordDb.set(sliderId + 1);
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

			// clientId = nameEl.value; TODO save into db
			nameEl.value = ''; // to support new names

			currentRecordTime = 0;
			recordEl.textContent = stopText;

			progressStateEl.style.width = 0;

			try {
				// stop
				db.ref(`${clientPath}/start`).set(0);
				db.ref(`${clientPath}/stop`).set(0);

				// then start
				db.ref(`${clientPath}/start`).set(1);
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
	});
};

document.addEventListener('DOMContentLoaded', recordingReady);
