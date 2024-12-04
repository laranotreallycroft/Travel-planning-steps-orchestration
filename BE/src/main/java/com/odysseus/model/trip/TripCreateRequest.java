package com.odysseus.model.trip;

import java.time.LocalDate;

import com.odysseus.model.location.LocationRequest;

public class TripCreateRequest {

    private String label;
    private Long userId;
    private LocalDate dateFrom;
    private LocalDate dateTo;
    private LocationRequest location;

    public TripCreateRequest() {

    }

    public TripCreateRequest(String label, Long userId, LocalDate dateFrom, LocalDate dateTo, String locationLabel,
                             LocationRequest location) {
        super();
        this.label = label;
        this.userId = userId;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
