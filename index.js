const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('an user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    })
});

app.get('/', (req, res) => {
    res.render('/public/index.html');
});

http.listen(3000, (req, res) => {
    console.log('listening to port 3000');
});