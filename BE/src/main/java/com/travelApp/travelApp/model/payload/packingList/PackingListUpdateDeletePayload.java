package com.travelApp.travelApp.model.payload.packingList;

import java.util.List;

public class PackingListUpdateDeletePayload {
	private List<Long> delete;
	private List<PackingListUpdatePayload> update;

	public PackingListUpdateDeletePayload() {

	}

	public PackingListUpdateDeletePayload(List<Long> delete, List<PackingListUpdatePayload> update) {
		super();
		this.delete = delete;
		this.update = update;
	}
	
	public List<Long> getDelete() {
		return delete;
	}

	public void setDelete(List<Long> delete) {
		this.delete = delete;
	}

	public List<PackingListUpdatePayload> getUpdate() {
		return update;
	}

	public void setUpdate(List<PackingListUpdatePayload> update) {
		this.update = update;
	}

}