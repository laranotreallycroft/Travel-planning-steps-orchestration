package com.odysseus.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.Point;

import java.util.Comparator;
import java.util.List;

@Entity
@Table(name = "locations")
public class Location {

    @Id
    private Long id;

    private String label;

    private Point coordinates;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("location")
    private List<Trip> trips;

    public Location() {

    }

    public Location(Long id, String label, Point coordinates) {
        super();
        this.id = id;
        this.label = label;
        this.coordinates = coordinates;
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


    public Coordinate getCoordinates() {
        return coordinates.getCoordinate();
    }

    public void setCoordinates(Point location) {
        this.coordinates = location;
    }


    public List<Trip> getTrips() {
        if (trips != null)
            trips.sort(Comparator.comparing(Trip::getId));
        return trips;
    }

    public void setPackingLists(List<Trip> trips) {
        this.trips = trips;
    }


}
