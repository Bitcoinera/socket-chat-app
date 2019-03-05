$(function() {
    let socket = io();
    const message = $('#m');
    const messages = $('#messages');
    const login = $('#loginPage');
    const loginForm = $('#loginForm');
    const chatForm = $('#chatForm');
    const chat = $('#chatPage');
    const loginInput = $('#loginName');

    chat.hide();

    let username;

    const setUserName = (data) => {

        let username = loginInput.val();

        if (username) {
            login.fadeOut();
            chat.show();
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

    loginForm.submit( (e) => {
        e.preventDefault();
        setUserName();
    })

    chatForm.submit( (e) => {
        e.preventDefault();
        socket.emit('new message', message.val());
        message.val('');
        addChatMessage({
            username: username,
            message: message.val()
        })
        return false
    });

    const addChatMessage = (data) => {
        messages.append($('<li>').text(data.message));
    }

    socket.on('login', (data) => {
        console.log(data);
    })

    socket.on('new message', (data => {
        addChatMessage(data);
    }))

})