package com.travelApp.travelApp.model.payload.packingList;

import com.travelApp.travelApp.model.PackingList;
import com.travelApp.travelApp.model.PackingListChecked;
import com.travelApp.travelApp.model.Trip;

public class PackingListPayload {
	private Basics basics;
	private Clothes clothes;
	private Hygiene hygiene;
	private Miscellaneous miscellaneous;

	public PackingListPayload() {

	}

	public PackingListPayload(Basics basics, Clothes clothes, Hygiene hygiene, Miscellaneous miscellaneous) {
		super();
		this.basics = basics;
		this.clothes = clothes;
		this.hygiene = hygiene;
		this.miscellaneous = miscellaneous;
	}

	public PackingList payloadToModel(Trip trip) {
		return new PackingList(trip, this.basics.getTravelAids(), this.basics.getFunds(),
				this.basics.getTravelInfo(), this.clothes.getBasics(), this.clothes.getDressy(),
				this.clothes.getOuterwear(), this.clothes.getCasual(), this.clothes.getFootwear(),
				this.clothes.getAccessories(), this.hygiene.getHygiene(), this.miscellaneous.getDocuments(),
				this.miscellaneous.getBags(), this.miscellaneous.getMiscellaneous(), this.miscellaneous.getTechnology(),
				this.miscellaneous.getWork());
	}

	public PackingListChecked payloadToModelChecked(Trip trip) {
		return new PackingListChecked(trip, this.basics.getTravelAids(), this.basics.getFunds(),
				this.basics.getTravelInfo(), this.clothes.getBasics(), this.clothes.getDressy(),
				this.clothes.getOuterwear(), this.clothes.getCasual(), this.clothes.getFootwear(),
				this.clothes.getAccessories(), this.hygiene.getHygiene(), this.miscellaneous.getDocuments(),
				this.miscellaneous.getBags(), this.miscellaneous.getMiscellaneous(), this.miscellaneous.getTechnology(),
				this.miscellaneous.getWork());
	}

	public Basics getBasics() {
		return basics;
	}

	public void setBasics(Basics basics) {
		this.basics = basics;
	}

	public Clothes getClothes() {
		return clothes;
	}

	public void setClothes(Clothes clothes) {
		this.clothes = clothes;
	}

	public Hygiene getHygiene() {
		return hygiene;
	}

	public void setHygiene(Hygiene hygiene) {
		this.hygiene = hygiene;
	}

	public Miscellaneous getMiscellaneous() {
		return miscellaneous;
	}

	public void setMiscellaneous(Miscellaneous miscellaneous) {
		this.miscellaneous = miscellaneous;
	}

}
