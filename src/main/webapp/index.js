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
const pokemonChatWebSocketEndpoint = "/pokemon-chat/pokemon-chat";
const scrollListDistancePx = 75;
const chatInputMaxLengthChars = 300;
const selectPokemonTextBoxArrowBlinkSpeedMs = 300;
const selectPokemonTextBoxArrowEl = document.getElementById("selectPokemonTextBoxArrow");
const newMessageSound = new Audio("assets/sounds/message.mp3");

const textBoxArrowBlinkIntervalRef = setInterval(function () {
    selectPokemonTextBoxArrowEl.style.visibility = (selectPokemonTextBoxArrowEl.style.visibility === "hidden" ? "" : "hidden");
}, selectPokemonTextBoxArrowBlinkSpeedMs);

connectToWebSocket();

function connectToWebSocket() {
    if (window.location.protocol === "http:") {
        webSocket = new WebSocket(`ws://${window.location.host}${pokemonChatWebSocketEndpoint}`);
    } else {
        webSocket = new WebSocket(`wss://${window.location.host}${pokemonChatWebSocketEndpoint}`);
    }

    webSocket.onmessage = function (newMessage) { wsOnMessage(newMessage) };
    webSocket.onerror = function () { onWsCloseOrError() };
    webSocket.onclose = function () { onWsCloseOrError() };
}

