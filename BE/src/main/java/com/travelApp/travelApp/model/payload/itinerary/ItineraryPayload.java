package com.travelApp.travelApp.model.payload.itinerary;

import java.time.LocalDate;
import java.util.List;

import com.travelApp.travelApp.model.payload.common.GeosearchPayload;

public class ItineraryPayload {
	private LocalDate date;
	private List<GeosearchPayload> locations;
	private RouteOptions routeOptions;

	public ItineraryPayload() {

	}

	public ItineraryPayload(LocalDate date, List<GeosearchPayload> locations, RouteOptions routeOptions) {
		super();
		this.date = date;
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

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

}
