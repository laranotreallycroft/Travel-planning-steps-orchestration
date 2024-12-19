package com.odysseus.model.trip;

import com.odysseus.model.location.LocationRequest;

import java.time.LocalDate;

public class TripUpdateRequest {

    private Long id;
    private String label;
    private LocalDate dateFrom;
    private LocalDate dateTo;
    private LocationRequest location;

    public TripUpdateRequest() {

    }

    public TripUpdateRequest(String label, Long id, LocalDate dateFrom, LocalDate dateTo, String locationLabel,
                             LocationRequest location) {
        super();
        this.label = label;
        this.id = id;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.location = location;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocationRequest getLocation() {
        return location;
    }

    public void setLocation(LocationRequest location) {
        this.location = location;
    }

}
