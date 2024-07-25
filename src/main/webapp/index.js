"use strict";

const MessageType = {
    POKEMON_CHOICES: "POKEMON_CHOICES",
    JOIN_REQUEST: "JOIN_REQUEST",
    JOIN_CONFIRM: "JOIN_CONFIRM",
    JOIN_REJECT: "JOIN_REJECT",
    NEW_USER_JOIN: "NEW_USER_JOIN",
    NEW_USER_MESSAGE: "NEW_USER_MESSAGE",
    USER_LEAVE: "USER_LEAVE"
};

let webSocket;
let currentPokemonName;
const pokemonChatWebSocketEndpoint = 'ws://localhost:8080/pokemon-chat/pokemon-chat';
const scrollListDistancePx = 50;
const chatInputMaxLengthChars = 300;
const selectPokemonTextBoxArrowBlinkSpeedMs = 300;
const selectPokemonTextBoxArrowEl = document.getElementById("selectPokemonTextBoxArrow");

const textBoxArrowBlinkIntervalRef = setInterval(function () {
    selectPokemonTextBoxArrowEl.style.visibility = (selectPokemonTextBoxArrowEl.style.visibility === 'hidden' ? '' : 'hidden');
}, selectPokemonTextBoxArrowBlinkSpeedMs);


connectToWebSocket();

function connectToWebSocket() {
    webSocket = new WebSocket(pokemonChatWebSocketEndpoint);
    webSocket.onmessage = function(newMessage) { wsOnMessage(newMessage) };
}

function wsOnMessage(newMessage) {
    let message;
    try {
        message = JSON.parse(newMessage.data);
    } catch(e) {
        console.error(`${e}: parsing newMessage object data: ${newMessage.data}`);
        return;
    }

    switch(message.type) {
        case MessageType.POKEMON_CHOICES:
            displayPokemonChoices(message);
            break;
        case MessageType.JOIN_CONFIRM:
            joinChat(message);
            break;
        case MessageType.JOIN_REJECT:
            onJoinReject();
            displayPokemonChoices(message);
            break;
        case MessageType.NEW_USER_JOIN:
            updateConnectedPokemon(message);
            break;
        case MessageType.NEW_USER_MESSAGE:
            onNewUserMessage(message);
            break;
        case MessageType.USER_LEAVE:
            updateConnectedPokemon(message);
            break;
        default:
            console.error(`Unknown MessageType: ${message.type}`);
            break;
    }
}

function displayPokemonChoices(message) {
    let pokemonList;
    try {
        pokemonList = JSON.parse(message.content);
    } catch(e) {
        console.error(`${e}: parsing Pokemon List choices: ${message.content}`);
        return;
    }

    document.getElementById("selectPokemonList").innerHTML = "";

    for(const pokemon of pokemonList) {
        const pokemonName = pokemon.name;
        const pokemonChoiceImg = document.createElement("img");
        pokemonChoiceImg.setAttribute("src", `images/pokemon/${pokemonName}.png`);
        pokemonChoiceImg.classList.add("pokemonImgLarge");
        if(pokemon.isAvailable === "true") {
            pokemonChoiceImg.classList.add("pokemonIsAvailable");
            pokemonChoiceImg.onclick = function() { requestToJoinChat(pokemonName) };
        } else {
            pokemonChoiceImg.classList.add("pokemonIsNotAvailable");
        }

        document.getElementById("selectPokemonList").appendChild(pokemonChoiceImg);
    }
}

function requestToJoinChat(pokemonName) {
    const joinChatRequestMessage = {
        type: MessageType.JOIN_REQUEST,
        sender: "",
        content: pokemonName
    }
    let joinChatRequestString; 
    try {
        joinChatRequestString = JSON.stringify(joinChatRequestMessage);
    } catch(e) {
        console.error(`${e}: stringify join chat request message: ${joinChatRequestMessage}`);
        return;
    }

    webSocket.send(joinChatRequestString);
}

