function firebaseReady() {
	try {
		var app = firebase.app();
		var features = ['auth', 'database', 'messaging', 'storage'].filter(function (feature) { return typeof app[feature] === 'function'; });
		console.log('firebase was loaded with the following features on board.', features.join(', '));

		window.db = firebase.database();
	} catch (e) {
		console.error('firebase initialization error.', e);

		window.db = {
			ref: function (path) {
				console.log('firebase ref.', path);
				var cb = null;

				return {
					set: function (value) {
						console.log('firebase ref value.', path, value);
						if (cb) {
							cb({ val: function () { return value; } })
						}
					},
					on: function (event, callback) {
						cb = callback;
						cb({ val: function () { return 1; } });
					},
					once: function (event, callback) {
						cb = callback;
						cb({ val: function () { return 1; } });
					}
				};
			}
		};
	}
};

document.addEventListener('DOMContentLoaded', firebaseReady);
