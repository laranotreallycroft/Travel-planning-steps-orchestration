package com.odysseus.model.payload.itinerary.openRouteService.directions;

import java.util.ArrayList;
import java.util.List;

import org.locationtech.jts.geom.Coordinate;

import com.odysseus.model.payload.common.Location;
import com.odysseus.model.payload.itinerary.ItineraryLocation;


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
        for (Location coordinates : itineraryLocations) {
            ArrayList<Double> coordinatesList = new ArrayList<>();
            coordinatesList.add(coordinates.getCoordinates().getX());
            coordinatesList.add(coordinates.getCoordinates().getY());

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
