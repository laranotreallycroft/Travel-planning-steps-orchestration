package com.odysseus.model.itinerary;

public class RouteOptions {

    private boolean optimize;
    private String vehicleProfile;

    public RouteOptions() {

    }

    public RouteOptions(boolean optimize, String vehicleProfile) {
        super();
        this.optimize = optimize;
        this.vehicleProfile = vehicleProfile;
    }

    public boolean isOptimize() {
        return optimize;
    }

    public void setOptimize(boolean optimize) {
        this.optimize = optimize;
    }

    public String getVehicleProfile() {
        return vehicleProfile;
    }

    public void setVehicleProfile(String vehicleProfile) {
        this.vehicleProfile = vehicleProfile;
    }

}
