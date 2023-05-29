package com.travelApp.travelApp.model.payload;

import com.travelApp.travelApp.model.PackingList;

public class PackingListUpdatePayload {
	private Long tripId;
	private PackingList packingList;

	public PackingListUpdatePayload() {

	}

	public PackingListUpdatePayload(Long tripId, PackingList packingList) {
		super();
		this.tripId = tripId;
		this.packingList = packingList;
	}

	public Long getTripId() {
		return tripId;
	}

	public void setTripId(Long tripId) {
		this.tripId = tripId;
	}

	public PackingList getPackingList() {
		return packingList;
	}

	public void setPackingList(PackingList packingList) {
		this.packingList = packingList;
	}

}
