package com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions;

public class Step {
	private double distance;
	private double duration;
	private int type;
	private String instruction;
	private String name;
	private int[] way_points;

	public Step() {

	}

	public Step(double distance, double duration, int type, String instruction, String name, int[] way_points) {
		super();
		this.distance = distance;
		this.duration = duration;
		this.type = type;
		this.instruction = instruction;
		this.name = name;
		this.way_points = way_points;
	}

	public double getDistance() {
		return distance;
	}

	public void setDistance(double distance) {
		this.distance = distance;
	}

	public double getDuration() {
		return duration;
	}

	public void setDuration(double duration) {
		this.duration = duration;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getInstruction() {
		return instruction;
	}

	public void setInstruction(String instruction) {
		this.instruction = instruction;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int[] getWay_points() {
		return way_points;
	}

	public void setWay_points(int[] way_points) {
		this.way_points = way_points;
	}

}
