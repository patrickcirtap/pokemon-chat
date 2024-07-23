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

const pokemonColors = {
    "bulbasaur": "#77dd6b",
    "ivysaur": "#79e576",
    "venusaur": "#66f599",
    "charmander": "#fb8e25",
    "charmeleon": "#fa7c32",
    "charizard": "#f16d01",
    "squirtle": "#609fff",
    "wartortle": "#5da2ef",
    "blastoise": "#3955e7",
    "pikachu": "#ecd628",
    "raichu": "#f35700",
    "onix": "#af9594",
    "scyther": "#78d900",
    "gyarados": "#4162c3",
    "lapras": "#4c87d5",
    "snorlax": "#040002",
    "dratini": "#2a5bc4",
    "dragonair": "#2151f9",
    "dragonite": "#a6872a",
    "mewtwo": "#894679",
    "mew": "#ed83e5",
    "chikorita": "#eebe69",
    "bayleef": "#c1a16d",
    "meganium": "#69bd1d",
    "cyndaquil": "#fdd803",
    "quilava": "#d25e21",
    "typhlosion": "#c76b5e",
    "totodile": "#499adb",
    "croconaw": "#6da798",
    "feraligatr": "#4b8b73"
};

let webSocket;
const scrollSelectPokemonListDistancePx = 50;
const selectPokemonTextBoxArrowBlinkSpeedMs = 500;
const selectPokemonTextBoxArrowEl = document.getElementById("selectPokemonTextBoxArrow");

// TODO - stop this once we join chat
const textBoxArrowBlinkIntervalRef = setInterval(function () {
    selectPokemonTextBoxArrowEl.style.visibility = (selectPokemonTextBoxArrowEl.style.visibility === 'hidden' ? '' : 'hidden');
}, selectPokemonTextBoxArrowBlinkSpeedMs);


// connectToWebSocket();

function connectToWebSocket() {
    webSocket = new WebSocket(`ws://localhost:8080/pokemon-chat/pokemon-chat`);
    webSocket.onmessage = function(newMessage) { wsOnMessage(newMessage) };
}

function wsOnMessage(newMessage) {
    console.log("wsOnMessage():"); // TODO deletelater //
    console.log(newMessage); // TODO deletelater //

    let messageObject;
    try {
        messageObject = JSON.parse(newMessage.data);
    } catch(e) {
        console.error(e);
        return;
    }

    switch(messageObject.type) {
        case MessageType.POKEMON_CHOICES:
            displayPokemonChoices(messageObject);
            break;
        default:
            // TODO - handle default switch statements everywhere
            break;
    }
}

function displayPokemonChoices(messageObject) {
    let pokemonList;
    try {
        pokemonList = JSON.parse(messageObject.content);
    } catch(e) {
        console.error(e);
        return;
    }

    document.getElementById("selectPokemonList").innerHTML = "";

    for(const pokemon of pokemonList) {
        const pokemonName = pokemon.name;
        const pokemonChoiceImg = document.createElement("img");
        pokemonChoiceImg.setAttribute("src", `images/pokemon/${pokemonName}.png`);
        pokemonChoiceImg.classList.add("pokemonChoiceImg");
        if(pokemon.isAvailable === "true") {
            // pokemonChoiceImg.onclick = function() { requestJoinChat(pokemonName) };
            pokemonChoiceImg.classList.add("pokemonIsAvailable");
        } else {
            pokemonChoiceImg.classList.add("pokemonIsNotAvailable");
        }

        document.getElementById("selectPokemonList").appendChild(pokemonChoiceImg);
    }
}

function scrollSelectPokemonList(direction) {
    switch(direction) {
        case "up":
            document.getElementById("selectPokemonList").scrollBy(0, -scrollSelectPokemonListDistancePx);
            break;
        case "down":
            document.getElementById("selectPokemonList").scrollBy(0, scrollSelectPokemonListDistancePx);
            break;
        default:
            // TODO - handle default switch statements everywhere
            break;
    }
}


/* ============== TESTING ================ */
// TODO - deletelater

// TODO - delete this ///////////////////////////////////////////
const pokemonListTest = [
    {name: "bulbasaur", isAvailable: "true"},
    {name: "ivysaur", isAvailable: "true"},
    {name: "venusaur", isAvailable: "true"},
    {name: "charmander", isAvailable: "true"},
    {name: "charmeleon", isAvailable: "true"},
    {name: "charizard", isAvailable: "true"},
    {name: "squirtle", isAvailable: "true"},
    {name: "wartortle", isAvailable: "true"},
    {name: "blastoise", isAvailable: "true"},
    {name: "pikachu", isAvailable: "true"},
    {name: "raichu", isAvailable: "true"},
    {name: "onix", isAvailable: "true"},
    {name: "scyther", isAvailable: "true"},
    {name: "gyarados", isAvailable: "true"},
    {name: "lapras", isAvailable: "true"},
    {name: "snorlax", isAvailable: "true"},
    {name: "dratini", isAvailable: "true"},
    {name: "dragonair", isAvailable: "true"},
    {name: "dragonite", isAvailable: "true"},
    {name: "mewtwo", isAvailable: "true"},
    {name: "mew", isAvailable: "true"},
    {name: "chikorita", isAvailable: "true"},
    {name: "bayleef", isAvailable: "true"},
    {name: "meganium", isAvailable: "true"},
    {name: "cyndaquil", isAvailable: "true"},
    {name: "quilava", isAvailable: "true"},
    {name: "typhlosion", isAvailable: "true"},
    {name: "totodile", isAvailable: "true"},
    {name: "croconaw", isAvailable: "true"},
    {name: "feraligatr", isAvailable: "true"}
];
// TODO - delete this ///////////////////////////////////////////

testDisplayPokemonChoices();

function testDisplayPokemonChoices() {
    for(const pokemon of pokemonListTest) {
        const pokemonName = pokemon.name;
        const pokemonChoiceImg = document.createElement("img");
        pokemonChoiceImg.setAttribute("src", `images/pokemon/${pokemonName}.png`);
        pokemonChoiceImg.classList.add("pokemonChoiceImg");
        if(pokemon.isAvailable === "true") {
            pokemonChoiceImg.classList.add("pokemonIsAvailable");
        } else {
            pokemonChoiceImg.classList.add("pokemonIsNotAvailable");
        }

        document.getElementById("selectPokemonList").appendChild(pokemonChoiceImg);
    }
}