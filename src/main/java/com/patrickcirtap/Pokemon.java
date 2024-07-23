package com.patrickcirtap;

public class Pokemon  {
    private final String name;
    private boolean isAvailable;

    public Pokemon(String name) {
        this.name = name;
        this.isAvailable = true;
    }

    public String getName() {
        return name;
    }

    public void setIsAvailable(boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public boolean getIsAvailable() {
        return this.isAvailable;
    }

    @Override
    public String toString() {
        // TODO - use stringbuilder
        return "{\"name\":\"" + this.name +
                "\",\"isAvailable\":\"" + this.isAvailable +
                "\"}";
    }
}
