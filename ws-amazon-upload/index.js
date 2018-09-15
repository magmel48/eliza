const express = require('express'),
    http = require('http'),
    webSocket = require('ws');

const app = express(),
    server = http.createServer(app),
    wss = new webSocket.Server({ server });

const { upload } = require('./upload');

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
        upload(message)
            .then(() => {
                console.log('successfully uploaded.', message);
                broadcast(message);  // Return to client
            })
            .catch(() => {
                broadcast(message);  // Return to client
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
