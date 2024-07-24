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
const scrollListDistancePx = 50;
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
    {name: "caterpie", isAvailable: "true"},
    {name: "metapod", isAvailable: "true"},
    {name: "butterfree", isAvailable: "true"},
    {name: "weedle", isAvailable: "true"},
    {name: "kakuna", isAvailable: "true"},
    {name: "beedrill", isAvailable: "true"},
    {name: "pidgey", isAvailable: "true"},
    {name: "pidgeotto", isAvailable: "true"},
    {name: "pidgeot", isAvailable: "true"},
    {name: "rattata", isAvailable: "true"},
    {name: "raticate", isAvailable: "true"},
    {name: "spearow", isAvailable: "true"},
    {name: "fearow", isAvailable: "true"},
    {name: "ekans", isAvailable: "true"},
    {name: "arbok", isAvailable: "true"},
    {name: "pikachu", isAvailable: "true"},
    {name: "raichu", isAvailable: "true"},
    {name: "sandshrew", isAvailable: "true"},
    {name: "sandslash", isAvailable: "true"},
    {name: "nidoran♀", isAvailable: "true"},
    {name: "nidorina", isAvailable: "true"},
    {name: "nidoqueen", isAvailable: "true"},
    {name: "nidoran♂", isAvailable: "true"},
    {name: "nidorino", isAvailable: "true"},
    {name: "nidoking", isAvailable: "true"},
    {name: "clefairy", isAvailable: "true"},
    {name: "clefable", isAvailable: "true"},
    {name: "vulpix", isAvailable: "true"},
    {name: "ninetales", isAvailable: "true"},
    {name: "jigglypuff", isAvailable: "true"},
    {name: "wigglytuff", isAvailable: "true"},
    {name: "zubat", isAvailable: "true"},
    {name: "golbat", isAvailable: "true"},
    {name: "oddish", isAvailable: "true"},
    {name: "gloom", isAvailable: "true"},
    {name: "vileplume", isAvailable: "true"},
    {name: "paras", isAvailable: "true"},
    {name: "parasect", isAvailable: "true"},
    {name: "venonat", isAvailable: "true"},
    {name: "venomoth", isAvailable: "true"},
    {name: "diglett", isAvailable: "true"},
    {name: "dugtrio", isAvailable: "true"},
    {name: "meowth", isAvailable: "true"},
    {name: "persian", isAvailable: "true"},
    {name: "psyduck", isAvailable: "true"},
    {name: "golduck", isAvailable: "true"},
    {name: "mankey", isAvailable: "true"},
    {name: "primeape", isAvailable: "true"},
    {name: "growlithe", isAvailable: "true"},
    {name: "arcanine", isAvailable: "true"},
    {name: "poliwag", isAvailable: "true"},
    {name: "poliwhirl", isAvailable: "true"},
    {name: "poliwrath", isAvailable: "true"},
    {name: "abra", isAvailable: "true"},
    {name: "kadabra", isAvailable: "true"},
    {name: "alakazam", isAvailable: "true"},
    {name: "machop", isAvailable: "true"},
    {name: "machoke", isAvailable: "true"},
    {name: "machamp", isAvailable: "true"},
    {name: "bellsprout", isAvailable: "true"},
    {name: "weepinbell", isAvailable: "true"},
    {name: "victreebel", isAvailable: "true"},
    {name: "tentacool", isAvailable: "true"},
    {name: "tentacruel", isAvailable: "true"},
    {name: "geodude", isAvailable: "true"},
    {name: "graveler", isAvailable: "true"},
    {name: "golem", isAvailable: "true"},
    {name: "ponyta", isAvailable: "true"},
    {name: "rapidash", isAvailable: "true"},
    {name: "slowpoke", isAvailable: "true"},
    {name: "slowbro", isAvailable: "true"},
    {name: "magnemite", isAvailable: "true"},
    {name: "magneton", isAvailable: "true"},
    {name: "farfetch'd", isAvailable: "true"},
    {name: "doduo", isAvailable: "true"},
    {name: "dodrio", isAvailable: "true"},
    {name: "seel", isAvailable: "true"},
    {name: "dewgong", isAvailable: "true"},
    {name: "grimer", isAvailable: "true"},
    {name: "muk", isAvailable: "true"},
    {name: "shellder", isAvailable: "true"},
    {name: "cloyster", isAvailable: "true"},
    {name: "gastly", isAvailable: "true"},
    {name: "haunter", isAvailable: "true"},
    {name: "gengar", isAvailable: "true"},
    {name: "onix", isAvailable: "true"},
    {name: "drowzee", isAvailable: "true"},
    {name: "hypno", isAvailable: "true"},
    {name: "krabby", isAvailable: "true"},
    {name: "kingler", isAvailable: "true"},
    {name: "voltorb", isAvailable: "true"},
    {name: "electrode", isAvailable: "true"},
    {name: "exeggcute", isAvailable: "true"},
    {name: "exeggutor", isAvailable: "true"},
    {name: "cubone", isAvailable: "true"},
    {name: "marowak", isAvailable: "true"},
    {name: "hitmonlee", isAvailable: "true"},
    {name: "hitmonchan", isAvailable: "true"},
    {name: "lickitung", isAvailable: "true"},
    {name: "koffing", isAvailable: "true"},
    {name: "weezing", isAvailable: "true"},
    {name: "rhyhorn", isAvailable: "true"},
    {name: "rhydon", isAvailable: "true"},
    {name: "chansey", isAvailable: "true"},
    {name: "tangela", isAvailable: "true"},
    {name: "kangaskhan", isAvailable: "true"},
    {name: "horsea", isAvailable: "true"},
    {name: "seadra", isAvailable: "true"},
    {name: "goldeen", isAvailable: "true"},
    {name: "seaking", isAvailable: "true"},
    {name: "staryu", isAvailable: "true"},
    {name: "starmie", isAvailable: "true"},
    {name: "mr. mime", isAvailable: "true"},
    {name: "scyther", isAvailable: "true"},
    {name: "jynx", isAvailable: "true"},
    {name: "electabuzz", isAvailable: "true"},
    {name: "magmar", isAvailable: "true"},
    {name: "pinsir", isAvailable: "true"},
    {name: "tauros", isAvailable: "true"},
    {name: "magikarp", isAvailable: "true"},
    {name: "gyarados", isAvailable: "true"},
    {name: "lapras", isAvailable: "true"},
    {name: "ditto", isAvailable: "true"},
    {name: "eevee", isAvailable: "true"},
    {name: "vaporeon", isAvailable: "true"},
    {name: "jolteon", isAvailable: "true"},
    {name: "flareon", isAvailable: "true"},
    {name: "porygon", isAvailable: "true"},
    {name: "omanyte", isAvailable: "true"},
    {name: "omastar", isAvailable: "true"},
    {name: "kabuto", isAvailable: "true"},
    {name: "kabutops", isAvailable: "true"},
    {name: "aerodactyl", isAvailable: "true"},
    {name: "snorlax", isAvailable: "true"},
    {name: "articuno", isAvailable: "true"},
    {name: "zapdos", isAvailable: "true"},
    {name: "moltres", isAvailable: "true"},
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
    {name: "feraligatr", isAvailable: "true"},
    {name: "sentret", isAvailable: "true"},
    {name: "furret", isAvailable: "true"},
    {name: "hoothoot", isAvailable: "true"},
    {name: "noctowl", isAvailable: "true"},
    {name: "ledyba", isAvailable: "true"},
    {name: "ledian", isAvailable: "true"},
    {name: "spinarak", isAvailable: "true"},
    {name: "ariados", isAvailable: "true"},
    {name: "crobat", isAvailable: "true"},
    {name: "chinchou", isAvailable: "true"},
    {name: "lanturn", isAvailable: "true"},
    {name: "pichu", isAvailable: "true"},
    {name: "cleffa", isAvailable: "true"},
    {name: "igglybuff", isAvailable: "true"},
    {name: "togepi", isAvailable: "true"},
    {name: "togetic", isAvailable: "true"},
    {name: "natu", isAvailable: "true"},
    {name: "xatu", isAvailable: "true"},
    {name: "mareep", isAvailable: "true"},
    {name: "flaaffy", isAvailable: "true"},
    {name: "ampharos", isAvailable: "true"},
    {name: "bellossom", isAvailable: "true"},
    {name: "marill", isAvailable: "true"},
    {name: "azumarill", isAvailable: "true"},
    {name: "sudowoodo", isAvailable: "true"},
    {name: "politoed", isAvailable: "true"},
    {name: "hoppip", isAvailable: "true"},
    {name: "skiploom", isAvailable: "true"},
    {name: "jumpluff", isAvailable: "true"},
    {name: "aipom", isAvailable: "true"},
    {name: "sunkern", isAvailable: "true"},
    {name: "sunflora", isAvailable: "true"},
    {name: "yanma", isAvailable: "true"},
    {name: "wooper", isAvailable: "true"},
    {name: "quagsire", isAvailable: "true"},
    {name: "espeon", isAvailable: "true"},
    {name: "umbreon", isAvailable: "true"},
    {name: "murkrow", isAvailable: "true"},
    {name: "slowking", isAvailable: "true"},
    {name: "misdreavus", isAvailable: "true"},
    {name: "unknown", isAvailable: "true"},
    {name: "wobbuffet", isAvailable: "true"},
    {name: "girafarig", isAvailable: "true"},
    {name: "pineco", isAvailable: "true"},
    {name: "forretress", isAvailable: "true"},
    {name: "dunsparce", isAvailable: "true"},
    {name: "gligar", isAvailable: "true"},
    {name: "steelix", isAvailable: "true"},
    {name: "snubbull", isAvailable: "true"},
    {name: "granbull", isAvailable: "true"},
    {name: "qwilfish", isAvailable: "true"},
    {name: "scizor", isAvailable: "true"},
    {name: "shuckle", isAvailable: "true"},
    {name: "heracross", isAvailable: "true"},
    {name: "sneasel", isAvailable: "true"},
    {name: "teddiursa", isAvailable: "true"},
    {name: "ursaring", isAvailable: "true"},
    {name: "slugma", isAvailable: "true"},
    {name: "magcargo", isAvailable: "true"},
    {name: "swinub", isAvailable: "true"},
    {name: "piloswine", isAvailable: "true"},
    {name: "corsola", isAvailable: "true"},
    {name: "remoraid", isAvailable: "true"},
    {name: "octillery", isAvailable: "true"},
    {name: "delibird", isAvailable: "true"},
    {name: "mantine", isAvailable: "true"},
    {name: "skarmory", isAvailable: "true"},
    {name: "houndour", isAvailable: "true"},
    {name: "houndoom", isAvailable: "true"},
    {name: "kingdra", isAvailable: "true"},
    {name: "phanpy", isAvailable: "true"},
    {name: "donphan", isAvailable: "true"},
    {name: "porygon2", isAvailable: "true"},
    {name: "stantler", isAvailable: "true"},
    {name: "smeargle", isAvailable: "true"},
    {name: "tyrogue", isAvailable: "true"},
    {name: "hitmontop", isAvailable: "true"},
    {name: "smoochum", isAvailable: "true"},
    {name: "elekid", isAvailable: "true"},
    {name: "magby", isAvailable: "true"},
    {name: "miltank", isAvailable: "true"},
    {name: "blissey", isAvailable: "true"},
    {name: "raikou", isAvailable: "true"},
    {name: "entei", isAvailable: "true"},
    {name: "suicune", isAvailable: "true"},
    {name: "larvitar", isAvailable: "true"},
    {name: "pupitar", isAvailable: "true"},
    {name: "tyranitar", isAvailable: "true"},
    {name: "lugia", isAvailable: "true"},
    {name: "ho-oh", isAvailable: "true"},
    {name: "celebi", isAvailable: "true"},
    {name: "egg", isAvailable: "true"}
];

testDisplayPokemonChoices();

function testDisplayPokemonChoices() {
    for(const pokemon of pokemonListTest) {
        const pokemonName = pokemon.name;
        const pokemonChoiceImg = document.createElement("img");
        pokemonChoiceImg.setAttribute("src", `images/pokemon/${pokemonName}.png`);
        pokemonChoiceImg.classList.add("pokemonChoiceImg");
        pokemonChoiceImg.style.backgroundColor = pokemonColors[pokemonName];
        if(pokemon.isAvailable === "true") {
            pokemonChoiceImg.classList.add("pokemonIsAvailable");
        } else {
            pokemonChoiceImg.classList.add("pokemonIsNotAvailable");
        }

        document.getElementById("selectPokemonList").appendChild(pokemonChoiceImg);
    }
}