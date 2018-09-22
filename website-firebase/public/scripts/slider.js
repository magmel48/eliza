function is_touch_device() {
	return 'ontouchstart' in window;
};

function getRandomSlider() {
	var sliders = [
		{ id: 'color', displayName: 'Цвет' },
		{ id: 'hueShift', displayName: 'Оттенок' },
		{ id: 'RGBdelay', displayName: 'Глитч' },
		{ id: 'contrast', displayName: 'Контраст' },
		{ id: 'tile', displayName: 'Зеркало' },
		{ id: 'to_style', displayName: 'Элементы' }
	];

	var rnd = parseInt(Math.random() * 6, 10);
	return sliders[rnd > 5 ? 5 : rnd];
};

function sliderReady() {
	window.glanceSlider = function (dbPath, sliderEl, sliderHandleEl) {
		var sliderWidth = 0;
		var sliderHandleWidth = 0;
		var sliderHandleLeft = 0;

		var isInitialized = false;
		var isOnMove = false;

		var handleStart = function() {
			isOnMove = true;
		};

		var handleMove = (event) => {
			if (isOnMove) {
				var clientX = event.clientX;
				var targetTouches = event.targetTouches;

				if (!isInitialized) {
					var rect1 = sliderEl.getBoundingClientRect();
					var width = rect1.width;

					var rect2 = sliderHandleEl.getBoundingClientRect();
					var left = rect2.left;
					var handleWidth = rect2.width;

					sliderWidth = width;
					sliderHandleLeft = left;
					sliderHandleWidth = handleWidth;
					isInitialized = true;
				}

				var x = clientX;
				if (typeof x === 'undefined') {
					x = targetTouches[0].clientX;
				}

				var position = Math.min(x - sliderHandleLeft, sliderWidth - sliderHandleWidth);
				sliderHandleEl.style.width = position + 'px';

				setTimeout(function () { // non-blocking
					var firebaseValue = Math.max(0, position / (sliderWidth - sliderHandleWidth));
					try {
						window.db.ref(dbPath).set(firebaseValue);
					} catch (e) {}
				}, 0);
			}
		};

		const handleEnd = function () {
			isOnMove = false;
		};

		if (is_touch_device()) {
			sliderHandleEl.addEventListener('touchstart', handleStart);
			sliderEl.addEventListener('touchmove', handleMove);
			document.addEventListener('touchend', handleEnd);
		} else {
			sliderHandleEl.addEventListener('mousedown', handleStart);
			sliderEl.addEventListener('mousemove', handleMove);
			document.addEventListener('mouseup', handleEnd);
		}

		// to avoid any issues with styling
		mediator.subscribe('page_switch', function () {
			console.log('re-initializing slider.');
			isInitialized = false;
		});
	}

	// TODO rotation after each recording
	var slider = getRandomSlider();
	var sliderId = slider.id;
	var displayName = slider.displayName;

	var manipulateHeadingEl = document.getElementsByClassName('manipulate__heading').item(0);
	manipulateHeadingEl.textContent = displayName;

	window.glanceSlider(
		'/faces/common/' + sliderId,
		document.getElementById('color_slider'),
		document.getElementById('color_slider_handle')
	);

	console.log('slider is ready.');
};

document.addEventListener('DOMContentLoaded', sliderReady);
