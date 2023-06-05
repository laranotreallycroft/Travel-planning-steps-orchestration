package com.travelApp.travelApp.model.payload;

public class RouteOptions {

	private boolean optimize;
	private boolean carTravel;

	public RouteOptions() {

	}

	public RouteOptions(boolean optimize, boolean carTravel) {
		super();
		this.optimize = optimize;
		this.carTravel = carTravel;
	}

	public boolean isOptimize() {
		return optimize;
	}

	public void setOptimize(boolean optimize) {
		this.optimize = optimize;
	}

	public boolean isCarTravel() {
		return carTravel;
	}

	public void setCarTravel(boolean carTravel) {
		this.carTravel = carTravel;
	}

}
