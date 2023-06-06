package com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions;

public class Engine {
	private String version;
	private String build_date;
	private String graph_date;

	public Engine() {

	}

	public Engine(String version, String build_date, String graph_date) {
		super();
		this.version = version;
		this.build_date = build_date;
		this.graph_date = graph_date;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getBuild_date() {
		return build_date;
	}

	public void setBuild_date(String build_date) {
		this.build_date = build_date;
	}

	public String getGraph_date() {
		return graph_date;
	}

	public void setGraph_date(String graph_date) {
		this.graph_date = graph_date;
	}

}