package com.travelApp.travelApp.model.payload.itinerary.openRouteService;

public class Job {
	private int id;
	private double[] location;
	private int[] skills;

	public Job() {

	}

	public Job(int id, double[] location, int[] skills) {
		super();
		this.id = id;
		this.location = location;
		this.skills = skills;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double[] getLocation() {
		return location;
	}

	public void setLocation(double[] location) {
		this.location = location;
	}

	public int[] getSkills() {
		return skills;
	}

	public void setSkills(int[] skills) {
		this.skills = skills;
	}
}