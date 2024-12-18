package com.odysseus.model.itinerary;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import com.odysseus.model.trip.Trip;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.LineString;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "itineraries")
public class Itinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    @Column(name = "route_geometry")
    private LineString routeGeometry;

    @ManyToOne
    @JoinColumn(name = "trip_id")
    @JsonIgnoreProperties("itinerary")
    private Trip trip;

    @OneToMany(mappedBy = "itinerary", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("itinerary")
    private List<ItineraryElement> itineraryElements;

    private String transportationMethod;

    public Itinerary() {

    }

    public Itinerary(Trip trip, LocalDate date, String transportationMethod) {
        super();
        this.trip = trip;
        this.date = date;
        this.itineraryElements = new ArrayList<>();
        this.transportationMethod = transportationMethod;
    }

    public Itinerary(Trip trip, LocalDate date, LineString routeGeometry, String transportationMethod) {
        super();
        this.trip = trip;
        this.date = date;
        this.routeGeometry = routeGeometry;
        this.transportationMethod = transportationMethod;
    }

    public String getTransportationMethod() {
        return transportationMethod;
    }

    public void setTransportationMethod(String transportationMethod) {
        this.transportationMethod = transportationMethod;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<ItineraryElement> getItineraryElements() {
        return itineraryElements;
    }

    public void setItineraryElements(List<ItineraryElement> itineraryElements) {
        this.itineraryElements = itineraryElements;
    }

    public Coordinate[] getRouteGeometry() {
        if (routeGeometry != null)
            return routeGeometry.getCoordinates();
        return null;
    }

    public void setRouteGeometry(LineString routeGeometry) {
        this.routeGeometry = routeGeometry;
    }

    public void addItineraryElement(ItineraryElement itineraryElement) {
        if (this.itineraryElements == null)
            itineraryElements = new ArrayList<>();
        this.itineraryElements.add(itineraryElement);
    }

    public void removeItineraryElement(ItineraryElement itineraryElement) {
        this.itineraryElements.remove(itineraryElement);
    }

    public void sortElementsAsc() {
        itineraryElements.sort(Comparator.comparing(ItineraryElement::getStartDate));
    }

}
