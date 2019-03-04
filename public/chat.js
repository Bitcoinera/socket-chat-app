let socket = io();
const message = document.getElementById('m');
const messages = document.getElementById('messages');

document.getElementsByTagName('form')[0].addEventListener('submit', function(e) {
    e.preventDefault();
    socket.emit('chat message', message.value);
    message.value = '';
    return false
});
socket.on('chat message', (msg) => {
    let newLi = document.createElement('li');
    let textNode = document.createTextNode(msg);
    newLi.appendChild(textNode);
    messages.appendChild(newLi);
})