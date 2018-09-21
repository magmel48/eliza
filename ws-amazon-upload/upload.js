const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

module.exports = {
	upload: async (fullPath) => {
		const fileName = fullPath.split(/[\\/]/).pop();

		return new Promise((resolve) => {
			s3.putObject({
				Bucket: 'ws-file-sender-1',
				Body: fs.readFileSync(fullPath),
				Key: fileName,
				ACL: 'public-read'
			}, (err, data) => {
				if (err) {
					console.log('error while uploading.', err);
				}

				resolve(data);
			});
		});
	}
};
