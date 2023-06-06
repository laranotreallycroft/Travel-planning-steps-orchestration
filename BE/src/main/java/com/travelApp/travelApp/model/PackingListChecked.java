package com.travelApp.travelApp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

import com.travelApp.travelApp.model.payload.packingList.Basics;
import com.travelApp.travelApp.model.payload.packingList.Clothes;
import com.travelApp.travelApp.model.payload.packingList.Hygiene;
import com.travelApp.travelApp.model.payload.packingList.Miscellaneous;
import com.travelApp.travelApp.model.payload.packingList.PackingListPayload;
import com.travelApp.travelApp.utils.General;

@Entity
@Table(name = "packing_lists_checked")
public class PackingListChecked {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	@JoinColumn(name = "trip_id", nullable = false)
	private Trip trip;

	@Column(name = "basics_travel_aids")
	private List<String> basicsTravelAids;

	@Column(name = "basics_funds")
	private List<String> basicsFunds;

	@Column(name = "basics_travel_info")
	private List<String> basicsTravelInfo;

	@Column(name = "clothes_basics")
	private List<String> clothesBasics;

	@Column(name = "clothes_dressy")
	private List<String> clothesDressy;

	@Column(name = "clothes_outerwear")
	private List<String> clothesOuterwear;

	@Column(name = "clothes_casual")
	private List<String> clothesCasual;

	@Column(name = "clothes_footwear")
	private List<String> clothesFootwear;

	@Column(name = "clothes_accessories")
	private List<String> clothesAccessories;

	@Column(name = "hygiene_hygiene")
	private List<String> hygieneHygiene;

	@Column(name = "miscellaneous_documents")
	private List<String> miscellaneousDocuments;

	@Column(name = "miscellaneous_bags")
	private List<String> miscellaneousBags;

	@Column(name = "miscellaneous_miscellaneous")
	private List<String> miscellaneousMiscellaneous;

	@Column(name = "miscellaneous_technology")
	private List<String> miscellaneousTechnology;

	@Column(name = "miscellaneous_work")
	private List<String> miscellaneousWork;

	public PackingListChecked() {

	}

	public PackingListChecked(Trip trip) {
		super();
		this.trip = trip;this.basicsTravelAids = new ArrayList<String>();
		this.basicsFunds = new ArrayList<String>();
		this.basicsTravelInfo = new ArrayList<String>();
		this.clothesBasics = new ArrayList<String>();
		this.clothesDressy = new ArrayList<String>();
		this.clothesOuterwear = new ArrayList<String>();
		this.clothesCasual = new ArrayList<String>();
		this.clothesFootwear = new ArrayList<String>();
		this.clothesAccessories = new ArrayList<String>();
		this.hygieneHygiene = new ArrayList<String>();
		this.miscellaneousDocuments = new ArrayList<String>();
		this.miscellaneousBags = new ArrayList<String>();
		this.miscellaneousMiscellaneous = new ArrayList<String>();
		this.miscellaneousTechnology = new ArrayList<String>();
		this.miscellaneousWork = new ArrayList<String>();
	}

	public PackingListChecked(Trip trip, List<String> basicsTravelAids, List<String> basicsFunds,
			List<String> basicsTravelInfo, List<String> clothesBasics, List<String> clothesDressy,
			List<String> clothesOuterwear, List<String> clothesCasual, List<String> clothesFootwear,
			List<String> clothesAccessories, List<String> hygieneHygiene, List<String> miscellaneousDocuments,
			List<String> miscellaneousBags, List<String> miscellaneousMiscellaneous,
			List<String> miscellaneousTechnology, List<String> miscellaneousWork) {
		super();
		this.trip = trip;
		this.basicsTravelAids = basicsTravelAids;
		this.basicsFunds = basicsFunds;
		this.basicsTravelInfo = basicsTravelInfo;
		this.clothesBasics = clothesBasics;
		this.clothesDressy = clothesDressy;
		this.clothesOuterwear = clothesOuterwear;
		this.clothesCasual = clothesCasual;
		this.clothesFootwear = clothesFootwear;
		this.clothesAccessories = clothesAccessories;
		this.hygieneHygiene = hygieneHygiene;
		this.miscellaneousDocuments = miscellaneousDocuments;
		this.miscellaneousBags = miscellaneousBags;
		this.miscellaneousMiscellaneous = miscellaneousMiscellaneous;
		this.miscellaneousTechnology = miscellaneousTechnology;
		this.miscellaneousWork = miscellaneousWork;

	}

