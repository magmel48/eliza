const is_touch_device = () => {
  return 'ontouchstart' in window;
};

const sliderReady = () => {
	console.log('slider is ready.');

	const sliderEl = document.getElementsByClassName('slider').item(0);
	const sliderHandleEl = document.getElementsByClassName('slider__handle').item(0);

	let sliderWidth = 0;
	let sliderHandleWidth = 0;
	let sliderHandleLeft = 0;

	let isInitialized = false;
	let isOnMove = false;

	const handleStart = () => {
		isOnMove = true;
	};

	const handleMove = ({ clientX }) => {
		if (isOnMove) {
			if (!isInitialized) {
				const { width } = sliderEl.getBoundingClientRect();
				const { left, width: handleWidth } = sliderHandleEl.getBoundingClientRect();

				sliderWidth = width;
				sliderHandleLeft = left;
				sliderHandleWidth = handleWidth;
				isInitialized = true;
			}

			const position = Math.min(clientX - sliderHandleLeft, sliderWidth - sliderHandleWidth);
			sliderHandleEl.style.width = `${position}px`;
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
};

document.addEventListener('DOMContentLoaded', sliderReady);
