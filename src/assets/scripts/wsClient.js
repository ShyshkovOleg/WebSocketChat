// This script is inserted after user entered his credentials(name)
let url = 'ws://localhost:8080/ws';
let socket = new WebSocket(url);
let user = window.user;

document.getElementById("myBtn").addEventListener("click", function(){
  let input = document.getElementById("input");
  let outgoingMessage = input.value;
  if (outgoingMessage.length > 0) {
    user.message = outgoingMessage;
    socket.send(JSON.stringify(user));
    showMessage(outgoingMessage, true);
    input.value = '';
  } else {
      alert("Enter some text first");
  }
});

socket.onmessage = function(event) {
  let incomingMessage = event.data;
  console.log("!!!Received message event data: ", event.data);

  showMessage(incomingMessage, false);
};

socket.onclose = event => console.log(`Closed ${event.code}`);

function showMessage(message, author) {
  let messageElem = document.createElement('div');
  messageElem.setAttribute('class', 'messageElement');

  let avatar = document.createElement('div');
  avatar.className = "avatar";
  messageElem.prepend(avatar);

  if (author) {
    let messageBlock = document.createElement('div');
    messageBlock.textContent = message;
    messageBlock.className = "message";
    messageElem.prepend(messageBlock);
    avatar.textContent = '...Your message';
    avatar.setAttribute('style', `color: ${user.color}`)
  } else {
    let m = JSON.parse(message);
    let messageBlock = document.createElement('div');
    messageBlock.textContent = m.message;
    messageBlock.className = "oponent-message";

    messageElem.prepend(messageBlock);

    avatar.textContent = m.name.concat(' message...');
    avatar.setAttribute('style', `color: ${m.color}; float: right; direction: rtl`);
  }
  
  document.getElementById('messages').appendChild(messageElem);
  messageElem.scrollIntoView();
}