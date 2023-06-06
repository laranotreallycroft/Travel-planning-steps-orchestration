package com.travelApp.travelApp.model.payload.itinerary.openRouteService.optimization;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Route {
	private int duration;
	private List<Step> steps;

	public Route() {

	}

	public Route(int duration, List<Step> steps) {
		super();
		this.duration = duration;
		this.steps = steps;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public List<Step> getSteps() {
		return steps;
	}

	public void setSteps(List<Step> steps) {
		this.steps = steps;
	}

}
