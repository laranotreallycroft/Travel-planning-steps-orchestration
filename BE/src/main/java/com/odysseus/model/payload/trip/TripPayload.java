package com.odysseus.model.payload.trip;

import java.time.LocalDate;

import com.odysseus.model.payload.common.Location;

public class TripPayload {

    private String label;
    private Long userId;
    private LocalDate dateFrom;
    private LocalDate dateTo;
    private Location location;

    public TripPayload() {

    }

    public TripPayload(String label, Long userId, LocalDate dateFrom, LocalDate dateTo, String locationLabel,
                       Location location) {
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

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

}
