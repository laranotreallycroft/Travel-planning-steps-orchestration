package com.travelApp.travelApp.model.payload.itinerary.openRouteService.optimization;

import java.util.List;

public class Route {
	private int vehicle;
	private int cost;
	private List<Integer> delivery;
	private List<Integer> amount;
	private List<Integer> pickup;
	private int service;
	private int duration;
	private int waiting_time;
	private List<Step> steps;

	public Route() {

	}

	public Route(int vehicle, int cost, List<Integer> delivery, List<Integer> amount, List<Integer> pickup, int service,
			int duration, int waiting_time, List<Step> steps) {
		super();
		this.vehicle = vehicle;
		this.cost = cost;
		this.delivery = delivery;
		this.amount = amount;
		this.pickup = pickup;
		this.service = service;
		this.duration = duration;
		this.waiting_time = waiting_time;
		this.steps = steps;
	}

	public int getVehicle() {
		return vehicle;
	}

	public void setVehicle(int vehicle) {
		this.vehicle = vehicle;
	}

	public int getCost() {
		return cost;
	}

	public void setCost(int cost) {
		this.cost = cost;
	}

	public List<Integer> getDelivery() {
		return delivery;
	}

	public void setDelivery(List<Integer> delivery) {
		this.delivery = delivery;
	}

	public List<Integer> getAmount() {
		return amount;
	}

	public void setAmount(List<Integer> amount) {
		this.amount = amount;
	}

	public List<Integer> getPickup() {
		return pickup;
	}

	public void setPickup(List<Integer> pickup) {
		this.pickup = pickup;
	}

	public int getService() {
		return service;
	}

	public void setService(int service) {
		this.service = service;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public int getWaiting_time() {
		return waiting_time;
	}

	public void setWaiting_time(int waiting_time) {
		this.waiting_time = waiting_time;
	}

	public List<Step> getSteps() {
		return steps;
	}

	public void setSteps(List<Step> steps) {
		this.steps = steps;
	}

}
