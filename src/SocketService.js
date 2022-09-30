import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs'

export let socket = null;
export var stompClient = null;
var username = null;
var onMessageFun = null;
export const initiateSocket = (email, lamb) => {
    disconnectSocket();
    if (socket === null && stompClient === null){
        //socket = new SockJS('http://localhost:4000/websocket');
        stompClient = Stomp.over(() => {
            socket = new SockJS('http://localhost:4000/websocket');
            return socket;
        });
        onMessageFun = lamb;
        username = email
        stompClient.connect({}, onConnected, onError);
        console.log(`Connecting socket...`);
    }
//  if (socket && room) socket.emit('join', room);
}
export const disconnectSocket = () => {
    if (socket !== null){
        console.log('Disconnecting socket...');
        socket.close();
        socket = null;
        stompClient = null;      
    }
//  if(socket) socket.disconnect();
}
export const subscribeToChat = (cb) => {
  if (!socket) return(true);
//  socket.on('chat', msg => {
    console.log('Websocket event received!');
//    return cb(null, msg); });
}
export const sendMessage = (room, message) => {
//  if (socket) socket.emit('chat', { message, room });
}

function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', (payload) => onMessageFun.addMessage(payload)); //onMessageReceived

    // Tell your username to the server
    stompClient.send("/app/chat.register",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )
    onMessageFun.handleLogin("connected");

}


function onError(error) {
    console.dir(error);
}

function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else {
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    //messageArea.appendChild(messageElement);
    //messageArea.scrollTop = messageArea.scrollHeight;
}


function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }

    var index = 1;//Math.abs(hash % colors.length);
    return index;//colors[index];
}
