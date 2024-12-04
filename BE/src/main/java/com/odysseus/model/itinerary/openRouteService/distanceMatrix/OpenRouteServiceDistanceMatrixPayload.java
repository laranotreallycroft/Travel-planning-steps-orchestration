package com.odysseus.model.itinerary.openRouteService.distanceMatrix;

import java.util.ArrayList;
import java.util.List;

import com.odysseus.model.location.LocationRequest;
import com.odysseus.model.itinerary.ItineraryLocation;

public class OpenRouteServiceDistanceMatrixPayload {
    private List<List<Double>> locations;

    public OpenRouteServiceDistanceMatrixPayload() {

    }

    public OpenRouteServiceDistanceMatrixPayload(List<ItineraryLocation> itineraryLocations) {
        this.locations = new ArrayList<>();

        for (LocationRequest coordinates : itineraryLocations) {
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
