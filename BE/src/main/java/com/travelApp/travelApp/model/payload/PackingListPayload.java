package com.travelApp.travelApp.model.payload;



import com.travelApp.travelApp.model.PackingList;
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
		return new PackingList(trip, getBasics().getTravelAids(), getBasics().getFunds(), getBasics().getTravelInfo(),
				getClothes().getBasics(), getClothes().getDressy(), getClothes().getOuterwear(),
				getClothes().getCasual(), getClothes().getFootwear(), getClothes().getAccessories(),
				getHygiene().getHygiene(), getMiscellaneous().getDocuments(), getMiscellaneous().getBags(),
				getMiscellaneous().getMiscellaneous(), getMiscellaneous().getTechnology(),
				getMiscellaneous().getWork());
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
