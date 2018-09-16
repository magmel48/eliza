const ready = () => {
	console.log('ready.');

	const facesEl = document.getElementsByClassName('menu__faces')[0];
	const manifestEl = document.getElementsByClassName('menu__manifest')[0];
	const pageFacesEl = document.getElementsByClassName('page_faces')[0];
	const pageManifestEl = document.getElementsByClassName('page_manifest')[0];

	facesEl.addEventListener('click', () => {
		facesEl.classList.toggle('menu__active');
		manifestEl.classList.toggle('menu__active');

		pageFacesEl.classList.toggle('hidden');
		pageManifestEl.classList.toggle('hidden');
	});

	manifestEl.addEventListener('click', () => {
		facesEl.classList.toggle('menu__active');
		manifestEl.classList.toggle('menu__active');

		pageFacesEl.classList.toggle('hidden');
		pageManifestEl.classList.toggle('hidden');
	});
};

document.addEventListener('DOMContentLoaded', ready);
