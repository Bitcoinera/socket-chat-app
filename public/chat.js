let socket = io();
const message = document.getElementById('m');
const messages = document.getElementById('messages');
const login = document.getElementById('loginPage');
const loginForm = document.getElementById('loginForm');
const chatForm = document.getElementById('chatForm');
const chat = document.getElementById('chatPage');
const loginInput = document.getElementById('loginName');

chat.style.display = 'none';

let username;

const setUserName = (data) => {

    let username = loginInput.value;

    if (username) {
        login.style.display = 'none';
        chat.style.display = 'block';
        message.focus();

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
    console.log(message);
}

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    setUserName();
})

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    socket.emit('new message', message.value);
    message.value = '';
    addChatMessage({
        username: username,
        message: message.value
    })
    return false
});

const addChatMessage = (data) => {
    let newLi = document.createElement('li');
    let textNode = document.createTextNode(data.message);
    newLi.appendChild(textNode);
    messages.appendChild(newLi);
}

socket.on('login', (data) => {
    console.log(data);
})

socket.on('new message', (data => {
    addChatMessage(data);
}))