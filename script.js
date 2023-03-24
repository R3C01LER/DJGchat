const channelId = "ULEFc6b6MxmGhypc";
const client = new ScaldroneClient();
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');
const messagesContainer = document.querySelector('#messages');

let username = '';

function setUsername() {
    username = prompt('Enter your username:');
    if (!username) {
        setUsername();
    } else {
        client.setUsername(channelId, username.trim());
    }
}

client.connect(channelId);

client.on('message', message => {
    const messageElement = document.createElement('div');
    const senderDisplay = document.createElement('span');
    senderDisplay.innerText = message.user.username + ': ';
    messageElement.appendChild(senderDisplay);
    messageElement.appendChild(document.createTextNode(message.text));
    messagesContainer.appendChild(messageElement);
});

messageForm.addEventListener('submit', event => {
    event.preventDefault();
    const message = messageInput.value;
    if (message !== '') {
        client.sendMessage(channelId, message);
        messageInput.value = '';
    }
});

setUsername();
