package com.travelApp.travelApp.model.payload.packingList;

import java.util.List;

public class PackingListCreatePayload {
	private Long tripId;
	private String label;
	private List<String> items;

	public PackingListCreatePayload() {

	}

	public PackingListCreatePayload(Long tripId, String label, List<String> items) {
		super();
		this.tripId = tripId;
		this.label = label;
		this.items = items;
	}

	public Long getTripId() {
		return tripId;
	}

	public void setTripId(Long tripId) {
		this.tripId = tripId;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public List<String> getItems() {
		return items;
	}

	public void setItems(List<String> items) {
		this.items = items;
	}

}
