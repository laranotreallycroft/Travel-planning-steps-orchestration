package com.odysseus.model.itinerary.openRouteService.directions;

import com.odysseus.model.itinerary.ItineraryElementRequest;

import java.util.ArrayList;
import java.util.List;


public class OpenRouteServiceDirectionsPayload {
    private List<List<Double>> coordinates;

    public OpenRouteServiceDirectionsPayload() {

    }


    public OpenRouteServiceDirectionsPayload(List<ItineraryElementRequest> itineraryElementRequests) {
        this.coordinates = new ArrayList<>();
        for (ItineraryElementRequest stop : itineraryElementRequests) {
            List<Double> coordinatesList = List.of(
                    stop.getLocation().getCoordinates().getX(),
                    stop.getLocation().getCoordinates().getY()
            );

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
