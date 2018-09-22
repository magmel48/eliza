function galleryReady() {
	const picturesEl = document.getElementsByClassName('pictures').item(0);

	// var x = new XMLHttpRequest();
	// x.open('GET', awsContentXml, true);
	// x.onreadystatechange = function () {
	// 	if (x.readyState == 4 && x.status == 200) {
	// 		var doc = x.responseXML;
	// 		console.log('doc', doc);
	// 	}
	// };
	// x.send(null);

	console.log('gallery is ready.');
};

document.addEventListener('DOMContentLoaded', galleryReady);
