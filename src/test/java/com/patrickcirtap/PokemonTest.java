package com.patrickcirtap;

import org.junit.Assert;
import org.junit.Test;

public class PokemonTest {
    private final String testPokemonName = "TestPokemon";

    @Test
    public void testGetPokemonName() {
        final Pokemon testPokemon = new Pokemon(testPokemonName);

        Assert.assertEquals(testPokemon.getName(), testPokemonName);
    }

    @Test
    public void testPokemonSetIsAvailableGetIsAvailable() {
        final Pokemon testPokemon = new Pokemon(testPokemonName);

        testPokemon.setIsAvailable(false);

        Assert.assertFalse(testPokemon.getIsAvailable());
    }

    @Test
    public void testPokemonToJSONString() {
        final Pokemon testPokemon = new Pokemon(testPokemonName);
        final String expectedPokemonJSONString = "{\"name\":\"" + testPokemonName + "\",\"isAvailable\":\"true\"}";

        Assert.assertEquals(testPokemon.toString(), expectedPokemonJSONString);
    }
}
