var generateId = function () {
	var part1 = Math.random().toString(36).substr(2, 9);
	var part2 = Math.random().toString(36).substr(2, 9);
 	return part1 + part2;
};

function recordingReady() {
	var sliderId = generateId();
	var clientPath = '/faces/client/' + sliderId;

	var recordText = 'Сохранить';
	var stopText = 'Стоп';

	var recordEl = document.getElementsByClassName('record__start').item(0);
	var nameEl = document.getElementsByClassName('login__name').item(0);
	var secondsEl = document.getElementsByClassName('record__seconds').item(0);
	var hintEl = document.getElementsByClassName('record__hint').item(0);
	// var progressEl = document.getElementsByClassName('progress').item(0);
	var progressStateEl = document.getElementsByClassName('progress__state').item(0);

	var loginEl = document.getElementsByClassName('login_vk').item(0);

	var maxRecordTime = 6000;
	var currentRecordTime = 0;
	var clearRecordInterval;

	window.glanceSlider(
		clientPath + '/style',
		document.getElementById('record_slider'),
		document.getElementById('record_slider_handle')
	);

	var stop = function () {
		try {
			window.db.ref(clientPath + '/stop').set(1);
		} catch (e) { }

		clearInterval(clearRecordInterval);
		clearRecordInterval = null;

		recordEl.textContent = recordText;
		hintEl.classList.remove('hidden');
		secondsEl.classList.add('hidden');
	};

	recordEl.addEventListener('click', function () {
		if (clearRecordInterval) {
			stop();
			return;
		}

		window.db.ref(`/service/${sliderId}`).set(nameEl.value);

		recordEl.textContent = stopText;
		progressStateEl.style.width = 0;
		hintEl.classList.add('hidden');
		secondsEl.classList.remove('hidden');

		currentRecordTime = 0;

		try {
			// stop
			window.db.ref(clientPath + '/start').set(0);
			window.db.ref(clientPath + '/stop').set(0);

			// then start
			window.db.ref(clientPath + '/start').set(1);
		} catch (e) {}

		clearRecordInterval = setInterval(function () {
			currentRecordTime += 10;

			var seconds = parseInt(currentRecordTime / 1000, 10);
			if (seconds < 10) {
				seconds = '0' + seconds;
			}

			var milliseconds = parseInt((currentRecordTime % 1000) / 10, 10);
			if (milliseconds < 10) {
				milliseconds = '0' + milliseconds;
			}

			progressStateEl.style.width = (100.0 * currentRecordTime / maxRecordTime) + '%';

			secondsEl.textContent = seconds + ':' + milliseconds;
			if (currentRecordTime >= maxRecordTime) {
				stop();
			}
		}, 10);
	});

	loginEl.addEventListener('click', function (e) {
		e.preventDefault();

		VK.Auth.login(function (response) {
			if (response.session) {
				var session = response.session;
				var user = session.user;
				var first_name = user.first_name;
				var last_name = user.last_name;

				nameEl.value = first_name + ' ' + last_name;
			}
		});
	});

	console.log('recording is ready.');
}

document.addEventListener('DOMContentLoaded', recordingReady);
