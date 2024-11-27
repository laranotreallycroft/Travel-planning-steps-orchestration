package com.odysseus.model.payload.common;

public class Location {

    private String id;
    private Coordinates coordinates;
    private String label;

    public Location() {

    }

    public Location(Coordinates coordinates, String label) {
        super();
        this.coordinates = coordinates;
        this.label = label;
    }

    public Location(String id, Coordinates coordinates, String label) {
        super();
        this.id = id;
        this.coordinates = coordinates;
        this.label = label;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Coordinates getCoordinates() {
        return coordinates;
    }


}
