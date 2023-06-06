package com.travelApp.travelApp.model.payload.itinerary.openRouteService.optimization;

import java.util.List;

public class OpenRouteServiceOptimizationResponse {
	private int code;
	private Summary summary;
	private List<UnassignedJob> unassigned;
	private List<Route> routes;

	public OpenRouteServiceOptimizationResponse() {

	}

	public OpenRouteServiceOptimizationResponse(int code, Summary summary, List<UnassignedJob> unassigned, List<Route> routes) {
		super();
		this.code = code;
		this.summary = summary;
		this.unassigned = unassigned;
		this.routes = routes;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public Summary getSummary() {
		return summary;
	}

	public void setSummary(Summary summary) {
		this.summary = summary;
	}

	public List<UnassignedJob> getUnassigned() {
		return unassigned;
	}

	public void setUnassigned(List<UnassignedJob> unassigned) {
		this.unassigned = unassigned;
	}

	public List<Route> getRoutes() {
		return routes;
	}

	public void setRoutes(List<Route> routes) {
		this.routes = routes;
	}
}
