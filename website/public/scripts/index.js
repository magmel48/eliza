const pagesReady = () => {
	console.log('pages interaction is ready.');

	const facesEl = document.getElementsByClassName('menu__faces').item(0);
	const manifestEl = document.getElementsByClassName('menu__manifest').item(0);

	const startEl = document.getElementsByClassName('instructions__start').item(0);

	const pagesSelector = document.getElementsByClassName('page');
	// const pageIndexEl = document.getElementsByClassName('page_index').item(0);
	const pageManipulateEl = document.getElementsByClassName('page_manipulate').item(0);
	const pageFacesEl = document.getElementsByClassName('page_faces').item(0);
	const pageManifestEl = document.getElementsByClassName('page_manifest').item(0);

	const hideAllPages = () => {
		for (let i = 0; i !== pagesSelector.length; ++i) {
			pagesSelector.item(i).classList.add('hidden');
		}
	};

	facesEl.addEventListener('click', () => {
		facesEl.classList.add('menu__active');
		manifestEl.classList.remove('menu__active');

		hideAllPages();
		pageFacesEl.classList.remove('hidden');
	});

	manifestEl.addEventListener('click', () => {
		facesEl.classList.remove('menu__active');
		manifestEl.classList.add('menu__active');

		hideAllPages();
		pageManifestEl.classList.remove('hidden');
	});

	startEl.addEventListener('click', () => {
		hideAllPages();
		pageManipulateEl.classList.remove('hidden');
	});
};

document.addEventListener('DOMContentLoaded', pagesReady);
