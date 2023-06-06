package com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions;

import java.util.List;

public class OpenRouteServiceDirectionsResponse {

	private List<Route> routes;
	private double[] bbox;
	private Metadata metadata;

	public OpenRouteServiceDirectionsResponse() {

	}

	public OpenRouteServiceDirectionsResponse(List<Route> routes, double[] bbox, Metadata metadata) {
		super();
		this.routes = routes;
		this.bbox = bbox;
		this.metadata = metadata;
	}

	public List<Route> getRoutes() {
		return routes;
	}

	public void setRoutes(List<Route> routes) {
		this.routes = routes;
	}

	public double[] getBbox() {
		return bbox;
	}

	public void setBbox(double[] bbox) {
		this.bbox = bbox;
	}

	public Metadata getMetadata() {
		return metadata;
	}

	public void setMetadata(Metadata metadata) {
		this.metadata = metadata;
	}

}
