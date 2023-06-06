package com.travelApp.travelApp.model.payload.itinerary.openRouteService.optimization;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Step {
	private List<Double> location;
	private int arrival;
	private int duration;

	public Step() {

	}

	public Step(List<Double> location, int arrival, int duration) {
		super();
		this.location = location;
		this.arrival = arrival;
		this.duration = duration;
	}

	public List<Double> getLocation() {
		return location;
	}

	public void setLocation(List<Double> location) {
		this.location = location;
	}

	public int getArrival() {
		return arrival;
	}

	public void setArrival(int arrival) {
		this.arrival = arrival;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public Double getX() {
		return location.get(0);
	}

	public Double getY() {
		return location.get(1);
	}

}