function wsOnMessage(newMessage) {
    let message;
    try {
        message = JSON.parse(newMessage.data);
    } catch (e) {
        console.error(`${e}: parsing newMessage object data: ${newMessage.data}`);
        return;
    }

    switch (message.type) {
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
    } catch (e) {
        console.error(`${e}: parsing Pokemon List choices: ${message.content}`);
        return;
    }

    document.getElementById("selectPokemonList").innerHTML = "";

    for (const pokemon of pokemonList) {
        const pokemonName = pokemon.name;
        const pokemonChoiceImg = document.createElement("img");
        pokemonChoiceImg.setAttribute("src", `assets/images/pokemon/${pokemonName}.png`);
        pokemonChoiceImg.classList.add("pokemonImgLarge");
        if (pokemon.isAvailable === "true") {
            pokemonChoiceImg.classList.add("pokemonIsAvailable");
            pokemonChoiceImg.onclick = function () { requestToJoinChat(pokemonName) };
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
    } catch (e) {
        console.error(`${e}: stringify join chat request message: ${joinChatRequestMessage}`);
        return;
    }

    webSocket.send(joinChatRequestString);
}

function joinChat(message) {
    clearInterval(textBoxArrowBlinkIntervalRef);
    currentPokemonName = message.sender;
    document.getElementById("selectPokemon").style.display = "none";
    document.getElementById("currentPokemon").setAttribute("src", `assets/images/pokemon/${currentPokemonName}.png`)
    document.getElementById("pokemonChat").style.display = "flex";
    document.getElementById("chatInput").focus();

    let connectedPokemon;
    try {
        connectedPokemon = JSON.parse(message.content);
        displayConnectedPokemon(connectedPokemon);
    } catch (e) {
        console.error(`${e}: parsing connected Pokemon list: ${message.content}`);
    }

    document.getElementById("chatInput").addEventListener("keypress", e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

function displayConnectedPokemon(connectedPokemon) {
    for (const pokemon of connectedPokemon) {
        const pokemonName = pokemon.name;
        const connectedPokemonImg = document.createElement("img");
        connectedPokemonImg.setAttribute("id", pokemonName);
        connectedPokemonImg.setAttribute("src", `assets/images/pokemon/${pokemonName}.png`);
        connectedPokemonImg.classList.add("pokemonImgLarge");

        document.getElementById("connectedPokemonList").appendChild(connectedPokemonImg);
    }
}

function updateConnectedPokemon(message) {
    let updateMessage;

    switch (message.type) {
        case MessageType.NEW_USER_JOIN:
            const newPokemonName = message.content;
            updateMessage = `${newPokemonName.toUpperCase()} has joined`;

            if (newPokemonName !== currentPokemonName) {
                const newConnectedPokemonImg = document.createElement("img");
                newConnectedPokemonImg.setAttribute("id", newPokemonName);
                newConnectedPokemonImg.setAttribute("src", `assets/images/pokemon/${newPokemonName}.png`);
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

    const connectedPokemonList = document.getElementById("connectedPokemonList");
    connectedPokemonList.scrollTop = connectedPokemonList.scrollHeight;
}

function sendMessage() {
    const newChatInputText = document.getElementById("chatInput").value;

    if (!newChatInputText || newChatInputText.length < 1 || !newChatInputText.trim()) {
        return;
    }

    const newChatMessageText = newChatInputText.substring(0, chatInputMaxLengthChars).trim();

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
    } catch (e) {
        console.error(`${e}: stringify new chat message: ${newChatMessage}`);
    }
}

function onNewUserMessage(message) {
    const sender = message.sender;
    const content = message.content;

    const newUserMessage = createNewChatMessageDiv(sender, content);
    document.getElementById("chatWindowMessages").appendChild(newUserMessage);
    newMessageSound.play();

    const chatWindowMessages = document.getElementById("chatWindowMessages");
    chatWindowMessages.scrollTop = chatWindowMessages.scrollHeight;
}

function createNewChatMessageDiv(sender, chatMessage) {
    const newChatMessageImg = document.createElement("img");
    newChatMessageImg.setAttribute("src", `assets/images/pokemon/${sender}.png`);
    newChatMessageImg.classList.add("pokemonImgSmall");
    const newChatMessageImgDiv = document.createElement("div");
    newChatMessageImgDiv.classList.add("newChatMessageImg");
    newChatMessageImgDiv.appendChild(newChatMessageImg);

    const currentTime = getCurrentTime();
    const senderText = `<b><span style="color: ${pokemonColors[sender]};">${sender.toUpperCase()}</span> ${currentTime}</b>`;
    const newChatMessageSenderDiv = document.createElement("div");
    newChatMessageSenderDiv.innerHTML = senderText;

    const newChatMessageContentDiv = document.createElement("div");
    newChatMessageContentDiv.classList.add("newChatMessageContent");
    newChatMessageContentDiv.innerText = chatMessage;

    const newChatMessageTextDiv = document.createElement("div");
    newChatMessageTextDiv.classList.add("newChatMessageText");
    newChatMessageTextDiv.appendChild(newChatMessageSenderDiv);
    newChatMessageTextDiv.appendChild(newChatMessageContentDiv);

    const newChatMessageDiv = document.createElement("div");
    newChatMessageDiv.classList.add("chatMessage");
    newChatMessageDiv.appendChild(newChatMessageImgDiv);
    newChatMessageDiv.appendChild(newChatMessageTextDiv);

    return newChatMessageDiv;
}

function scrollList(list, direction) {
    const listToScroll = document.getElementById(list);
    switch (direction) {
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
    const mins = date.getMinutes().toString().padStart(2, "0");
    const secs = date.getSeconds().toString().padStart(2, "0");

    return `${hours}:${mins}:${secs}`;
}

function onJoinReject() {
    console.error("Join request rejected");

    const joinRejectPopup = document.getElementById("joinRejectPopup");
    joinRejectPopup.style.display = "block";

    joinRejectPopup.addEventListener("click", function () {
        joinRejectPopup.style.display = "none";
    });
}

function onWsCloseOrError() {
    console.error("WebSocket close / error");
    
    const chatErrorPopup = document.getElementById("chatErrorPopup");
    chatErrorPopup.style.display = "block";
}

const pokemonColors = {
    "bulbasaur":  "#77dd6b", "ivysaur":    "#79e576", "venusaur":   "#66f599", 
    "charmander": "#fb8e25", "charmeleon": "#fa7c32", "charizard":  "#f16d01", 
    "squirtle":   "#609fff", "wartortle":  "#5da2ef", "blastoise":  "#3955e7", 
    "caterpie":   "#6cac56", "metapod":    "#81f902", "butterfree": "#80e2fd", 
    "weedle":     "#f3d82f", "kakuna":     "#ffe325", "beedrill":   "#fdcc31", 
    "pidgey":     "#9c3a09", "pidgeotto":  "#9e4c14", "pidgeot":    "#8b4114", 
    "rattata":    "#af74ea", "raticate":   "#794619", "spearow":    "#a74157", 
    "fearow":     "#a98338", "ekans":      "#ff6ec0", "arbok":      "#9445a0", 
    "pikachu":    "#ecd628", "raichu":     "#f35700", "sandshrew":  "#9f773a", 
    "sandslash":  "#5c3500", "nidoran♀":   "#9fb0f6", "nidorina":   "#87adff", 
    "nidoqueen":  "#2c78c4", "nidoran♂":   "#e78cb5", "nidorino":   "#e585ab", 
    "nidoking":   "#7b2070", "clefairy":   "#f367d2", "clefable":   "#f667d1", 
    "vulpix":     "#ff994f", "ninetales":  "#fbc74d", "jigglypuff": "#fc7df0", 
    "wigglytuff": "#fd87ff", "zubat":      "#2e2f5d", "golbat":     "#224e71", 
    "oddish":     "#434f7f", "gloom":      "#414864", "vileplume":  "#4d545c", 
    "paras":      "#fa5f29", "parasect":   "#ff5025", "venonat":    "#52085f", 
    "venomoth":   "#e556bf", "diglett":    "#9c5a26", "dugtrio":    "#a04f1a", 
    "meowth":     "#ffff26", "persian":    "#ffe956", "psyduck":    "#fbe225", 
    "golduck":    "#5d43c2", "mankey":     "#e9a35b", "primeape":   "#ff7d3e", 
    "growlithe":  "#fa471c", "arcanine":   "#eb5942", "poliwag":    "#331c6c", 
    "poliwhirl":  "#8885d4", "poliwrath":  "#8782d6", "abra":       "#eba31b", 
    "kadabra":    "#e19b21", "alakazam":   "#e49919", "machop":     "#a79358", 
    "machoke":    "#7e875c", "machamp":    "#a9995d", "bellsprout": "#aef83f", 
    "weepinbell": "#69fe33", "victreebel": "#7ed111", "tentacool":  "#5d9efc", 
    "tentacruel": "#5fa6ff", "geodude":    "#8f8f83", "graveler":   "#908b77", 
    "golem":      "#4a6248", "ponyta":     "#ff9f28", "rapidash":   "#f75b11", 
    "slowpoke":   "#ff4fff", "slowbro":    "#ff50fd", "magnemite":  "#61a9f5", 
    "magneton":   "#599ef9", "farfetch'd": "#c25e44", "doduo":      "#a67942", 
    "dodrio":     "#914538", "seel":       "#9cadfd", "dewgong":    "#98aeff", 
    "grimer":     "#e80ca4", "muk":        "#631261", "shellder":   "#89849b", 
    "cloyster":   "#9c5bd1", "gastly":     "#682582", "haunter":    "#630b85", 
    "gengar":     "#55375b", "onix":       "#af9594", "drowzee":    "#ffc038", 
    "hypno":      "#faa73d", "krabby":     "#e23223", "kingler":    "#ef292a", 
    "voltorb":    "#f6433f", "electrode":  "#dc5a4a", "exeggcute":  "#ff80cd", 
    "exeggutor":  "#d27e35", "cubone":     "#7a431c", "marowak":    "#74421f", 
    "hitmonlee":  "#ba7027", "hitmonchan": "#a27c69", "lickitung":  "#fc4d9c", 
    "koffing":    "#d055ca", "weezing":    "#872e80", "rhyhorn":    "#805e83", 
    "rhydon":     "#725c80", "chansey":    "#db91b4", "tangela":    "#41e7c1", 
    "kangaskhan": "#a89c36", "horsea":     "#688ff6", "seadra":     "#624fff", 
    "goldeen":    "#f6554b", "seaking":    "#f6540c", "staryu":     "#b38764", 
    "starmie":    "#87506d", "mr. mime":   "#f45bff", "scyther":    "#78d900", 
    "jynx":       "#6d196e", "electabuzz": "#ffea6c", "magmar":     "#af4746", 
    "pinsir":     "#8b6036", "tauros":     "#f8b92c", "magikarp":   "#f75431", 
    "gyarados":   "#4162c3", "lapras":     "#4c87d5", "ditto":      "#b662dc", 
    "eevee":      "#c18060", "vaporeon":   "#8ab3ff", "jolteon":    "#f6f21d", 
    "flareon":    "#f14f06", "porygon":    "#6459c2", "omanyte":    "#5462c5", 
    "omastar":    "#5160bf", "kabuto":     "#ae7a62", "kabutops":   "#bf7655", 
    "aerodactyl": "#67573e", "snorlax":    "#040002", "articuno":   "#56a2f6", 
    "zapdos":     "#ffe600", "moltres":    "#f46b0b", "dratini":    "#2a5bc4", 
    "dragonair":  "#2151f9", "dragonite":  "#a6872a", "mewtwo":     "#894679", 
    "mew":        "#ed83e5", "chikorita":  "#eebe69", "bayleef":    "#c1a16d", 
    "meganium":   "#69bd1d", "cyndaquil":  "#e04119", "quilava":    "#d25e21", 
    "typhlosion": "#c76b5e", "totodile":   "#499adb", "croconaw":   "#6da798", 
    "feraligatr": "#4b8b73", "sentret":    "#b07346", "furret":     "#644610", 
    "hoothoot":   "#ca6e2f", "noctowl":    "#966836", "ledyba":     "#e53235", 
    "ledian":     "#ce3a36", "spinarak":   "#494e86", "ariados":    "#d65c4d", 
    "crobat":     "#8a3ca2", "chinchou":   "#353398", "lanturn":    "#4167ae", 
    "pichu":      "#e9d12f", "cleffa":     "#ff69d0", "igglybuff":  "#f381fa", 
    "togepi":     "#e8d576", "togetic":    "#f6be33", "natu":       "#54c16e", 
    "xatu":       "#64c075", "mareep":     "#b3a372", "flaaffy":    "#e47fa9", 
    "ampharos":   "#feff1a", "bellossom":  "#7abe37", "marill":     "#476df2", 
    "azumarill":  "#4174c3", "sudowoodo":  "#935a49", "politoed":   "#3e9a2f", 
    "hoppip":     "#a54316", "skiploom":   "#45983e", "jumpluff":   "#4058c4", 
    "aipom":      "#421c73", "sunkern":    "#bad629", "sunflora":   "#53b300", 
    "yanma":      "#943741", "wooper":     "#87a5cb", "quagsire":   "#7ca5d1", 
    "espeon":     "#8d7ecf", "umbreon":    "#303820", "murkrow":    "#60617d", 
    "slowking":   "#ff4bf5", "misdreavus": "#584692", "unknown":    "#000b00", 
    "wobbuffet":  "#5ec9bf", "girafarig":  "#fdb316", "pineco":     "#3e3d69", 
    "forretress": "#8e364c", "dunsparce":  "#edbf38", "gligar":     "#cb33a2", 
    "steelix":    "#8a77d1", "snubbull":   "#e57470", "granbull":   "#ea86ba", 
    "qwilfish":   "#1f308a", "scizor":     "#d3484d", "shuckle":    "#975026", 
    "heracross":  "#1f5473", "sneasel":    "#624b21", "teddiursa":  "#b07030", 
    "ursaring":   "#c97103", "slugma":     "#d96706", "magcargo":   "#cd527e", 
    "swinub":     "#be5e5f", "piloswine":  "#bc977d", "corsola":    "#ed5ff1", 
    "remoraid":   "#634ecd", "octillery":  "#fc3319", "delibird":   "#f83b04", 
    "mantine":    "#29349e", "skarmory":   "#273444", "houndour":   "#2d0000", 
    "houndoom":   "#460000", "kingdra":    "#2254f5", "phanpy":     "#90a6d8", 
    "donphan":    "#909f98", "porygon2":   "#cd4a4f", "stantler":   "#b57535", 
    "smeargle":   "#bca84f", "tyrogue":    "#ad7580", "hitmontop":  "#d87e97", 
    "smoochum":   "#94127c", "elekid":     "#fbf959", "magby":      "#bc4a54", 
    "miltank":    "#d67996", "blissey":    "#ef6273", "raikou":     "#f9f134", 
    "entei":      "#ef5b13", "suicune":    "#6ebde4", "larvitar":   "#6dc01a", 
    "pupitar":    "#5e55e4", "tyranitar":  "#87d622", "lugia":      "#bd8bd2", 
    "ho-oh":      "#ff3213", "celebi":     "#54fa00", "egg":        "#f4d05e"
};
