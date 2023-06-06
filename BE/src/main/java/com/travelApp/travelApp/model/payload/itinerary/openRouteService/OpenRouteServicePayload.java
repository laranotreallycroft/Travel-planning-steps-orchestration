package com.travelApp.travelApp.model.payload.itinerary.openRouteService;

import java.util.ArrayList;
import java.util.List;

import com.travelApp.travelApp.model.payload.common.PointPayload;
import com.travelApp.travelApp.model.payload.itinerary.ItineraryPayload;

public class OpenRouteServicePayload {
	private List<Job> jobs;
	private List<Vehicle> vehicles;

	public OpenRouteServicePayload() {
		this.jobs = new ArrayList<Job>();
		this.vehicles = new ArrayList<Vehicle>();
	}

	public OpenRouteServicePayload(List<Job> jobs, List<Vehicle> vehicles) {
		super();
		this.jobs = jobs;
		this.vehicles = vehicles;
	}

	public OpenRouteServicePayload(ItineraryPayload payload) {
		this.jobs = new ArrayList<Job>();
		this.vehicles = new ArrayList<Vehicle>();
		PointPayload[] locations = payload.getLocations();
		for (int i = 0; i < locations.length; i++) {
			PointPayload value = locations[i];
			Job job = new Job(i, new double[] { value.getX(), value.getY() }, new int[] { 1 });
			jobs.add(job);
		}

		Vehicle vehicle = new Vehicle();
		vehicle.setId(1);
		vehicle.setProfile("driving-car");
		PointPayload startLocation = locations[0];
		PointPayload endLocation = locations[locations.length - 1];
		vehicle.setStart(new double[] { startLocation.getX(), startLocation.getY() });
		vehicle.setEnd(new double[] { endLocation.getX(), endLocation.getY() });
		vehicle.setCapacity(new int[] { 4 });
		vehicle.setSkills(new int[] { 1, 14 });
		vehicles.add(vehicle);

	}

	public List<Job> getJobs() {
		return jobs;
	}

	public void setJobs(List<Job> jobs) {
		this.jobs = jobs;
	}

	public List<Vehicle> getVehicles() {
		return vehicles;
	}

	public void setVehicles(List<Vehicle> vehicles) {
		this.vehicles = vehicles;
	}
}
