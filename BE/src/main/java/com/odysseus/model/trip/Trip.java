package com.odysseus.model.trip;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import com.odysseus.model.itinerary.Itinerary;
import com.odysseus.model.location.Location;
import com.odysseus.model.packingList.PackingList;
import com.odysseus.model.user.User;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "trips")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String label;

    @Column(name = "date_from")
    private LocalDate dateFrom;
    @Column(name = "date_to")
    private LocalDate dateTo;

    @ManyToOne
    @JoinColumn(name = "location_id")
    @JsonIgnoreProperties("trips")
    private Location location;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("trip")
    private List<PackingList> packingLists;

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("trip")
    private List<Itinerary> itineraries;

    public Trip() {

    }

    public Trip(String label, LocalDate dateFrom, LocalDate dateTo, Location location, User user) {
        super();
        this.label = label;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.location = location;
        this.user = user;
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

    public LocalDate getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(LocalDate dateFrom) {
        this.dateFrom = dateFrom;
    }

    public LocalDate getDateTo() {
        return dateTo;
    }

    public void setDateTo(LocalDate dateTo) {
        this.dateTo = dateTo;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<PackingList> getPackingLists() {
        if (packingLists != null)
            packingLists.sort(Comparator.comparing(PackingList::getId));
        return packingLists;
    }

    public void setPackingLists(List<PackingList> packingLists) {
        this.packingLists = packingLists;
    }

    public List<Itinerary> getItineraries() {
        return itineraries;
    }

    public void setItineraries(List<Itinerary> itineraries) {
        this.itineraries = itineraries;
    }

    public void addItinerary(Itinerary itinerary) {
        if (itineraries == null)
            itineraries = new ArrayList<>();
        itineraries.add(itinerary);
    }

    public void removeItinerary(Itinerary itinerary) {
        itineraries.remove(itinerary);
    }

    public Itinerary findItineraryWithDate(LocalDate date) {
        for (Itinerary itinerary : itineraries) {
            if (itinerary.getDate().equals(date)) {
                return itinerary;
            }
        }
        Itinerary newItinerary = new Itinerary(this, date, itineraries.get(0).getTransportationMethod());
        addItinerary(newItinerary);
        return newItinerary;
    }

    public boolean hasDateToPassed() {
        return dateTo != null && dateTo.isBefore(LocalDate.now());
    }

}
