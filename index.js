const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const path = require('path');

// app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('an user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); //sendFile no permite importar el javascript en el HTML
    // el archivo chat.js nunca es cargado. error 404
})

http.listen(3000, (req, res) => {
    console.log('listening to port 3000');
})