package com.forgetMeNot.model.payload.itinerary.openRouteService.distanceMatrix;

import java.util.ArrayList;
import java.util.List;

import com.forgetMeNot.model.payload.common.GeosearchPayload;
import com.forgetMeNot.model.payload.itinerary.ItineraryLocation;

public class OpenRouteServiceDistanceMatrixPayload {
	private List<List<Double>> locations;

	public OpenRouteServiceDistanceMatrixPayload() {

	}

	public OpenRouteServiceDistanceMatrixPayload(List<ItineraryLocation> itineraryLocations) {
		this.locations = new ArrayList<>();

		for (GeosearchPayload coordinates : itineraryLocations) {
			ArrayList<Double> coordinatesList = new ArrayList<>();
			coordinatesList.add(coordinates.getX());
			coordinatesList.add(coordinates.getY());

			this.locations.add(coordinatesList);
		}

	}

	public List<List<Double>> getLocations() {
		return locations;
	}

	public void setLocations(List<List<Double>> locations) {
		this.locations = locations;
	}

}
