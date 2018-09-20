const firebaseReady = () => {
	try {
		let app = firebase.app();
		let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
		console.log('firebase was loaded with the following features on board.', features.join(', '));

		window.db = firebase.database();
	} catch (e) {
		console.error('firebase initialization error.', e);

		window.db = {
			ref: (path) => {
				console.log('firebase ref.', path);
				let cb = null;

				return {
					set: (value) => {
						console.log('firebase ref value.', path, value);
						if (cb) {
							cb({ val: () => value })
						}
					},
					on: (event, callback) => {
						cb = callback;
						cb({ val: () => 1 });
					}
				};
			}
		};
	}
};

document.addEventListener('DOMContentLoaded', firebaseReady);
