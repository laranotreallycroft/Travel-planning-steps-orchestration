package com.odysseus.model.location;

public class LocationRequest {

    private Long id;
    private Coordinates coordinates;
    private String label;

    public LocationRequest() {

    }

    public LocationRequest(Coordinates coordinates, String label) {
        super();
        this.coordinates = coordinates;
        this.label = label;
    }

    public LocationRequest(Long id, Coordinates coordinates, String label) {
        super();
        this.id = id;
        this.coordinates = coordinates;
        this.label = label;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
