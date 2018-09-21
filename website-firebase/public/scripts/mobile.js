function mobileReady() {
	var hamburgerEl = document.getElementsByClassName('mobile-menu__hamburger').item(0);
	var hamburgerMenuEl = document.getElementsByClassName('hamburger-menu').item(0);
	var hamburgerItemEls = document.getElementsByClassName('hamburger-menu__item');

	hamburgerEl.addEventListener('click', function () {
		const menuEl = document.getElementsByClassName('hamburger-menu').item(0);
		menuEl.classList.toggle('hidden');
	});

	for (var i = 0; i !== hamburgerItemEls.length; ++i) {
		hamburgerItemEls.item(i).addEventListener('click', function () {
			hamburgerMenuEl.classList.add('hidden');
		});
	}

	console.log('mobile version is ready.');
};

document.addEventListener('DOMContentLoaded', mobileReady);
