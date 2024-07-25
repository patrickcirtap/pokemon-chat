package com.patrickcirtap;

import com.google.gson.Gson;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/pokemon-chat")
public class PokemonChat {
    // TODO - proper logging
    // TODO - proper exception handling
    // TODO - look into async message sending
    // TODO - synchronise accessing allPokemon
    // TODO - consider only sending non-available pkmn when showing user options

    private static final List<Pokemon> allPokemon = Arrays.asList(
        new Pokemon("bulbasaur"),
        new Pokemon("ivysaur"),
        new Pokemon("venusaur"),
        new Pokemon("charmander"),
        new Pokemon("charmeleon"),
        new Pokemon("charizard"),
        new Pokemon("squirtle"),
        new Pokemon("wartortle"),
        new Pokemon("blastoise"),
        new Pokemon("caterpie"),
        new Pokemon("metapod"),
        new Pokemon("butterfree"),
        new Pokemon("weedle"),
        new Pokemon("kakuna"),
        new Pokemon("beedrill"),
        new Pokemon("pidgey"),
        new Pokemon("pidgeotto"),
        new Pokemon("pidgeot"),
        new Pokemon("rattata"),
        new Pokemon("raticate"),
        new Pokemon("spearow"),
        new Pokemon("fearow"),
        new Pokemon("ekans"),
        new Pokemon("arbok"),
        new Pokemon("pikachu"),
        new Pokemon("raichu"),
        new Pokemon("sandshrew"),
        new Pokemon("sandslash"),
        new Pokemon("nidoran♀"),
        new Pokemon("nidorina"),
        new Pokemon("nidoqueen"),
        new Pokemon("nidoran♂"),
        new Pokemon("nidorino"),
        new Pokemon("nidoking"),
        new Pokemon("clefairy"),
        new Pokemon("clefable"),
        new Pokemon("vulpix"),
        new Pokemon("ninetales"),
        new Pokemon("jigglypuff"),
        new Pokemon("wigglytuff"),
        new Pokemon("zubat"),
        new Pokemon("golbat"),
        new Pokemon("oddish"),
        new Pokemon("gloom"),
        new Pokemon("vileplume"),
        new Pokemon("paras"),
        new Pokemon("parasect"),
        new Pokemon("venonat"),
        new Pokemon("venomoth"),
        new Pokemon("diglett"),
        new Pokemon("dugtrio"),
        new Pokemon("meowth"),
        new Pokemon("persian"),
        new Pokemon("psyduck"),
        new Pokemon("golduck"),
        new Pokemon("mankey"),
        new Pokemon("primeape"),
        new Pokemon("growlithe"),
        new Pokemon("arcanine"),
        new Pokemon("poliwag"),
        new Pokemon("poliwhirl"),
        new Pokemon("poliwrath"),
        new Pokemon("abra"),
        new Pokemon("kadabra"),
        new Pokemon("alakazam"),
        new Pokemon("machop"),
        new Pokemon("machoke"),
        new Pokemon("machamp"),
        new Pokemon("bellsprout"),
        new Pokemon("weepinbell"),
        new Pokemon("victreebel"),
        new Pokemon("tentacool"),
        new Pokemon("tentacruel"),
        new Pokemon("geodude"),
        new Pokemon("graveler"),
        new Pokemon("golem"),
        new Pokemon("ponyta"),
        new Pokemon("rapidash"),
        new Pokemon("slowpoke"),
        new Pokemon("slowbro"),
        new Pokemon("magnemite"),
        new Pokemon("magneton"),
        new Pokemon("farfetch'd"),
        new Pokemon("doduo"),
        new Pokemon("dodrio"),
        new Pokemon("seel"),
        new Pokemon("dewgong"),
        new Pokemon("grimer"),
        new Pokemon("muk"),
        new Pokemon("shellder"),
        new Pokemon("cloyster"),
        new Pokemon("gastly"),
        new Pokemon("haunter"),
        new Pokemon("gengar"),
        new Pokemon("onix"),
        new Pokemon("drowzee"),
        new Pokemon("hypno"),
        new Pokemon("krabby"),
        new Pokemon("kingler"),
        new Pokemon("voltorb"),
        new Pokemon("electrode"),
        new Pokemon("exeggcute"),
        new Pokemon("exeggutor"),
        new Pokemon("cubone"),
        new Pokemon("marowak"),
        new Pokemon("hitmonlee"),
        new Pokemon("hitmonchan"),
        new Pokemon("lickitung"),
        new Pokemon("koffing"),
        new Pokemon("weezing"),
        new Pokemon("rhyhorn"),
        new Pokemon("rhydon"),
        new Pokemon("chansey"),
        new Pokemon("tangela"),
        new Pokemon("kangaskhan"),
        new Pokemon("horsea"),
        new Pokemon("seadra"),
        new Pokemon("goldeen"),
        new Pokemon("seaking"),
        new Pokemon("staryu"),
        new Pokemon("starmie"),
        new Pokemon("mr. mime"),
        new Pokemon("scyther"),
        new Pokemon("jynx"),
        new Pokemon("electabuzz"),
        new Pokemon("magmar"),
        new Pokemon("pinsir"),
        new Pokemon("tauros"),
        new Pokemon("magikarp"),
        new Pokemon("gyarados"),
        new Pokemon("lapras"),
        new Pokemon("ditto"),
        new Pokemon("eevee"),
        new Pokemon("vaporeon"),
        new Pokemon("jolteon"),
        new Pokemon("flareon"),
        new Pokemon("porygon"),
        new Pokemon("omanyte"),
        new Pokemon("omastar"),
        new Pokemon("kabuto"),
        new Pokemon("kabutops"),
        new Pokemon("aerodactyl"),
        new Pokemon("snorlax"),
        new Pokemon("articuno"),
        new Pokemon("zapdos"),
        new Pokemon("moltres"),
        new Pokemon("dratini"),
        new Pokemon("dragonair"),
        new Pokemon("dragonite"),
        new Pokemon("mewtwo"),
        new Pokemon("mew"),
        new Pokemon("chikorita"),
        new Pokemon("bayleef"),
        new Pokemon("meganium"),
        new Pokemon("cyndaquil"),
        new Pokemon("quilava"),
        new Pokemon("typhlosion"),
        new Pokemon("totodile"),
        new Pokemon("croconaw"),
        new Pokemon("feraligatr"),
        new Pokemon("sentret"),
        new Pokemon("furret"),
        new Pokemon("hoothoot"),
        new Pokemon("noctowl"),
        new Pokemon("ledyba"),
        new Pokemon("ledian"),
        new Pokemon("spinarak"),
        new Pokemon("ariados"),
        new Pokemon("crobat"),
        new Pokemon("chinchou"),
        new Pokemon("lanturn"),
        new Pokemon("pichu"),
        new Pokemon("cleffa"),
        new Pokemon("igglybuff"),
        new Pokemon("togepi"),
        new Pokemon("togetic"),
        new Pokemon("natu"),
        new Pokemon("xatu"),
        new Pokemon("mareep"),
        new Pokemon("flaaffy"),
        new Pokemon("ampharos"),
        new Pokemon("bellossom"),
        new Pokemon("marill"),
        new Pokemon("azumarill"),
        new Pokemon("sudowoodo"),
        new Pokemon("politoed"),
        new Pokemon("hoppip"),
        new Pokemon("skiploom"),
        new Pokemon("jumpluff"),
        new Pokemon("aipom"),
        new Pokemon("sunkern"),
        new Pokemon("sunflora"),
        new Pokemon("yanma"),
        new Pokemon("wooper"),
        new Pokemon("quagsire"),
        new Pokemon("espeon"),
        new Pokemon("umbreon"),
        new Pokemon("murkrow"),
        new Pokemon("slowking"),
        new Pokemon("misdreavus"),
        new Pokemon("unknown"),
        new Pokemon("wobbuffet"),
        new Pokemon("girafarig"),
        new Pokemon("pineco"),
        new Pokemon("forretress"),
        new Pokemon("dunsparce"),
        new Pokemon("gligar"),
        new Pokemon("steelix"),
        new Pokemon("snubbull"),
        new Pokemon("granbull"),
        new Pokemon("qwilfish"),
        new Pokemon("scizor"),
        new Pokemon("shuckle"),
        new Pokemon("heracross"),
        new Pokemon("sneasel"),
        new Pokemon("teddiursa"),
        new Pokemon("ursaring"),
        new Pokemon("slugma"),
        new Pokemon("magcargo"),
        new Pokemon("swinub"),
        new Pokemon("piloswine"),
        new Pokemon("corsola"),
        new Pokemon("remoraid"),
        new Pokemon("octillery"),
        new Pokemon("delibird"),
        new Pokemon("mantine"),
        new Pokemon("skarmory"),
        new Pokemon("houndour"),
        new Pokemon("houndoom"),
        new Pokemon("kingdra"),
        new Pokemon("phanpy"),
        new Pokemon("donphan"),
        new Pokemon("porygon2"),
        new Pokemon("stantler"),
        new Pokemon("smeargle"),
        new Pokemon("tyrogue"),
        new Pokemon("hitmontop"),
        new Pokemon("smoochum"),
        new Pokemon("elekid"),
        new Pokemon("magby"),
        new Pokemon("miltank"),
        new Pokemon("blissey"),
        new Pokemon("raikou"),
        new Pokemon("entei"),
        new Pokemon("suicune"),
        new Pokemon("larvitar"),
        new Pokemon("pupitar"),
        new Pokemon("tyranitar"),
        new Pokemon("lugia"),
        new Pokemon("ho-oh"),
        new Pokemon("celebi"),
        new Pokemon("egg")
    );
    private static final HashMap<Session, Pokemon> sessions = new HashMap<>();
    private final Gson gson = new Gson();
    private static final String SERVER_NAME = "server";

