function sendMessage() {

    let input = document.getElementById("user-input");
    let message = input.value.trim();

    if(message === "") return;

    let chatBox = document.getElementById("chat-box");

    chatBox.innerHTML +=
    `<div class="user-message">${message}</div>`;

    fetch('/get', {

        method: 'POST',

        headers: {
            'Content-Type':
            'application/x-www-form-urlencoded'
        },

        body: 'message=' + encodeURIComponent(message)

    })

    .then(response => response.json())

    .then(data => {

        chatBox.innerHTML +=
        `<div class="bot-message">${data.response}</div>`;

        chatBox.scrollTop = chatBox.scrollHeight;
    });

    input.value = "";
}

document
.getElementById("user-input")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        sendMessage();
    }
});