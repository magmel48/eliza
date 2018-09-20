const mobileReady = () => {
	const hamburgerEl = document.getElementsByClassName('mobile-menu__hamburger').item(0);
	const hamburgerMenuEl = document.getElementsByClassName('hamburger-menu').item(0);
	const hamburgerItemEls = document.getElementsByClassName('hamburger-menu__item');

	hamburgerEl.addEventListener('click', () => {
		const menuEl = document.getElementsByClassName('hamburger-menu').item(0);
		menuEl.classList.toggle('hidden');
	});

	for (let i = 0; i !== hamburgerItemEls.length; ++i) {
		hamburgerItemEls.item(i).addEventListener('click', () => {
			hamburgerMenuEl.classList.add('hidden');
		});
	}

	console.log('mobile version is ready.');
};

document.addEventListener('DOMContentLoaded', mobileReady);
