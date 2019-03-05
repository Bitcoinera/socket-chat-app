let socket = io();
const message = document.getElementById('m');
const messages = document.getElementById('messages');
const login = document.getElementById('loginPage');
const loginForm = document.getElementById('loginForm');
const chat = document.getElementById('chatPage');
const input = document.getElementById('loginName');

chat.style.display = 'none';

const setUserName = (data) => {

    let username = input.value;

    if (username) {
        login.style.display = 'none';
        chat.style.display = 'block';

        socket.emit('add user', username);
    }
}

const addParticipant = (data) => {
    let message = '';
    if ( data.numUser === 1 ) {
        message = `there's 1 participant`;
    } else {
        message = `there are ${data.numUser} participants`;
    }
}

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    setUserName();
})

socket.on('login', (data) => {
    console.log(data);
})

document.getElementsByTagName('form')[0].addEventListener('submit', function(e) {
    e.preventDefault();
    socket.emit('new message', message.value);
    message.value = '';
    return false
});

socket.on('new message', (msg) => {
    let newLi = document.createElement('li');
    let textNode = document.createTextNode(msg);
    newLi.appendChild(textNode);
    messages.appendChild(newLi);
})