var mediator = new Mediator();
console.log('mediator is ok.');

function pagesReady() {
	var facesEls = document.getElementsByClassName('menu__faces');
	var manifestEls = document.getElementsByClassName('menu__manifest');
	var indexEl = document.getElementsByClassName('menu__index').item(0);
	var loginEl = document.getElementsByClassName('logo__login').item(0);

	var recordEl = document.getElementsByClassName('login__start').item(0);
	var startEl = document.getElementsByClassName('instructions__start').item(0);

	var pagesSelector = document.getElementsByClassName('page');
	var pageIndexEl = document.getElementsByClassName('page_index').item(0);
	var pageLoginEl = document.getElementsByClassName('page_login').item(0);
	var pageRecordEl = document.getElementsByClassName('page_record').item(0);
	var pageManipulateEl = document.getElementsByClassName('page_manipulate').item(0);
	var pageFacesEl = document.getElementsByClassName('page_faces').item(0);
	var pageManifestEl = document.getElementsByClassName('page_manifest').item(0);

	var hideAllPages = function () {
		for (var i = 0; i !== pagesSelector.length; ++i) {
			pagesSelector.item(i).classList.add('hidden');
		}

		mediator.publish('page_switch');
	};

	for (var i = 0; i !== facesEls.length; ++i) {
		facesEls.item(i).addEventListener('click', function () {
			for (var j = 0; j !== facesEls.length; ++j) {
				facesEls.item(j).classList.remove('menu__active');
			}
			for (var k = 0; k !== facesEls.length; ++k) {
				manifestEls.item(k).classList.remove('menu__active');
			}

			hideAllPages();
			pageFacesEl.classList.remove('hidden');
		});
	}

	for (var i = 0; i !== manifestEls.length; ++i) {
		manifestEls.item(i).addEventListener('click', function () {
			for (var j = 0; j !== facesEls.length; ++j) {
				facesEls.item(j).classList.remove('menu__active');
			}
			for (var k = 0; k !== facesEls.length; ++k) {
				manifestEls.item(k).classList.remove('menu__active');
			}

			hideAllPages();
			pageManifestEl.classList.remove('hidden');
		});
	}

	startEl.addEventListener('click', function () {
		hideAllPages();
		pageManipulateEl.classList.remove('hidden');
	});

	indexEl.addEventListener('click', function () {
		hideAllPages();
		pageIndexEl.classList.remove('hidden');
	});

	loginEl.addEventListener('click', function () {
		hideAllPages();
		pageLoginEl.classList.remove('hidden');
	});

	recordEl.addEventListener('click', function () {
		hideAllPages();
		pageRecordEl.classList.remove('hidden');
	});

	console.log('pages interaction is ready.');
};

document.addEventListener('DOMContentLoaded', pagesReady);
