const firebaseReady = () => {
	try {
		let app = firebase.app();
		let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
		console.log('firebase was loaded with the following features on board.', features.join(', '));
	} catch (e) {
		console.error('firebase initialization error.', e);
	}

	window.db = firebase.database();
};

document.addEventListener('DOMContentLoaded', firebaseReady);