    @OnOpen
    public void onOpen(Session session) throws IOException {
        System.out.println("WebSocket opened: " + session.getId());
        sendPokemonChoicesToNewUser(session);
    }

    @OnMessage
    public void onMessage(String msg, Session session) throws IOException {
        System.out.println("Message received from " + session.getId() + ": " + msg);

        Message message;
        try {
            message = gson.fromJson(msg, Message.class);
        } catch(Exception e) {
            System.out.println("ERROR parsing onMessage");
            return;
        }

        switch(message.getType()) {
            case JOIN_REQUEST:
                checkJoinRequest(session, message.getContent());
                break;
            case NEW_USER_MESSAGE:
                final String messageSender = sessions.get(session).getName();
                broadcastMessage(message.getType(), messageSender, message.getContent());
                break;
            default:
                // TODO - handle unknown message type
                break;
        }
    }

    @OnClose
    public void onClose(Session session) throws IOException {
        System.out.println("WebSocket closed: " + session.getId());
        handleUserLeave(session);
    }

    @OnError
    public void onError(Session session, Throwable t) {
        System.out.println("WebSocket error: " + session.getId() + ": " + t.getMessage());
        // TODO - handle onError
    }

    private void sendPokemonChoicesToNewUser(Session session) throws IOException {
        final String allPokemonString = allPokemon.toString();
        final Message pokemonChoicesMessage = new Message(MessageType.POKEMON_CHOICES, SERVER_NAME, allPokemonString);
        final String pokemonChoicesMessageString = gson.toJson(pokemonChoicesMessage);

        session.getBasicRemote().sendText(pokemonChoicesMessageString);
    }

