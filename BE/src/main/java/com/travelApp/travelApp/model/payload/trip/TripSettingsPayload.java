package com.travelApp.travelApp.model.payload.trip;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@JsonIgnoreProperties(ignoreUnknown = true)
public class TripSettingsPayload {

	private String name;


	public TripSettingsPayload() {

	}

	public TripSettingsPayload(String name) {
		super();
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


}
