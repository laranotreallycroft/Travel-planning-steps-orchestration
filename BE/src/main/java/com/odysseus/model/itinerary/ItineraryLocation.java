package com.odysseus.model.itinerary;

import java.util.List;

import com.odysseus.model.location.Coordinates;
import com.odysseus.model.location.LocationRequest;

public class ItineraryLocation extends LocationRequest {
    private Integer duration;

    public ItineraryLocation() {

    }

    public ItineraryLocation(List<LocationRequest> locations, Integer duration) {
        super();
        this.duration = duration;
    }

    public ItineraryLocation(Long id, Coordinates coordinates, String label, Integer duration) {
        super(id, coordinates, label);
        this.duration = duration;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

}
