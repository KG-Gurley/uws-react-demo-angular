import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { version } from '../package.json';

import WebsocketServer, { Server } from 'uws';

const PORT = 3000;
const app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));

app.use(
    cors({
        exposedHeaders: '*'
    })
);

app.use(
    bodyParser.json({
        limit: '50mb'
    })
);

app.set('root', __dirname);

app.get('/', (req, res) => {
    res.json({
        version: version
    });
});

app.wss = new Server({
    server: app.server
});

let clients = [];

app.wss.on('connection', connection => {
    const userId = clients.length + 1;

    connection.userId = userId;

    const newClient = {
        ws: connection,
        userId: userId
    };

    clients.push(newClient);
    console.log('New client connected with userId ', userId);

    connection.on('message', data => {
        console.log('client says ', data);

        // after getting new message from client, we send back some information back to client
        connection.send('Nice to meet you');
    });

    connection.on('close', () => {
        console.log(`Client with ID ${userId} disconnected`);
        clients = clients.filter(client => client.userId !== userId);
    });
});

app.get('/api/all_connections', (req, res, next) => {
    return res.json({
        connections: clients
    });
});

setInterval(() => {
    // each 3 seconds this function will be executed.
    if (clients.length > 0) {
        console.log(`There are ${clients.length} clients connected`);
        clients.forEach(client => {
            console.log('Client ID ', client.userId);
            let msg = 'Server send message to user with Id = ' + client.userId;
            client.ws.send(msg);
        });
    }
}, 3000);

app.server.listen(process.env.PORT || PORT, () => {
    console.log(`App is running on port ${app.server.address().port}`);
});

export default app;
