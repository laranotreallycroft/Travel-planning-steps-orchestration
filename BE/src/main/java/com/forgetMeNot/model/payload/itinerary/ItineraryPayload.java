package com.forgetMeNot.model.payload.itinerary;

import java.util.List;

public class ItineraryPayload {
	private List<ItineraryLocation> locations;
	private RouteOptions routeOptions;
	private Long tripId;

	public ItineraryPayload() {

	}

	public ItineraryPayload(List<ItineraryLocation> locations, RouteOptions routeOptions, Long tripId) {
		super();
		this.locations = locations;
		this.routeOptions = routeOptions;
		this.tripId = tripId;
	}

	public List<ItineraryLocation> getLocations() {
		return locations;
	}

	public void setLocations(List<ItineraryLocation> locations) {
		this.locations = locations;
	}

	public RouteOptions getRouteOptions() {
		return routeOptions;
	}

	public void setRouteOptions(RouteOptions routeOptions) {
		this.routeOptions = routeOptions;
	}

	public Long getTripId() {
		return tripId;
	}

	public void setTripId(Long tripId) {
		this.tripId = tripId;
	}

}