	public void updateFromPayloadIntersection(PackingListPayload packingListPayload) {
		// Basics
		setBasicsFunds(General.getIntersection(getBasicsFunds(), packingListPayload.getBasics().getFunds()));
		setBasicsTravelAids(
				General.getIntersection(getBasicsTravelAids(), packingListPayload.getBasics().getTravelAids()));
		setBasicsTravelInfo(
				General.getIntersection(getBasicsTravelInfo(), packingListPayload.getBasics().getTravelInfo()));
		// Clothes
		setClothesBasics(General.getIntersection(getClothesBasics(), packingListPayload.getClothes().getBasics()));
		setClothesDressy(General.getIntersection(getClothesDressy(), packingListPayload.getClothes().getDressy()));
		setClothesOuterwear(
				General.getIntersection(getClothesOuterwear(), packingListPayload.getClothes().getOuterwear()));
		setClothesCasual(General.getIntersection(getClothesCasual(), packingListPayload.getClothes().getCasual()));
		setClothesFootwear(
				General.getIntersection(getClothesFootwear(), packingListPayload.getClothes().getFootwear()));
		setClothesAccessories(
				General.getIntersection(getClothesAccessories(), packingListPayload.getClothes().getAccessories()));
		// Hygiene
		setHygieneHygiene(General.getIntersection(getHygieneHygiene(), packingListPayload.getHygiene().getHygiene()));
		// Miscellaneous
		setMiscellaneousDocuments(General.getIntersection(getMiscellaneousDocuments(),
				packingListPayload.getMiscellaneous().getDocuments()));
		setMiscellaneousBags(
				General.getIntersection(getMiscellaneousBags(), packingListPayload.getMiscellaneous().getBags()));
		setMiscellaneousMiscellaneous(General.getIntersection(getMiscellaneousMiscellaneous(),
				packingListPayload.getMiscellaneous().getMiscellaneous()));
		setMiscellaneousTechnology(General.getIntersection(getMiscellaneousTechnology(),
				packingListPayload.getMiscellaneous().getTechnology()));
		setMiscellaneousWork(
				General.getIntersection(getMiscellaneousWork(), packingListPayload.getMiscellaneous().getWork()));
	}

	public void updateFromPayload(PackingListPayload packingListPayload) {
		// Basics
		setBasicsFunds(packingListPayload.getBasics().getFunds());
		setBasicsTravelAids(packingListPayload.getBasics().getTravelAids());
		setBasicsTravelInfo(packingListPayload.getBasics().getTravelInfo());
		// Clothes
		setClothesBasics(packingListPayload.getClothes().getBasics());
		setClothesDressy(packingListPayload.getClothes().getDressy());
		setClothesOuterwear(packingListPayload.getClothes().getOuterwear());
		setClothesCasual(packingListPayload.getClothes().getCasual());
		setClothesFootwear(packingListPayload.getClothes().getFootwear());
		setClothesAccessories(packingListPayload.getClothes().getAccessories());
		// Hygiene
		setHygieneHygiene(packingListPayload.getHygiene().getHygiene());
		// Miscellaneous
		setMiscellaneousDocuments(packingListPayload.getMiscellaneous().getDocuments());
		setMiscellaneousBags(packingListPayload.getMiscellaneous().getBags());
		setMiscellaneousMiscellaneous(packingListPayload.getMiscellaneous().getMiscellaneous());
		setMiscellaneousTechnology(packingListPayload.getMiscellaneous().getTechnology());
		setMiscellaneousWork(packingListPayload.getMiscellaneous().getWork());
	}

