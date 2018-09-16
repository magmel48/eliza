const ready = () => {
	console.log('ready.');

	const facesEl = document.getElementsByClassName('menu__faces')[0];
	const manifestEl = document.getElementsByClassName('menu__manifest')[0];

	facesEl.addEventListener('click', () => {
		facesEl.classList.toggle('menu__active');
		manifestEl.classList.toggle('menu__active');
	});

	manifestEl.addEventListener('click', () => {
		facesEl.classList.toggle('menu__active');
		manifestEl.classList.toggle('menu__active');
	});
};

document.addEventListener('DOMContentLoaded', ready);
