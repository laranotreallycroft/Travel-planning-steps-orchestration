package com.odysseus.model.payload.itinerary;

import java.util.List;

import com.odysseus.model.payload.common.Coordinates;
import com.odysseus.model.payload.common.LocationPayload;

public class ItineraryLocation extends LocationPayload {
    private Integer duration;

    public ItineraryLocation() {

    }

    public ItineraryLocation(List<LocationPayload> locations, Integer duration) {
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
