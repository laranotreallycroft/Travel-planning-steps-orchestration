package com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Route {
	private Summary summary;
	private List<Segment> segments;
	private String geometry;

	public Route() {

	}

	public Route(Summary summary, List<Segment> segments, String geometry) {
		super();
		this.summary = summary;
		this.segments = segments;
		this.geometry = geometry;
	}

	public Summary getSummary() {
		return summary;
	}

	public void setSummary(Summary summary) {
		this.summary = summary;
	}

	public List<Segment> getSegments() {
		return segments;
	}

	public void setSegments(List<Segment> segments) {
		this.segments = segments;
	}

	public String getGeometry() {
		return geometry;
	}

	public void setGeometry(String geometry) {
		this.geometry = geometry;
	}

}