    private void checkJoinRequest(Session session, String requestedPokemonName) throws IOException {
        for(Pokemon pokemon : allPokemon) {
            if(pokemon.getName().equals(requestedPokemonName) && pokemon.getIsAvailable()) {
                confirmNewUser(session, pokemon);
                return;
            }
        }

        rejectNewUser(session);
    }

    private void confirmNewUser(Session session, Pokemon pokemon) throws IOException {
        final String joinedPokemonName = pokemon.getName();
        pokemon.setIsAvailable(false);
        final String allConnectedPokemonString = sessions.values().toString();
        Message newUserJoinMessage = new Message(MessageType.JOIN_CONFIRM, joinedPokemonName, allConnectedPokemonString);
        final String newUserJoinMessageString = gson.toJson(newUserJoinMessage);

        session.getBasicRemote().sendText(newUserJoinMessageString);

        sessions.put(session, pokemon);
        broadcastMessage(MessageType.NEW_USER_JOIN, SERVER_NAME, joinedPokemonName);
    }

    private void rejectNewUser(Session session) throws IOException {
        final String allPokemonString = allPokemon.toString();
        Message joinRejectMessage = new Message(MessageType.JOIN_REJECT, SERVER_NAME, allPokemonString);
        final String joinRejectMessageString = gson.toJson(joinRejectMessage);

        session.getBasicRemote().sendText(joinRejectMessageString);
    }

    private void handleUserLeave(Session session) throws IOException {
        final String leavingPokemonName = sessions.get(session).getName();
        sessions.get(session).setIsAvailable(true);
        sessions.remove(session);

        broadcastMessage(MessageType.USER_LEAVE, SERVER_NAME, leavingPokemonName);
    }

    private void broadcastMessage(MessageType type, String sender, String content) throws IOException {
        final Message newMessage = new Message(type, sender, content);
        final String newMessageString = gson.toJson(newMessage);

        for(Session session : sessions.keySet()) {
            session.getBasicRemote().sendText(newMessageString);
        }
    }
}
