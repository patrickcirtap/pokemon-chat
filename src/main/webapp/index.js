"use strict";

// TODO - delete this
const allPokemon = [
    { name: "bulbasaur", isAvailable: "true" }, { name: "bulbasaur", isAvailable: "true" },
    { name: "bulbasaur", isAvailable: "false" }, { name: "bulbasaur", isAvailable: "true" },
    { name: "bulbasaur", isAvailable: "true" }, { name: "bulbasaur", isAvailable: "true" },
    { name: "bulbasaur", isAvailable: "false" }, { name: "bulbasaur", isAvailable: "false" },
    { name: "bulbasaur", isAvailable: "false" }, { name: "bulbasaur", isAvailable: "true" },
    { name: "bulbasaur", isAvailable: "false" }, { name: "bulbasaur", isAvailable: "true" },
    { name: "bulbasaur", isAvailable: "false" }, { name: "bulbasaur", isAvailable: "true" },
    { name: "bulbasaur", isAvailable: "true" }, { name: "bulbasaur", isAvailable: "true" },
    { name: "bulbasaur", isAvailable: "true" }, { name: "bulbasaur", isAvailable: "true" },
    { name: "bulbasaur", isAvailable: "true" }, { name: "bulbasaur", isAvailable: "false" },
    { name: "bulbasaur", isAvailable: "true" }, { name: "bulbasaur", isAvailable: "true" },
    { name: "bulbasaur", isAvailable: "false" }, { name: "bulbasaur", isAvailable: "true" },
    { name: "bulbasaur", isAvailable: "false" }, { name: "bulbasaur", isAvailable: "true" },
    { name: "bulbasaur", isAvailable: "false" }, { name: "bulbasaur", isAvailable: "true" },
    { name: "bulbasaur", isAvailable: "true" }, { name: "bulbasaur", isAvailable: "true" },
    { name: "bulbasaur", isAvailable: "true" }, { name: "bulbasaur", isAvailable: "true" },
    { name: "bulbasaur", isAvailable: "true" }, { name: "bulbasaur", isAvailable: "false" },
    { name: "bulbasaur", isAvailable: "true" }, { name: "bulbasaur", isAvailable: "true" },
    { name: "bulbasaur", isAvailable: "true" }, { name: "bulbasaur", isAvailable: "true" }
];

const MessageType = {
    POKEMON_CHOICES: "POKEMON_CHOICES",
    JOIN_REQUEST: "JOIN_REQUEST",
    JOIN_CONFIRM: "JOIN_CONFIRM",
    JOIN_REJECT: "JOIN_REJECT",
    NEW_USER_JOIN: "NEW_USER_JOIN",
    NEW_USER_MESSAGE: "NEW_USER_MESSAGE",
    USER_LEAVE: "USER_LEAVE"
}

let webSocket;

const scrollSelectPokemonListDistancePx = 50;
const selectPokemonTextBoxArrowBlinkSpeedMs = 500;
const selectPokemonTextBoxArrowEl = document.getElementById("selectPokemonTextBoxArrow");

// TODO - stop this once we join chat
const textBoxArrowBlinkIntervalRef = setInterval(function () {
    selectPokemonTextBoxArrowEl.style.visibility = (selectPokemonTextBoxArrowEl.style.visibility === 'hidden' ? '' : 'hidden');
}, selectPokemonTextBoxArrowBlinkSpeedMs);

for(const pokemon of allPokemon) {
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
