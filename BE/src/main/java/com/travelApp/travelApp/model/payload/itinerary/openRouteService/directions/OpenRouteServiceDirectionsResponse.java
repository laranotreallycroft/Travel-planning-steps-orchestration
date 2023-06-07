package com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OpenRouteServiceDirectionsResponse {

	private List<Route> routes;

	public OpenRouteServiceDirectionsResponse() {

	}

	public OpenRouteServiceDirectionsResponse(List<Route> routes) {
		super();
		this.routes = routes;
	}

	public List<Route> getRoutes() {
		return routes;
	}

	public void setRoutes(List<Route> routes) {
		this.routes = routes;
	}

	public boolean routeFound() {
		return routes.get(0).getSegments() != null;
	}

	public List<Segment> getSegments() {
		return routes.get(0).getSegments();
	}

	public String getGeometry() {
		return routes.get(0).getGeometry();
	}

}
