package com.travelApp.travelApp.model.payload.itinerary;

public class ItineraryRoutingPayload extends ItineraryPayload {
	private Long tripId;

	public Long getTripId() {
		return tripId;
	}

	public void setTripId(Long tripId) {
		this.tripId = tripId;
	}

}
