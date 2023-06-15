package com.travelApp.travelApp.model.payload.itinerary;

import java.util.ArrayList;
import java.util.List;

import com.travelApp.travelApp.model.payload.itinerary.openRouteService.optimization.Step;

public class ItineraryPayload {
	private List<ItineraryLocation> locations;
	private RouteOptions routeOptions;

	public ItineraryPayload() {

	}

	public ItineraryPayload(List<ItineraryLocation> locations, RouteOptions routeOptions) {
		super();
		this.locations = locations;
		this.routeOptions = routeOptions;
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



	public void sortLocations(List<Step> steps) {
		List<ItineraryLocation> sortedLocations = new ArrayList<>();
		for (Step step : steps) {
			for (ItineraryLocation location : this.locations) {
				if (location.equals(step)) {
					sortedLocations.add(location);
					break;
				}
			}
		}
		this.locations = sortedLocations;

	}
}
