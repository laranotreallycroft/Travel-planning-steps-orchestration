package com.travelApp.travelApp.model.payload.packingList;

import java.util.List;

public class PackingListUpdatePayload {
	private Long packingListId;
	private List<String> items;

	public PackingListUpdatePayload() {

	}

	public PackingListUpdatePayload(Long packingListId, List<String> items) {
		super();
		this.packingListId = packingListId;
		this.items = items;
	}

	public Long getPackingListId() {
		return packingListId;
	}

	public void setPackingListId(Long packingListId) {
		this.packingListId = packingListId;
	}

	public List<String> getItems() {
		return items;
	}

	public void setItems(List<String> items) {
		this.items = items;
	}
}