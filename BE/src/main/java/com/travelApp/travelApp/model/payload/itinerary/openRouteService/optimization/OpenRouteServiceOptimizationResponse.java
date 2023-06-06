package com.travelApp.travelApp.model.payload.itinerary.openRouteService.optimization;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OpenRouteServiceOptimizationResponse {

	private Summary summary;
	private List<Route> routes;

	public OpenRouteServiceOptimizationResponse() {

	}

	public OpenRouteServiceOptimizationResponse(Summary summary, List<Route> routes) {
		super();
		this.summary = summary;
		this.routes = routes;
	}

	public Summary getSummary() {
		return summary;
	}

	public void setSummary(Summary summary) {
		this.summary = summary;
	}

	public List<Route> getRoutes() {
		return routes;
	}

	public void setRoutes(List<Route> routes) {
		this.routes = routes;
	}
}
