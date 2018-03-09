const WebSocket = require('uws');

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
    console.log('Successful connected to server');

    ws.send('hello server from client1');

    ws.on('message', message => {
        console.log('Server says: ', message);
    });
});
