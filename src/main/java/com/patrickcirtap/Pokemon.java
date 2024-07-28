package com.patrickcirtap;

public class Pokemon  {
    private final String name;
    private volatile boolean isAvailable;

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
        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append("{");

        stringBuilder.append("\"name\":\"");
        stringBuilder.append(name);
        stringBuilder.append("\"");

        stringBuilder.append(",\"isAvailable\":\"");
        stringBuilder.append(isAvailable);
        stringBuilder.append("\"");

        stringBuilder.append("}");

        return stringBuilder.toString();
    }
}
