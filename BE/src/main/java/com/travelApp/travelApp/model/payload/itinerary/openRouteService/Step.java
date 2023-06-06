package com.travelApp.travelApp.model.payload.itinerary.openRouteService;

import java.util.List;

public class Step {
	private String type;
	private List<Double> location;
	private List<Integer> load;
	private int arrival;
	private int duration;
	private int id;
	private int service;
	private int waiting_time;
	private int job;

	public Step() {

	}

	public Step(String type, List<Double> location, List<Integer> load, int arrival, int duration, int service,
			int waiting_time, int job, int id) {
		super();
		this.type = type;
		this.location = location;
		this.load = load;
		this.arrival = arrival;
		this.duration = duration;
		this.service = service;
		this.waiting_time = waiting_time;
		this.job = job;
	}

	public Step(String type, List<Double> location, List<Integer> load, int arrival, int duration, int id) {
		super();
		this.type = type;
		this.location = location;
		this.load = load;
		this.arrival = arrival;
		this.duration = duration;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getService() {
		return service;
	}

	public void setService(int service) {
		this.service = service;
	}

	public int getWaiting_time() {
		return waiting_time;
	}

	public void setWaiting_time(int waiting_time) {
		this.waiting_time = waiting_time;
	}

	public int getJob() {
		return job;
	}

	public void setJob(int job) {
		this.job = job;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<Double> getLocation() {
		return location;
	}

	public void setLocation(List<Double> location) {
		this.location = location;
	}

	public List<Integer> getLoad() {
		return load;
	}

	public void setLoad(List<Integer> load) {
		this.load = load;
	}

	public int getArrival() {
		return arrival;
	}

	public void setArrival(int arrival) {
		this.arrival = arrival;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public Double getX() {
		return location.get(0);
	}

	public Double getY() {
		return location.get(1);
	}

}
