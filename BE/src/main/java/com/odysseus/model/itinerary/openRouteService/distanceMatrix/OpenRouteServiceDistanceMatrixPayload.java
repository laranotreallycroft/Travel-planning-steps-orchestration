package com.odysseus.model.itinerary.openRouteService.distanceMatrix;

import java.util.ArrayList;
import java.util.List;

import com.odysseus.model.itinerary.ItineraryElementRequest;

public class OpenRouteServiceDistanceMatrixPayload {
    private List<List<Double>> locations;

    public OpenRouteServiceDistanceMatrixPayload() {

    }

    public OpenRouteServiceDistanceMatrixPayload(List<ItineraryElementRequest> itineraryElementRequests) {
        this.locations = new ArrayList<>();

        for (ItineraryElementRequest stop : itineraryElementRequests) {
            ArrayList<Double> coordinatesList = new ArrayList<>();
            coordinatesList.add(stop.getLocation().getCoordinates().getX());
            coordinatesList.add(stop.getLocation().getCoordinates().getY());

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
