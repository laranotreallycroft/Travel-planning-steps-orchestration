package com.travelApp.travelApp.model.payload.itinerary.openRouteService.optimization;

import java.util.List;

public class Summary {
	private int cost;
	private int unassigned;
	private List<Integer> delivery;
	private List<Integer> amount;
	private List<Integer> pickup;
	private int service;
	private int duration;
	private int waiting_time;
	private ComputingTimes computing_times;

	public Summary() {

	}

	public Summary(int cost, int unassigned, List<Integer> delivery, List<Integer> amount, List<Integer> pickup,
			int service, int duration, int waiting_time, ComputingTimes computing_times) {
		super();
		this.cost = cost;
		this.unassigned = unassigned;
		this.delivery = delivery;
		this.amount = amount;
		this.pickup = pickup;
		this.service = service;
		this.duration = duration;
		this.waiting_time = waiting_time;
		this.computing_times = computing_times;
	}

	public int getCost() {
		return cost;
	}

	public void setCost(int cost) {
		this.cost = cost;
	}

	public int getUnassigned() {
		return unassigned;
	}

	public void setUnassigned(int unassigned) {
		this.unassigned = unassigned;
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

	public ComputingTimes getComputing_times() {
		return computing_times;
	}

	public void setComputing_times(ComputingTimes computing_times) {
		this.computing_times = computing_times;
	}

}