import http from 'node:http';

import route_404 from './routes/_404.js';
import routeUser from './routes/user.js';
import getAllUsers from './routes/allUsers.js';
import createUser from './routes/createUser.js';
import updateUser from './routes/updateUser.js';
import deleteUser from './routes/deleteUser.js';

const newServer = http.createServer(async function (req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const url = req.url;

    if (req.method === 'GET' && url == '/users') {
        await getAllUsers(req, res);
    }
    else if (req.method === 'GET' && url.startsWith('/user/')) {
        await routeUser(req, res);
    }
    else if (req.method === 'POST' && url == '/user') {
        await createUser(req, res);
    }
    else if (req.method === 'PATCH' && url.startsWith('/user/')) {
        await updateUser(req, res);
    }
    else if (req.method === 'DELETE' && url.startsWith('/user/')) {
        await deleteUser(req, res);
    }
    else if (req.method === 'PUT' && url.startsWith('/user/')) {
        await updateUser(req, res);
    }
    else {
        route_404(req, res);
    }

    return;
});

newServer.listen(4001);