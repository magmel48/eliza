const express = require('express'),
	http = require('http'),
	webSocket = require('ws'),
	firebase = require('firebase-admin'),
	https = require('https'),
	xml2js = require('xml2js');

const app = express(),
	server = http.createServer(app),
	wss = new webSocket.Server({ server }),
	parser = new xml2js.Parser();

parser.on('error', (err) => { console.log('parser error.', err); });

const { upload } = require('./upload');

const firebaseApp = firebase.initializeApp({
  credential: firebase.credential.cert(
    require('./neweeee-76e3e-firebase-adminsdk-txegw-d43aa8dd25.json')
  ),
  databaseURL: 'https://neweeee-76e3e.firebaseio.com'
});
const db = firebaseApp.database();

const fetchFilesList = () => {
	let data = '';

	return new Promise((resolve) => {
		https.get('https://s3.us-east-2.amazonaws.com/ws-file-sender-1/', (res) => {
			if (res.statusCode >= 200 && res.statusCode < 400) {
				res.on('data', (data_) => { data += data_.toString(); });
				res.on('end', () => {
					console.log('updated fetch list.', data);
					parser.parseString(data, (err, result) => {
						if (err) {
							console.log('something wrong with xml.');
						}

						const keys = result.ListBucketResult.Contents.map(({ Key }) => Key[0]);

						db.ref('/service/fileslist').set(keys)
							.then(() => {
								console.log('successfully updated files list.');
								resolve();
							})
							.catch(() => {
								console.log('an error occured in updating files list.');
								resolve();
							});
					});
				});
			} else {
				resolve();
			}
		});
	});
};
fetchFilesList();

const associateWithClientId = (fullPath, clientId) => {
	const fileName = fullPath.split(/[\\/]/).pop();

	return new Promise((resolve) => {
		try {
			const record = db.ref(`/service/${clientId}`);

			record.once(
				'value', (snapshot) => {
					const value = snapshot.val();

					record.set(`${fileName},${value}`)
						.then(() => {
							resolve();
						})
						.catch(() => {
							resolve();
						});
				}
			);
		} catch (e) {
			resolve();
		}
	});
};

// implement broadcast function because of ws doesn't have it
const broadcast = (message) => {
	connects.forEach((socket, i) => {
		socket.send(message);
	});
};

// client connections
const connects = [];

// сalled when success building connection
wss.on('connection', function (ws, req) {
	const initMessage = { message: 'connection' };
	ws.send(JSON.stringify(initMessage));

	connects.push(ws);
	console.log('new client connected.' + connects.length);

	// Callback from client message
	ws.on('message', function (message) {
		console.log('received: %s.', message);

		const [filePath, clientId] = message.split(',');
		console.log('will upload', filePath);
		upload(filePath)
			.then(() => {
				console.log('successfully uploaded.', message);
				broadcast(message);  // Return to client
				return fetchFilesList();
			})
			.catch((e) => {
				console.log('an error occured', e);
				broadcast(message);  // Return to client
				return fetchFilesList();
			})
			.then(() => {
				return associateWithClientId(filePath, clientId);
			})
			.then(() => {
				console.log('should be ok.');
			});
	});

	ws.on('close', function () {
		console.log('client left.');
		connects = connects.filter(function (conn, i) {
			return (conn === ws) ? false : true;
		});
	});
});

server.listen(3000, function listening() {
	console.log('listening on %d', server.address().port);
});
