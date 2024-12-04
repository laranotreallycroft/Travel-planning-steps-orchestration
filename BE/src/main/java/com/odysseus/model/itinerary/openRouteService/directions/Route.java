package com.odysseus.model.itinerary.openRouteService.directions;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Route {
    private List<Segment> segments;
    private String geometry;

    public Route() {

    }

    public Route(List<Segment> segments, String geometry) {
        super();
        this.segments = segments;
        this.geometry = geometry;
    }

    public List<Segment> getSegments() {
        return segments;
    }

    public void setSegments(List<Segment> segments) {
        this.segments = segments;
    }

    public String getGeometry() {
        return geometry;
    }

    public void setGeometry(String geometry) {
        this.geometry = geometry;
    }

}
