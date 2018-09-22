function galleryReady() {
	var s3Url = '';
	var picturesEl = document.getElementsByClassName('pictures').item(0);

	db.ref('/service/fileslist').once('value', function (snapshot) {
		var picNames = snapshot.val();
		if (!Array.isArray(picNames)) {
			picNames = ["pic.0.jpg", "pic.14.jpg", "pic.15.jpg", "pic.16.jpg"];
		}

		picturesEl.innerHTML = '';
		picNames.forEach(function (picName) {
			/*
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

			var a = document.createElement('a');
			a.href = s3Url + picName;

			var download = document.createElement('img');
			download.classList.add('picture__download');
			download.src = './images/download.svg';

			a.appendChild(download);
			div.appendChild(span);
			div.appendChild(a);
			article.appendChild(img);
			article.appendChild(div);

			picturesEl.appendChild(article);
		});
	});

	console.log('gallery is ready.');
};

document.addEventListener('DOMContentLoaded', galleryReady);
