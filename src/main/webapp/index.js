"use strict";

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
    { name: "bulbasaur", isAvailable: "true" }, { name: "bulbasaur", isAvailable: "true" },
];

const scrollSelectPokemonListDistancePx = 50;
const selectPokemonTextBoxArrowBlinkSpeedMs = 500;
const selectPokemonTextBoxArrow = document.getElementById("selectPokemonTextBoxArrow");

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

    document.getElementById("selectPokemonListBox").appendChild(pokemonChoiceImg);
}

function scrollSelectPokemonList(direction) {
    switch(direction) {
        case "up":
            document.getElementById("selectPokemonListBox").scrollBy(0, -scrollSelectPokemonListDistancePx);
            break;
        case "down":
            document.getElementById("selectPokemonListBox").scrollBy(0, scrollSelectPokemonListDistancePx);
            break;
        default:
            // TODO - handle default switch statements everywhere
            break;
    }
}

setInterval(function () {
    selectPokemonTextBoxArrow.style.visibility = (selectPokemonTextBoxArrow.style.visibility === 'hidden' ? '' : 'hidden');
}, selectPokemonTextBoxArrowBlinkSpeedMs);
