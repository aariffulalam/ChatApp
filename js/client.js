const socket = io("http://localhost:8000");

const messageInp = document.getElementById("messageInp")
const form = document.getElementById("send-container")
const messageContainer = document.querySelector(".container")

const append = (message, position) => {

    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

}



form.addEventListener("submit", (e) => {
    e.preventDefault();        // because of this website will not be reload and also will stop default behaviour of website
    console.log("here")
    const message = messageInp.value;
    append(`You: ${message}`, "right");
    socket.emit("send", message);
    messageInp.value = ""
})



const name = prompt("enter your name -  ")
socket.emit("new-user-joined", name);

socket.on("user-joined", name => {
    append(`${name} joined the chat`, "left")
})

socket.on("receive", data => {
    append(`${data.name}:${data.message}`, "left")
})

socket.on("leaves", name => {
    append(`${name} left the chat`, 'left')
})