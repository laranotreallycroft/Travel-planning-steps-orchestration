package com.odysseus.model.payload.itinerary;

import java.util.List;

import com.odysseus.model.payload.common.GeosearchPayload;

public class ItineraryLocation extends GeosearchPayload {
    private Integer duration;

    public ItineraryLocation() {

    }

    public ItineraryLocation(List<GeosearchPayload> locations, Integer duration) {
        super();
        this.duration = duration;
    }

    public ItineraryLocation(String id, Double x, Double y, String label, Integer duration) {
        super(id, x, y, label);
        this.duration = duration;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

}
