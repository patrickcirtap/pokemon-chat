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
    "caterpie": "#6cac56",
    "metapod": "#81f902",
    "butterfree": "#80e2fd",
    "weedle": "#f3d82f",
    "kakuna": "#ffe325",
    "beedrill": "#fdcc31",
    "pidgey": "#9c3a09",
    "pidgeotto": "#9e4c14",
    "pidgeot": "#8b4114",
    "rattata": "#af74ea",
    "raticate": "#794619",
    "spearow": "#a74157",
    "fearow": "#a98338",
    "ekans": "#ff6ec0",
    "arbok": "#9445a0",
    "pikachu": "#ecd628",
    "raichu": "#f35700",
    "sandshrew": "#9f773a",
    "sandslash": "#5c3500",
    "nidoran♀": "#9fb0f6",
    "nidorina": "#87adff",
    "nidoqueen": "#2c78c4",
    "nidoran♂": "#e78cb5",
    "nidorino": "#e585ab",
    "nidoking": "#7b2070",
    "clefairy": "#f367d2",
    "clefable": "#f667d1",
    "vulpix": "#ff994f",
    "ninetales": "#fbc74d",
    "jigglypuff": "#fc7df0",
    "wigglytuff": "#fd87ff",
    "zubat": "#2e2f5d",
    "golbat": "#224e71",
    "oddish": "#434f7f",
    "gloom": "#414864",
    "vileplume": "#4d545c",
    "paras": "#fa5f29",
    "parasect": "#ff5025",
    "venonat": "#52085f",
    "venomoth": "#e556bf",
    "diglett": "#9c5a26",
    "dugtrio": "#a04f1a",
    "meowth": "#ffff26",
    "persian": "#ffe956",
    "psyduck": "#fbe225",
    "golduck": "#5d43c2",
    "mankey": "#e9a35b",
    "primeape": "#ff7d3e",
    "growlithe": "#fa471c",
    "arcanine": "#eb5942",
    "poliwag": "#331c6c",
    "poliwhirl": "#8885d4",
    "poliwrath": "#8782d6",
    "abra": "#eba31b",
    "kadabra": "#e19b21",
    "alakazam": "#e49919",
    "machop": "#a79358",
    "machoke": "#7e875c",
    "machamp": "#a9995d",
    "bellsprout": "#aef83f",
    "weepinbell": "#69fe33",
    "victreebel": "#7ed111",
    "tentacool": "#5d9efc",
    "tentacruel": "#5fa6ff",
    "geodude": "#8f8f83",
    "graveler": "#908b77",
    "golem": "#4a6248",
    "ponyta": "#ff9f28",
    "rapidash": "#f75b11",
    "slowpoke": "#ff4fff",
    "slowbro": "#ff50fd",
    "magnemite": "#61a9f5",
    "magneton": "#599ef9",
    "farfetch'd": "#c25e44",
    "doduo": "#a67942",
    "dodrio": "#914538",
    "seel": "#9cadfd",
    "dewgong": "#98aeff",
    "grimer": "#e80ca4",
    "muk": "#631261",
    "shellder": "#89849b",
    "cloyster": "#9c5bd1",
    "gastly": "#682582",
    "haunter": "#630b85",
    "gengar": "#55375b",
    "onix": "#af9594",
    "drowzee": "#ffc038",
    "hypno": "#faa73d",
    "krabby": "#e23223",
    "kingler": "#ef292a",
    "voltorb": "#f6433f",
    "electrode": "#dc5a4a",
    "exeggcute": "#ff80cd",
    "exeggutor": "#d27e35",
    "cubone": "#7a431c",
    "marowak": "#74421f",
    "hitmonlee": "#ba7027",
    "hitmonchan": "#a27c69",
    "lickitung": "#fc4d9c",
    "koffing": "#d055ca",
    "weezing": "#872e80",
    "rhyhorn": "#805e83",
    "rhydon": "#725c80",
    "chansey": "#db91b4",
    "tangela": "#41e7c1",
    "kangaskhan": "#a89c36",
    "horsea": "#688ff6",
    "seadra": "#624fff",
    "goldeen": "#f6554b",
    "seaking": "#f6540c",
    "staryu": "#b38764",
    "starmie": "#87506d",
    "mr. mime": "#f45bff",
    "scyther": "#78d900",
    "jynx": "#6d196e",
    "electabuzz": "#ffea6c",
    "magmar": "#af4746",
    "pinsir": "#8b6036",
    "tauros": "#f8b92c",
    "magikarp": "#f75431",
    "gyarados": "#4162c3",
    "lapras": "#4c87d5",
    "ditto": "#b662dc",
    "eevee": "#c18060",
    "vaporeon": "#8ab3ff",
    "jolteon": "#f6f21d",
    "flareon": "#f14f06",
    "porygon": "#6459c2",
    "omanyte": "#5462c5",
    "omastar": "#5160bf",
    "kabuto": "#ae7a62",
    "kabutops": "#bf7655",
    "aerodactyl": "#67573e",
    "snorlax": "#040002",
    "articuno": "#56a2f6",
    "zapdos": "#ffe600",
    "moltres": "#f46b0b",
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
    "feraligatr": "#4b8b73",
    "sentret": "#b07346",
    "furret": "#644610",
    "hoothoot": "#ca6e2f",
    "noctowl": "#966836",
    "ledyba": "#e53235",
    "ledian": "#ce3a36",
    "spinarak": "#494e86",
    "ariados": "#d65c4d",
    "crobat": "#8a3ca2",
    "chinchou": "#353398",
    "lanturn": "#4167ae",
    "pichu": "#e9d12f",
    "cleffa": "#ff69d0",
    "igglybuff": "#f381fa",
    "togepi": "#e8d576",
    "togetic": "#f6be33",
    "natu": "#54c16e",
    "xatu": "#64c075",
    "mareep": "#b3a372",
    "flaaffy": "#e47fa9",
    "ampharos": "#feff1a",
    "bellossom": "#7abe37",
    "marill": "#476df2",
    "azumarill": "#4174c3",
    "sudowoodo": "#935a49",
    "politoed": "#3e9a2f",
    "hoppip": "#a54316",
    "skiploom": "#45983e",
    "jumpluff": "#4058c4",
    "aipom": "#421c73",
    "sunkern": "#bad629",
    "sunflora": "#53b300",
    "yanma": "#943741",
    "wooper": "#87a5cb",
    "quagsire": "#7ca5d1",
    "espeon": "#8d7ecf",
    "umbreon": "#303820",
    "murkrow": "#60617d",
    "slowking": "#ff4bf5",
    "misdreavus": "#584692",
    "unknown": "#000b00",
    "wobbuffet": "#5ec9bf",
    "girafarig": "#fdb316",
    "pineco": "#3e3d69",
    "forretress": "#8e364c",
    "dunsparce": "#edbf38",
    "gligar": "#cb33a2",
    "steelix": "#8a77d1",
    "snubbull": "#e57470",
    "granbull": "#ea86ba",
    "qwilfish": "#1f308a",
    "scizor": "#d3484d",
    "shuckle": "#975026",
    "heracross": "#1f5473",
    "sneasel": "#624b21",
    "teddiursa": "#b07030",
    "ursaring": "#c97103",
    "slugma": "#d96706",
    "magcargo": "#cd527e",
    "swinub": "#be5e5f",
    "piloswine": "#bc977d",
    "corsola": "#ed5ff1",
    "remoraid": "#634ecd",
    "octillery": "#fc3319",
    "delibird": "#f83b04",
    "mantine": "#29349e",
    "skarmory": "#273444",
    "houndour": "#2d0000",
    "houndoom": "#460000",
    "kingdra": "#2254f5",
    "phanpy": "#90a6d8",
    "donphan": "#909f98",
    "porygon2": "#cd4a4f",
    "stantler": "#b57535",
    "smeargle": "#bca84f",
    "tyrogue": "#ad7580",
    "hitmontop": "#d87e97",
    "smoochum": "#94127c",
    "elekid": "#fbf959",
    "magby": "#bc4a54",
    "miltank": "#d67996",
    "blissey": "#ef6273",
    "raikou": "#f9f134",
    "entei": "#ef5b13",
    "suicune": "#6ebde4",
    "larvitar": "#6dc01a",
    "pupitar": "#5e55e4",
    "tyranitar": "#87d622",
    "lugia": "#bd8bd2",
    "ho-oh": "#ff3213",
    "celebi": "#54fa00",
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