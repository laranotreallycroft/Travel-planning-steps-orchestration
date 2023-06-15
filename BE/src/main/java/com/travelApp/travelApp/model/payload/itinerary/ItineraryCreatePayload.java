package com.travelApp.travelApp.model.payload.itinerary;

public class ItineraryCreatePayload extends ItineraryPayload {
	private Long tripId;

	public Long getTripId() {
		return tripId;
	}

	public void setTripId(Long tripId) {
		this.tripId = tripId;
	}

}
