const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

let numUser = 0;

io.on('connection', (socket) => {
    console.log('an user connected');

    socket.on('add user', (username) => {
        socket.username = username;
        ++numUser;
        console.log(`new user ${username} added`);
        
        socket.emit('login', numUser);
    })

    socket.on('new message', (msg) => {
        console.log('message: ' + msg);
        io.emit('new message', {
            username: socket.username,
            message: msg
        });
    })
});

http.listen(3000, (req, res) => {
    console.log('listening to port 3000');
});