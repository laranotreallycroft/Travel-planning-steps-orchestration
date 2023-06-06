package com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions;

import java.util.List;

public class Route {
	private Summary summary;
	private List<Segment> segments;
	private double[] bbox;
	private String geometry;
	private int[] way_points;

	public Route() {

	}

	public Route(Summary summary, List<Segment> segments, double[] bbox, String geometry, int[] way_points) {
		super();
		this.summary = summary;
		this.segments = segments;
		this.bbox = bbox;
		this.geometry = geometry;
		this.way_points = way_points;
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

	public double[] getBbox() {
		return bbox;
	}

	public void setBbox(double[] bbox) {
		this.bbox = bbox;
	}

	public String getGeometry() {
		return geometry;
	}

	public void setGeometry(String geometry) {
		this.geometry = geometry;
	}

	public int[] getWay_points() {
		return way_points;
	}

	public void setWay_points(int[] way_points) {
		this.way_points = way_points;
	}

}
