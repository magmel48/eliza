function is_touch_device() {
  return 'ontouchstart' in window;
};

const getRandomSlider = () => {
	const sliders = [
		{ id: 'color', displayName: 'Цвет' },
		{ id: 'hueShift', displayName: 'Оттенок' },
		{ id: 'RGBdelay', displayName: 'Глитч' },
		{ id: 'contrast', displayName: 'Контраст' },
		{ id: 'tile', displayName: 'Зеркало' },
		{ id: 'to_style', displayName: 'Элементы' }
	];

	const rnd = parseInt(Math.random() * 6, 10);
	return sliders[rnd > 5 ? 5 : rnd];
};

const sliderReady = () => {
	window.glanceSlider = (dbPath, sliderEl, sliderHandleEl) => {
		let sliderWidth = 0;
		let sliderHandleWidth = 0;
		let sliderHandleLeft = 0;

		let isInitialized = false;
		let isOnMove = false;

		const handleStart = () => {
			isOnMove = true;
		};

		const handleMove = (event) => {
			if (isOnMove) {
				const { clientX, targetTouches } = event;

				if (!isInitialized) {
					const { width } = sliderEl.getBoundingClientRect();
					const { left, width: handleWidth } = sliderHandleEl.getBoundingClientRect();

					sliderWidth = width;
					sliderHandleLeft = left;
					sliderHandleWidth = handleWidth;
					isInitialized = true;
				}

				let x = clientX;
				if (typeof x === 'undefined') {
					x = targetTouches[0].clientX;
				}

				const position = Math.min(x - sliderHandleLeft, sliderWidth - sliderHandleWidth);
				sliderHandleEl.style.width = `${position}px`;

				setTimeout(() => { // non-blocking
					const firebaseValue = Math.max(0, position / (sliderWidth - sliderHandleWidth));
					try {
						window.db.ref(dbPath).set(firebaseValue);
					} catch (e) {}
				}, 0);
			}
		};

		const handleEnd = () => {
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
		mediator.subscribe('page_switch', () => {
			console.log('re-initializing slider.');
			isInitialized = false;
		});
	};

	// TODO rotation after each recording
	const { id: sliderId, displayName } = getRandomSlider();

	const manipulateHeadingEl = document.getElementsByClassName('manipulate__heading').item(0);
	manipulateHeadingEl.textContent = displayName;

	window.glanceSlider(
		`/faces/common/${sliderId}`,
		document.getElementById('color_slider'),
		document.getElementById('color_slider_handle')
	);

	console.log('slider is ready.');
};

document.addEventListener('DOMContentLoaded', sliderReady);
