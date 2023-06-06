package com.travelApp.travelApp.model.payload.itinerary;

import com.travelApp.travelApp.model.payload.common.PointPayload;

public class ItineraryPayload {

	private PointPayload[] locations;
	private RouteOptions routeOptions;

	public ItineraryPayload() {

	}

	public ItineraryPayload(PointPayload[] locations, RouteOptions routeOptions) {
		super();
		this.locations = locations;
		this.routeOptions = routeOptions;
	}

	public PointPayload[] getLocations() {
		return locations;
	}

	public void setLocations(PointPayload[] locations) {
		this.locations = locations;
	}

	public RouteOptions getRouteOptions() {
		return routeOptions;
	}

	public void setRouteOptions(RouteOptions routeOptions) {
		this.routeOptions = routeOptions;
	}

}
