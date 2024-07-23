package com.patrickcirtap;

import com.google.gson.Gson;

import java.io.IOException;
import java.util.Arrays;
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
            new Pokemon("pikachu"),
            new Pokemon("raichu"),
            new Pokemon("onix"),
            new Pokemon("scyther"),
            new Pokemon("gyarados"),
            new Pokemon("lapras"),
            new Pokemon("snorlax"),
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
            new Pokemon("feraligatr")
    );
    private final Gson gson = new Gson();

    @OnOpen
    public void onOpen(Session session) throws IOException {
        System.out.println("WebSocket opened: " + session.getId());
        sendPokemonChoicesToNewUser(session);
    }

    @OnMessage
    public void onMessage(String msg, Session session) {
        System.out.println("Message received from " + session.getId() + ": " + msg);
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println("WebSocket closed: " + session.getId());
    }

    @OnError
    public void onError(Session session, Throwable t) {
        System.out.println("WebSocket error: " + session.getId() + ": " + t.getMessage());
    }

    private void sendPokemonChoicesToNewUser(Session session) throws IOException {
        final String allPokemonString = allPokemon.toString();
        final Message pokemonChoicesMessage = new Message(MessageType.POKEMON_CHOICES, "server", allPokemonString);
        final String pokemonChoicesMessageString = gson.toJson(pokemonChoicesMessage);

        session.getBasicRemote().sendText(pokemonChoicesMessageString);
    }
}
