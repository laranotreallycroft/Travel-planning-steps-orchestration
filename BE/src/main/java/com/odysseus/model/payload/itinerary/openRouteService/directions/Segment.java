package com.odysseus.model.payload.itinerary.openRouteService.directions;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Segment {
    private double distance;
    private double duration;
    private List<Step> steps;

    public Segment() {

    }

    public Segment(double distance, double duration, List<Step> steps) {
        super();
        this.distance = distance;
        this.duration = duration;
        this.steps = steps;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }

    public List<Step> getSteps() {
        return steps;
    }

    public void setSteps(List<Step> steps) {
        this.steps = steps;
    }

}
