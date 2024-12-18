package com.odysseus.model.itinerary;

import com.odysseus.model.location.LocationRequest;

public class ItineraryElementRequest {
    private Integer duration;
    private LocationRequest location;
    private boolean start;

    public ItineraryElementRequest() {

    }

    public ItineraryElementRequest(Integer duration, LocationRequest location, boolean start) {
        this.duration = duration;
        this.location = location;
        this.start = start;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public LocationRequest getLocation() {
        return location;
    }

    public void setLocation(LocationRequest location) {
        this.location = location;
    }

    public boolean getStart() {
        return start;
    }

    public void setStart(boolean start) {
        this.start = start;
    }
}
