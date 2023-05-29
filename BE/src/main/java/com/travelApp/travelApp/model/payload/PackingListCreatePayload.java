package com.travelApp.travelApp.model.payload;

public class PackingListCreatePayload {

	private enum PackingListType {
		DEFAULT, WARM, COLD
	}

	private Long tripId;
	private PackingListType packingListType;

	public PackingListCreatePayload() {

	}

	public PackingListCreatePayload(Long tripId, PackingListType packingListType) {
		super();
		this.tripId = tripId;
		this.packingListType = packingListType;
	}

	public Long getTripId() {
		return tripId;
	}

	public void setTripId(Long tripId) {
		this.tripId = tripId;
	}

	public PackingListType getPackingListType() {
		return packingListType;
	}

	public void setPackingListType(PackingListType packingListType) {
		this.packingListType = packingListType;
	}

}
