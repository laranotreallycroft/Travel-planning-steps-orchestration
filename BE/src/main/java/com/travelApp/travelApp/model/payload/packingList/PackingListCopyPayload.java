package com.travelApp.travelApp.model.payload.packingList;

import java.util.List;

public class PackingListCopyPayload {
	private Long tripId;
	private List<Long> packingListIds;

	public PackingListCopyPayload() {

	}

	public PackingListCopyPayload(Long tripId, List<Long> packingListIds) {
		super();
		this.tripId = tripId;
		this.packingListIds = packingListIds;
	}

	public Long getTripId() {
		return tripId;
	}

	public void setTripId(Long tripId) {
		this.tripId = tripId;
	}

	public List<Long> getPackingListIds() {
		return packingListIds;
	}

	public void setPackingListIds(List<Long> packingListIds) {
		this.packingListIds = packingListIds;
	}

}