function joinChat(message) {
    clearInterval(textBoxArrowBlinkIntervalRef);
    currentPokemonName = message.sender;
    document.getElementById("selectPokemon").style.display = "none";
    document.getElementById("currentPokemon").setAttribute("src", `images/pokemon/${currentPokemonName}.png`)
    document.getElementById("pokemonChat").style.display = "flex";
    document.getElementById("chatInput").focus();

    let connectedPokemon;
    try {
        connectedPokemon = JSON.parse(message.content);
        displayConnectedPokemon(connectedPokemon);
    } catch(e) {
        console.error(`${e}: parsing connected Pokemon list: ${message.content}`);
    }

    document.getElementById("chatInput").addEventListener("keypress", e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

function onJoinReject() {
    console.error("Join request rejected");
    const joinRejectPopup =  document.getElementById("joinRejectPopup");
    
    joinRejectPopup.style.display = "block";
    joinRejectPopup.addEventListener("click", function() {
        joinRejectPopup.style.display = "none";
    });
}

function displayConnectedPokemon(connectedPokemon) {
    for(const pokemon of connectedPokemon) {
        const pokemonName = pokemon.name;
        const connectedPokemonImg = document.createElement("img");
        connectedPokemonImg.setAttribute("id", pokemonName);
        connectedPokemonImg.setAttribute("src", `images/pokemon/${pokemonName}.png`);
        connectedPokemonImg.classList.add("pokemonImgLarge");

        document.getElementById("connectedPokemonList").appendChild(connectedPokemonImg);
    }
}

function updateConnectedPokemon(message) {
    let updateMessage;

    switch(message.type) {
        case MessageType.NEW_USER_JOIN:
            const newPokemonName = message.content;
            updateMessage = `${newPokemonName.toUpperCase()} has joined`;

            if(newPokemonName !== currentPokemonName) {
                const newConnectedPokemonImg = document.createElement("img");
                newConnectedPokemonImg.setAttribute("id", newPokemonName);
                newConnectedPokemonImg.setAttribute("src", `images/pokemon/${newPokemonName}.png`);
                newConnectedPokemonImg.classList.add("pokemonImgLarge");
                document.getElementById("connectedPokemonList").appendChild(newConnectedPokemonImg);
            }
            break;
        case MessageType.USER_LEAVE:
            const leavingPokemonName = message.content;
            updateMessage = `${leavingPokemonName.toUpperCase()} has left`;
            document.getElementById(leavingPokemonName).remove();
            break;
        default:
            console.error(`Unknown MessageType: ${message.type}`);
            break;
    }

    const updateMessageDiv = document.createElement("div");
    updateMessageDiv.classList.add("chatMessage");
    updateMessageDiv.classList.add("updateMessage");
    updateMessageDiv.innerHTML = updateMessage;
    document.getElementById("chatWindowMessages").appendChild(updateMessageDiv);

    const chatWindowMessages = document.getElementById("chatWindowMessages");
    chatWindowMessages.scrollTop = chatWindowMessages.scrollHeight;
}

function sendMessage() {
    const newChatInputText = document.getElementById("chatInput").value;

    if(!newChatInputText || newChatInputText.length < 1) {
        return;
    }

    const newChatMessageText = newChatInputText.substring(0, chatInputMaxLengthChars);

    const newChatMessage = {
        type: MessageType.NEW_USER_MESSAGE,
        sender: "",
        content: newChatMessageText
    };
    let newChatMessageString;
    try {
        newChatMessageString = JSON.stringify(newChatMessage);
        webSocket.send(newChatMessageString);

        document.getElementById("chatInput").value = "";
        document.getElementById("chatInput").focus();
    } catch(e) {
        console.error(`${e}: stringify new chat message: ${newChatMessage}`);
    }
}

function onNewUserMessage(message) {
    const sender = message.sender;
    const content = message.content;

    const newUserMessage = createNewChatMessageDiv(sender, content);
    document.getElementById("chatWindowMessages").appendChild(newUserMessage);

    const chatWindowMessages = document.getElementById("chatWindowMessages");
    chatWindowMessages.scrollTop = chatWindowMessages.scrollHeight;
}

function createNewChatMessageDiv(sender, chatMessage) {
    const newChatMessageImg = document.createElement("img");
    newChatMessageImg.setAttribute("src", `images/pokemon/${sender}.png`);
    newChatMessageImg.classList.add("pokemonImgSmall");
    const newChatMessageImgDiv = document.createElement("div");
    newChatMessageImgDiv.classList.add("newChatMessageImg");
    newChatMessageImgDiv.appendChild(newChatMessageImg);

    const newChatMessageTextDiv = document.createElement("div");
    newChatMessageTextDiv.classList.add("newChatMessageText");
    const currentTime = getCurrentTime();
    const senderText = `<b><span style="color: ${pokemonColors[sender]}">${sender.toUpperCase()}</span> ${currentTime}</b>`;
    newChatMessageTextDiv.innerHTML = `${senderText}<br/><span class="chatMessageTextArea">${chatMessage}</span>`;

    const newChatMessageDiv = document.createElement("div");
    newChatMessageDiv.classList.add("chatMessage");
    newChatMessageDiv.appendChild(newChatMessageImgDiv);
    newChatMessageDiv.appendChild(newChatMessageTextDiv);

    return newChatMessageDiv;
}

function scrollList(list, direction) {
    const listToScroll = document.getElementById(list);
    switch(direction) {
        case "up":
            listToScroll.scrollBy(0, -scrollListDistancePx);
            break;
        case "down":
            listToScroll.scrollBy(0, scrollListDistancePx);
            break;
        default:
            console.error(`Unknown scroll direction: ${direction}`);
            break;
    }
}

function getCurrentTime() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const mins = date.getMinutes().toString().padStart(2, "0")
    const secs = date.getSeconds().toString().padStart(2, "0")

    return `${hours}:${mins}:${secs}`;
}
