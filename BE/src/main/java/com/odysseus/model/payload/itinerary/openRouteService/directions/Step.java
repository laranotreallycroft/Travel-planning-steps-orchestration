package com.odysseus.model.payload.itinerary.openRouteService.directions;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Step {
    private double distance;
    private double duration;
    private String name;
    private int[] way_points;

    public Step() {

    }

    public Step(double distance, double duration, String name, int[] way_points) {
        super();
        this.distance = distance;
        this.duration = duration;
        this.name = name;
        this.way_points = way_points;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int[] getWay_points() {
        return way_points;
    }

    public void setWay_points(int[] way_points) {
        this.way_points = way_points;
    }

}
