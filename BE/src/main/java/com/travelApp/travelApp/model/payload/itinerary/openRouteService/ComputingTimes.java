package com.travelApp.travelApp.model.payload.itinerary.openRouteService;

public class ComputingTimes {
	private int loading;
	private int solving;

	public ComputingTimes() {

	}

	public ComputingTimes(int loading, int solving) {
		super();
		this.loading = loading;
		this.solving = solving;
	}

	public int getLoading() {
		return loading;
	}

	public void setLoading(int loading) {
		this.loading = loading;
	}

	public int getSolving() {
		return solving;
	}

	public void setSolving(int solving) {
		this.solving = solving;
	}

}