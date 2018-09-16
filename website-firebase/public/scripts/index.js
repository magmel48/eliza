const mediator = new Mediator();
console.log('mediator is ok.');

const pagesReady = () => {
	console.log('pages interaction is ready.');

	const facesEls = document.getElementsByClassName('menu__faces');
	const manifestEls = document.getElementsByClassName('menu__manifest');

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

		mediator.publish('page_switch');
	};

	for (let i = 0; i !== facesEls.length; ++i) {
		facesEls.item(i).addEventListener('click', () => {
			for (let i = 0; i !== facesEls.length; ++i) {
				facesEls.item(i).classList.remove('menu__active');
			}
			for (let i = 0; i !== facesEls.length; ++i) {
				manifestEls.item(i).classList.remove('menu__active');
			}

			hideAllPages();
			pageFacesEl.classList.remove('hidden');
		});
	}

	for (let i = 0; i !== manifestEls.length; ++i) {
		manifestEls.item(i).addEventListener('click', () => {
			for (let i = 0; i !== facesEls.length; ++i) {
				facesEls.item(i).classList.remove('menu__active');
			}
			for (let i = 0; i !== facesEls.length; ++i) {
				manifestEls.item(i).classList.remove('menu__active');
			}

			hideAllPages();
			pageManifestEl.classList.remove('hidden');
		});
	}

	startEl.addEventListener('click', () => {
		hideAllPages();
		pageManipulateEl.classList.remove('hidden');
	});
};

document.addEventListener('DOMContentLoaded', pagesReady);
