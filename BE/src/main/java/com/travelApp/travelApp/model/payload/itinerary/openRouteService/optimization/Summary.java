package com.travelApp.travelApp.model.payload.itinerary.openRouteService.optimization;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Summary {
	private int duration;

	public Summary() {

	}

	public Summary(int duration) {
		super();
		this.duration = duration;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

}