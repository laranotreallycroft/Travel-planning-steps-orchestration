package com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions;

import java.util.List;

public class Query {
	private List<double[]> coordinates;
	private String profile;
	private String format;

	public Query() {

	}

	public Query(List<double[]> coordinates, String profile, String format) {
		super();
		this.coordinates = coordinates;
		this.profile = profile;
		this.format = format;
	}

	public List<double[]> getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(List<double[]> coordinates) {
		this.coordinates = coordinates;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}
}