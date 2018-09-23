var sort = function (a, b) {
	var idx1 = a.split('.')[1];
	var idx2 = b.split('.')[1];

	return idx1 - idx2;
}

function galleryReady() {
	var s3Url = '';
	var picturesEl = document.getElementsByClassName('pictures').item(0);
	var searchEl = document.getElementsByClassName('search__input').item(0);

	var initialPicNames = [];
	var init = function (picNames, isOverrideInitial) {
		if (!picNames && isOverrideInitial) {
			picNames = initialPicNames;
		}

		// for tests only
		if (!Array.isArray(picNames)) {
			picNames = ["pic.0.jpg", "pic.15.jpg", "pic.16.jpg"];
		}

		if (isOverrideInitial) {
			initialPicNames = picNames;
		}

		picturesEl.innerHTML = '';
		var sliceIdx = picNames.length - 20;
		picNames.sort(sort).slice(sliceIdx < 0 ? 0 : sliceIdx).forEach(function (picName) { // do not show all
			/* format:
				<article class="picture">
						<img class="picture__preview" src="https://sun9-8.userapi.com/c831108/v831108737/170121/5zkKwObvozw.jpg" />
						<div>
							<span class="picture__name">Василиса Петрова</span>
							<a href="https://sun9-8.userapi.com/c831108/v831108737/170121/5zkKwObvozw.jpg">
								<img class="picture__download" src="./images/download.svg" />
							</a>
						</div>
					</article>
			 */
			var article = document.createElement('article');
			article.classList.add('picture');

			var img = document.createElement('img');
			img.src = s3Url + picName;

			var div = document.createElement('div');

			var span = document.createElement('span');
			span.classList.add('picture__name');
			span.textContent = picName;

			var a1 = document.createElement('a');
			a1.href = s3Url + picName;

			var download = document.createElement('img');
			download.classList.add('picture__download');
			download.src = './images/download.svg';

			var share = document.createElement('span');
			share.classList.add('picture__share');
			share.innerHTML = VK.Share.button(
				{ url: 'https://goo.gl/BVBDBz', title: 'My digital version', image: s3Url + picName },
				{ type: 'custom', text: '<img src="./images/share.svg" />' }
			);

			a1.appendChild(download);
			div.appendChild(span);
			div.appendChild(a1);
			div.appendChild(share);
			article.appendChild(img);
			article.appendChild(div);

			picturesEl.appendChild(article);
		});
	};

	db.ref('/service/fileslist').once('value', function (snapshot) {
		init(snapshot.val(), true);
	});

	searchEl.addEventListener('keyup', function (e) {
		var searchString = searchEl.value;
		if (searchString) {
			db.ref('/service').once('value', function (snapshot) {
				var pics = [];
				var info = snapshot.val();
				for (var key in info) {
					if (info.hasOwnProperty(key)) {
						var value = info[key];
						if (!Array.isArray(value) && value.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
							var picName = value.split(',');
							pics.push(picName[0]);
						}
					}
				}

				init(pics, false);
			});
		} else if (e.keyCode === 8 && (searchString || '').length === 1) {
			db.ref('/service/fileslist').once('value', function (snapshot) {
				init(snapshot.val(), true);
			});
		} else {
			db.ref('/service/fileslist').once('value', function (snapshot) {
				init(snapshot.val(), true);
			});
		}
	});

	console.log('gallery is ready.');
};

document.addEventListener('DOMContentLoaded', galleryReady);
