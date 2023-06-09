package com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions;

import java.util.ArrayList;
import java.util.List;

import com.travelApp.travelApp.model.payload.common.GeosearchPayload;
import com.travelApp.travelApp.model.payload.itinerary.ItineraryRoutingPayload;

public class OpenRouteServiceDirectionsPayload {
	private List<List<Double>> coordinates;

	public OpenRouteServiceDirectionsPayload() {

	}

	public OpenRouteServiceDirectionsPayload(List<List<Double>> coordinates) {
		super();
		this.coordinates = coordinates;
	}

	public OpenRouteServiceDirectionsPayload(ItineraryRoutingPayload itineraryPayload) {
		this.coordinates = new ArrayList<>();
		for (GeosearchPayload coordinates : itineraryPayload.getLocations()) {
			ArrayList<Double> coordinatesList = new ArrayList<>();
			coordinatesList.add(coordinates.getX());
			coordinatesList.add(coordinates.getY());

			this.coordinates.add(coordinatesList);
		}
	}

	public List<List<Double>> getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(List<List<Double>> coordinates) {
		this.coordinates = coordinates;
	}

}
