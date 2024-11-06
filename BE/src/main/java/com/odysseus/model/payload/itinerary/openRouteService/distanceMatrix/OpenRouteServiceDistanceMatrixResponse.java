package com.odysseus.model.payload.itinerary.openRouteService.distanceMatrix;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OpenRouteServiceDistanceMatrixResponse {

    private List<List<Double>> durations;

    public OpenRouteServiceDistanceMatrixResponse() {

    }

    public OpenRouteServiceDistanceMatrixResponse(List<List<Double>> durations) {
        super();
        this.durations = durations;
    }

    public List<List<Double>> getDurations() {
        return durations;
    }

    public void setDurations(List<List<Double>> durations) {
        this.durations = durations;
    }

}
