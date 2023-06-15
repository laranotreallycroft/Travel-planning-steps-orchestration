package com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions;

import java.util.ArrayList;
import java.util.List;

import org.locationtech.jts.geom.Coordinate;

import com.travelApp.travelApp.model.payload.common.GeosearchPayload;
import com.travelApp.travelApp.model.payload.itinerary.ItineraryLocation;

public class OpenRouteServiceDirectionsPayload {
	private List<List<Double>> coordinates;

	public OpenRouteServiceDirectionsPayload() {

	}

	public OpenRouteServiceDirectionsPayload(List<List<Double>> coordinates) {
		super();
		this.coordinates = coordinates;
	}

	public OpenRouteServiceDirectionsPayload(List<ItineraryLocation> itineraryLocations, Coordinate origin) {
		this.coordinates = new ArrayList<>();
		ArrayList<Double> start = new ArrayList<>();
		start.add(origin.getX());
		start.add(origin.getY());
		this.coordinates.add(start);
		for (GeosearchPayload coordinates : itineraryLocations) {
			ArrayList<Double> coordinatesList = new ArrayList<>();
			coordinatesList.add(coordinates.getX());
			coordinatesList.add(coordinates.getY());

			this.coordinates.add(coordinatesList);
		}
		ArrayList<Double> end = new ArrayList<>();
		end.add(origin.getX());
		end.add(origin.getY());
		this.coordinates.add(end);
	}

	public List<List<Double>> getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(List<List<Double>> coordinates) {
		this.coordinates = coordinates;
	}

}