	public PackingListPayload modelToPayload() {
		Basics basics = new Basics(getBasicsTravelAids(), getBasicsFunds(), getBasicsTravelInfo());
		Clothes clothes = new Clothes(getClothesBasics(), getClothesDressy(), getClothesOuterwear(), getClothesCasual(),
				getClothesFootwear(), getClothesAccessories());
		Hygiene hygiene = new Hygiene(getHygieneHygiene());
		Miscellaneous miscellaneous = new Miscellaneous(getMiscellaneousDocuments(), getMiscellaneousBags(),
				getMiscellaneousMiscellaneous(), getMiscellaneousTechnology(), getMiscellaneousWork());

		return new PackingListPayload(basics, clothes, hygiene, miscellaneous);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Trip getTrip() {
		return trip;
	}

	public void setTrip(Trip trip) {
		this.trip = trip;
	}

	public List<String> getBasicsTravelAids() {
		return basicsTravelAids;
	}

	public void setBasicsTravelAids(List<String> basicsTravelAids) {
		this.basicsTravelAids = basicsTravelAids;
	}

	public List<String> getBasicsFunds() {
		return basicsFunds;
	}

	public void setBasicsFunds(List<String> basicsFunds) {
		this.basicsFunds = basicsFunds;
	}

	public List<String> getBasicsTravelInfo() {
		return basicsTravelInfo;
	}

	public void setBasicsTravelInfo(List<String> basicsTravelInfo) {
		this.basicsTravelInfo = basicsTravelInfo;
	}

	public List<String> getClothesBasics() {
		return clothesBasics;
	}

	public void setClothesBasics(List<String> clothesBasics) {
		this.clothesBasics = clothesBasics;
	}

	public List<String> getClothesDressy() {
		return clothesDressy;
	}

	public void setClothesDressy(List<String> clothesDressy) {
		this.clothesDressy = clothesDressy;
	}

	public List<String> getClothesOuterwear() {
		return clothesOuterwear;
	}

	public void setClothesOuterwear(List<String> clothesOuterwear) {
		this.clothesOuterwear = clothesOuterwear;
	}

	public List<String> getClothesCasual() {
		return clothesCasual;
	}

	public void setClothesCasual(List<String> clothesCasual) {
		this.clothesCasual = clothesCasual;
	}

	public List<String> getClothesFootwear() {
		return clothesFootwear;
	}

	public void setClothesFootwear(List<String> clothesFootwear) {
		this.clothesFootwear = clothesFootwear;
	}

	public List<String> getClothesAccessories() {
		return clothesAccessories;
	}

	public void setClothesAccessories(List<String> clothesAccessories) {
		this.clothesAccessories = clothesAccessories;
	}

	public List<String> getHygieneHygiene() {
		return hygieneHygiene;
	}

	public void setHygieneHygiene(List<String> hygieneHygiene) {
		this.hygieneHygiene = hygieneHygiene;
	}

	public List<String> getMiscellaneousDocuments() {
		return miscellaneousDocuments;
	}

	public void setMiscellaneousDocuments(List<String> miscellaneousDocuments) {
		this.miscellaneousDocuments = miscellaneousDocuments;
	}

	public List<String> getMiscellaneousBags() {
		return miscellaneousBags;
	}

	public void setMiscellaneousBags(List<String> miscellaneousBags) {
		this.miscellaneousBags = miscellaneousBags;
	}

	public List<String> getMiscellaneousMiscellaneous() {
		return miscellaneousMiscellaneous;
	}

	public void setMiscellaneousMiscellaneous(List<String> miscellaneousMiscellaneous) {
		this.miscellaneousMiscellaneous = miscellaneousMiscellaneous;
	}

	public List<String> getMiscellaneousTechnology() {
		return miscellaneousTechnology;
	}

	public void setMiscellaneousTechnology(List<String> miscellaneousTechnology) {
		this.miscellaneousTechnology = miscellaneousTechnology;
	}

	public List<String> getMiscellaneousWork() {
		return miscellaneousWork;
	}

	public void setMiscellaneousWork(List<String> miscellaneousWork) {
		this.miscellaneousWork = miscellaneousWork;
	}

}