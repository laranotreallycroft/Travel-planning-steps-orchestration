package com.forgetMeNot.model.payload.itinerary;

import java.util.List;

import com.forgetMeNot.model.payload.common.GeosearchPayload;

public class ItineraryLocation extends GeosearchPayload {
	private Integer duration;

	public ItineraryLocation() {

	}

	public ItineraryLocation(List<GeosearchPayload> locations, RouteOptions routeOptions, Integer duration) {
		super();
		this.duration = duration;
	}

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

}
