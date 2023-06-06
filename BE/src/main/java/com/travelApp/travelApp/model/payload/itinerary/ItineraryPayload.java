package com.travelApp.travelApp.model.payload.itinerary;

import java.util.List;

import com.travelApp.travelApp.model.payload.common.GeosearchPayload;

public class ItineraryPayload {

	private List<GeosearchPayload> locations;
	private RouteOptions routeOptions;

	public ItineraryPayload() {

	}

	public ItineraryPayload(List<GeosearchPayload> locations, RouteOptions routeOptions) {
		super();
		this.locations = locations;
		this.routeOptions = routeOptions;
	}

	public List<GeosearchPayload> getLocations() {
		return locations;
	}

	public void setLocations(List<GeosearchPayload> locations) {
		this.locations = locations;
	}

	public RouteOptions getRouteOptions() {
		return routeOptions;
	}

	public void setRouteOptions(RouteOptions routeOptions) {
		this.routeOptions = routeOptions;
	}

}
