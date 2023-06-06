package com.travelApp.travelApp.model.payload.itinerary.openRouteService;

public class Vehicle {
	private int id;
	private String profile;
	private double[] start;
	private double[] end;
	private int[] capacity;
	private int[] skills;

	public Vehicle() {

	}

	public Vehicle(int id, String profile, double[] start, double[] end, int[] capacity, int[] skills) {
		super();
		this.id = id;
		this.profile = profile;
		this.start = start;
		this.end = end;
		this.capacity = capacity;
		this.skills = skills;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public double[] getStart() {
		return start;
	}

	public void setStart(double[] start) {
		this.start = start;
	}

	public double[] getEnd() {
		return end;
	}

	public void setEnd(double[] end) {
		this.end = end;
	}

	public int[] getCapacity() {
		return capacity;
	}

	public void setCapacity(int[] capacity) {
		this.capacity = capacity;
	}

	public int[] getSkills() {
		return skills;
	}

	public void setSkills(int[] skills) {
		this.skills = skills;
	}
}