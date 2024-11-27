package com.odysseus.model.payload.itinerary.openRouteService.distanceMatrix;

import java.util.ArrayList;
import java.util.List;

import com.odysseus.model.payload.common.Location;
import com.odysseus.model.payload.itinerary.ItineraryLocation;

public class OpenRouteServiceDistanceMatrixPayload {
    private List<List<Double>> locations;

    public OpenRouteServiceDistanceMatrixPayload() {

    }

    public OpenRouteServiceDistanceMatrixPayload(List<ItineraryLocation> itineraryLocations) {
        this.locations = new ArrayList<>();

        for (Location coordinates : itineraryLocations) {
            ArrayList<Double> coordinatesList = new ArrayList<>();
            coordinatesList.add(coordinates.getCoordinates().getX());
            coordinatesList.add(coordinates.getCoordinates().getY());

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
