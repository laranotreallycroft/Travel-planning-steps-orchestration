package com.odysseus.model.itinerary;

import java.util.List;

public class ItineraryCreateRequest {
    private List<ItineraryElementRequest> stops;
    private boolean optimize;
    private TransportationMethodEnum transportationMethod;
    private Long tripId;

    public ItineraryCreateRequest() {

    }

    public ItineraryCreateRequest(List<ItineraryElementRequest> stops, boolean optimize, TransportationMethodEnum transportationMethod, Long tripId) {
        this.stops = stops;
        this.optimize = optimize;
        this.transportationMethod = transportationMethod;
        this.tripId = tripId;
    }

    public List<ItineraryElementRequest> getStops() {
        return stops;
    }

    public void setStops(List<ItineraryElementRequest> stops) {
        this.stops = stops;
    }

    public boolean isOptimize() {
        return optimize;
    }

    public void setOptimize(boolean optimize) {
        this.optimize = optimize;
    }

    public TransportationMethodEnum getTransportationMethod() {
        return transportationMethod;
    }

    public void setTransportationMethod(TransportationMethodEnum transportationMethod) {
        this.transportationMethod = transportationMethod;
    }

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }
}
