$(function() {
    let socket = io();
    const chatInput = $('#m');
    const messages = $('#messages');
    const login = $('#loginPage');
    const loginForm = $('#loginForm');
    const chatForm = $('#chatForm');
    const chat = $('#chatPage');
    const loginInput = $('#loginName');

    chat.hide();

    let username;
    let typing = false;

    const setUserName = (data) => {

        let username = loginInput.val();

        if (username) {
            login.fadeOut();
            chat.show();
            chatInput.focus();

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

    const addChatMessage = (data) => {
        let $usernameDiv = $('<span class="username"/>')
            .text(data.username + ' - ');
        let $msgBodyDiv = $('<span class="msgBody"/>')
            .text(data.message);
        let $msgDiv = $('<li class="msg"/>')
            .append($usernameDiv, $msgBodyDiv);
        messages.append($msgDiv);
    }

    loginForm.submit( (e) => {
        e.preventDefault();
        setUserName();
    })

    chatForm.submit( (e) => {
        e.preventDefault();
        socket.emit('new message', chatInput.val());
        chatInput.val('');
        // addChatMessage({
        //     username: username,
        //     message: message.val()
        // })
    });

    chatInput.on('input', () => {
        if (!typing) {
            typing = true;
            socket.emit('typing');
        }
        setTimeout(() => {
            typing = false;
        }, 1000);
    })

    socket.on('login', (data) => {
        console.log(data);
    })

    socket.on('new message', (data => {
        addChatMessage(data);
    }))

    socket.on('typing', (data) => {
        let $usernameDiv = $('<span class="username"/>')
            .text(data.username + ' - ');
        let $msgBodyDiv = $('<span class="typingMsgBody"/>')
            .text('is typing');
        let $msgDiv = $('<li class="typingMsg"/>')
            .append($usernameDiv, $msgBodyDiv);
        messages.append($msgDiv);
        setTimeout( () => {
            $('.typingMsg').remove();
        }, 1000)
    })
})