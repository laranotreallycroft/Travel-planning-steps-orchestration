package com.travelApp.travelApp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.travelApp.travelApp.model.payload.Basics;
import com.travelApp.travelApp.model.payload.Clothes;
import com.travelApp.travelApp.model.payload.Hygiene;
import com.travelApp.travelApp.model.payload.Miscellaneous;
import com.travelApp.travelApp.model.payload.PackingListPayload;
import com.travelApp.travelApp.utils.General;

@Entity
@Table(name = "packing_lists")
public class PackingList {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "trip_id", nullable = false)
	@JsonIdentityInfo(
			  generator = ObjectIdGenerators.PropertyGenerator.class, 
			  property = "id")
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

	@Column(name = "basics_travel_aids_checked")
	private List<String> basicsTravelAidsChecked;

	@Column(name = "basics_funds_checked")
	private List<String> basicsFundsChecked;

	@Column(name = "basics_travel_info_checked")
	private List<String> basicsTravelInfoChecked;

	@Column(name = "clothes_basics_checked")
	private List<String> clothesBasicsChecked;

	@Column(name = "clothes_dressy_checked")
	private List<String> clothesDressyChecked;

	@Column(name = "clothes_outerwear_checked")
	private List<String> clothesOuterwearChecked;

	@Column(name = "clothes_casual_checked")
	private List<String> clothesCasualChecked;

	@Column(name = "clothes_footwear_checked")
	private List<String> clothesFootwearChecked;

	@Column(name = "clothes_accessories_checked")
	private List<String> clothesAccessoriesChecked;

	@Column(name = "hygiene_hygiene_checked")
	private List<String> hygieneHygieneChecked;

	@Column(name = "miscellaneous_documents_checked")
	private List<String> miscellaneousDocumentsChecked;

	@Column(name = "miscellaneous_bags_checked")
	private List<String> miscellaneousBagsChecked;

	@Column(name = "miscellaneous_miscellaneous_checked")
	private List<String> miscellaneousMiscellaneousChecked;

	@Column(name = "miscellaneous_technology_checked")
	private List<String> miscellaneousTechnologyChecked;

	@Column(name = "miscellaneous_work_checked")
	private List<String> miscellaneousWorkChecked;

	public PackingList() {

	}

	public PackingList(Trip trip, List<String> basicsTravelAids, List<String> basicsFunds,
			List<String> basicsTravelInfo, List<String> clothesBasics, List<String> clothesDressy,
			List<String> clothesOuterwear, List<String> clothesCasual, List<String> clothesFootwear,
			List<String> clothesAccessories, List<String> hygieneHygiene, List<String> miscellaneousDocuments,
			List<String> miscellaneousBags, List<String> miscellaneousMiscellaneous,
			List<String> miscellaneousTechnology, List<String> miscellaneousWork, List<String> basicsTravelAidsChecked,
			List<String> basicsFundsChecked, List<String> basicsTravelInfoChecked, List<String> clothesBasicsChecked,
			List<String> clothesDressyChecked, List<String> clothesOuterwearChecked, List<String> clothesCasualChecked,
			List<String> clothesFootwearChecked, List<String> clothesAccessoriesChecked,
			List<String> hygieneHygieneChecked, List<String> miscellaneousDocumentsChecked,
			List<String> miscellaneousBagsChecked, List<String> miscellaneousMiscellaneousChecked,
			List<String> miscellaneousTechnologyChecked, List<String> miscellaneousWorkChecked) {
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
		this.basicsTravelAidsChecked = basicsTravelAidsChecked;
		this.basicsFundsChecked = basicsFundsChecked;
		this.basicsTravelInfoChecked = basicsTravelInfoChecked;
		this.clothesBasicsChecked = clothesBasicsChecked;
		this.clothesDressyChecked = clothesDressyChecked;
		this.clothesOuterwearChecked = clothesOuterwearChecked;
		this.clothesCasualChecked = clothesCasualChecked;
		this.clothesFootwearChecked = clothesFootwearChecked;
		this.clothesAccessoriesChecked = clothesAccessoriesChecked;
		this.hygieneHygieneChecked = hygieneHygieneChecked;
		this.miscellaneousDocumentsChecked = miscellaneousDocumentsChecked;
		this.miscellaneousBagsChecked = miscellaneousBagsChecked;
		this.miscellaneousMiscellaneousChecked = miscellaneousMiscellaneousChecked;
		this.miscellaneousTechnologyChecked = miscellaneousTechnologyChecked;
		this.miscellaneousWorkChecked = miscellaneousWorkChecked;
	}

	public PackingList(Trip trip, List<String> basicsTravelAids, List<String> basicsFunds,
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
		this.basicsTravelAidsChecked = new ArrayList<String>();
		this.basicsFundsChecked = new ArrayList<String>();
		this.basicsTravelInfoChecked = new ArrayList<String>();
		this.clothesBasicsChecked = new ArrayList<String>();
		this.clothesDressyChecked = new ArrayList<String>();
		this.clothesOuterwearChecked = new ArrayList<String>();
		this.clothesCasualChecked = new ArrayList<String>();
		this.clothesFootwearChecked = new ArrayList<String>();
		this.clothesAccessoriesChecked = new ArrayList<String>();
		this.hygieneHygieneChecked = new ArrayList<String>();
		this.miscellaneousDocumentsChecked = new ArrayList<String>();
		this.miscellaneousBagsChecked = new ArrayList<String>();
		this.miscellaneousMiscellaneousChecked = new ArrayList<String>();
		this.miscellaneousTechnologyChecked = new ArrayList<String>();
		this.miscellaneousWorkChecked = new ArrayList<String>();
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

	public PackingListPayload modelToPayloadChecked() {
		Basics basics = new Basics(getBasicsTravelAidsChecked(), getBasicsFundsChecked(), getBasicsTravelInfoChecked());
		Clothes clothes = new Clothes(getClothesBasicsChecked(), getClothesDressyChecked(), getClothesOuterwearChecked(), getClothesCasualChecked(),
				getClothesFootwearChecked(), getClothesAccessoriesChecked());
		Hygiene hygiene = new Hygiene(getHygieneHygieneChecked());
		Miscellaneous miscellaneous = new Miscellaneous(getMiscellaneousDocumentsChecked(), getMiscellaneousBagsChecked(),
				getMiscellaneousMiscellaneousChecked(), getMiscellaneousTechnologyChecked(), getMiscellaneousWorkChecked());

		return new PackingListPayload(basics, clothes, hygiene, miscellaneous);
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
		

		// Basics
		setBasicsFundsChecked(General.getIntersection(getBasicsFundsChecked(), packingListPayload.getBasics().getFunds()));
		setBasicsTravelAidsChecked(General.getIntersection(getBasicsTravelAidsChecked(), packingListPayload.getBasics().getTravelAids()));
		setBasicsTravelInfoChecked(General.getIntersection(getBasicsTravelInfoChecked(), packingListPayload.getBasics().getTravelInfo()));
		// Clothes
		setClothesBasicsChecked(General.getIntersection(getClothesBasicsChecked(), packingListPayload.getClothes().getBasics()));
		setClothesDressyChecked(General.getIntersection(getClothesDressyChecked(), packingListPayload.getClothes().getDressy()));
		setClothesOuterwearChecked(General.getIntersection(getClothesOuterwearChecked(), packingListPayload.getClothes().getOuterwear()));
		setClothesCasualChecked(General.getIntersection(getClothesCasualChecked(), packingListPayload.getClothes().getCasual()));
		setClothesFootwearChecked(General.getIntersection(getClothesFootwearChecked(), packingListPayload.getClothes().getFootwear()));
		setClothesAccessoriesChecked(General.getIntersection(getClothesAccessoriesChecked(), packingListPayload.getClothes().getAccessories()));
		// Hygiene
		setHygieneHygieneChecked(General.getIntersection(getHygieneHygieneChecked(), packingListPayload.getHygiene().getHygiene()));
		// Miscellaneous
		setMiscellaneousDocumentsChecked(General.getIntersection(getMiscellaneousDocumentsChecked(), packingListPayload.getMiscellaneous().getDocuments()));
		setMiscellaneousBagsChecked(General.getIntersection(getMiscellaneousBagsChecked(), packingListPayload.getMiscellaneous().getBags()));
		setMiscellaneousMiscellaneousChecked(General.getIntersection(getMiscellaneousMiscellaneousChecked(), packingListPayload.getMiscellaneous().getMiscellaneous()));
		setMiscellaneousTechnologyChecked(General.getIntersection(getMiscellaneousTechnologyChecked(), packingListPayload.getMiscellaneous().getTechnology()));
		setMiscellaneousWorkChecked(General.getIntersection(getMiscellaneousWorkChecked(), packingListPayload.getMiscellaneous().getWork()));
	}
	
	public void updateFromPayloadChecked(PackingListPayload packingListPayload) {
		// Basics
		setBasicsFundsChecked(packingListPayload.getBasics().getFunds());
		setBasicsTravelAidsChecked(packingListPayload.getBasics().getTravelAids());
		setBasicsTravelInfoChecked(packingListPayload.getBasics().getTravelInfo());
		// Clothes
		setClothesBasicsChecked(packingListPayload.getClothes().getBasics());
		setClothesDressyChecked(packingListPayload.getClothes().getDressy());
		setClothesOuterwearChecked(packingListPayload.getClothes().getOuterwear());
		setClothesCasualChecked(packingListPayload.getClothes().getCasual());
		setClothesFootwearChecked(packingListPayload.getClothes().getFootwear());
		setClothesAccessoriesChecked(packingListPayload.getClothes().getAccessories());
		// Hygiene
		setHygieneHygieneChecked(packingListPayload.getHygiene().getHygiene());
		// Miscellaneous
		setMiscellaneousDocumentsChecked(packingListPayload.getMiscellaneous().getDocuments());
		setMiscellaneousBagsChecked(packingListPayload.getMiscellaneous().getBags());
		setMiscellaneousMiscellaneousChecked(packingListPayload.getMiscellaneous().getMiscellaneous());
		setMiscellaneousTechnologyChecked(packingListPayload.getMiscellaneous().getTechnology());
		setMiscellaneousWorkChecked(packingListPayload.getMiscellaneous().getWork());
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

	public List<String> getBasicsTravelAidsChecked() {
		return basicsTravelAidsChecked;
	}

	public void setBasicsTravelAidsChecked(List<String> basicsTravelAidsChecked) {
		this.basicsTravelAidsChecked = basicsTravelAidsChecked;
	}

	public List<String> getBasicsFundsChecked() {
		return basicsFundsChecked;
	}

	public void setBasicsFundsChecked(List<String> basicsFundsChecked) {
		this.basicsFundsChecked = basicsFundsChecked;
	}

	public List<String> getBasicsTravelInfoChecked() {
		return basicsTravelInfoChecked;
	}

	public void setBasicsTravelInfoChecked(List<String> basicsTravelInfoChecked) {
		this.basicsTravelInfoChecked = basicsTravelInfoChecked;
	}

	public List<String> getClothesBasicsChecked() {
		return clothesBasicsChecked;
	}

	public void setClothesBasicsChecked(List<String> clothesBasicsChecked) {
		this.clothesBasicsChecked = clothesBasicsChecked;
	}

	public List<String> getClothesDressyChecked() {
		return clothesDressyChecked;
	}

	public void setClothesDressyChecked(List<String> clothesDressyChecked) {
		this.clothesDressyChecked = clothesDressyChecked;
	}

	public List<String> getClothesOuterwearChecked() {
		return clothesOuterwearChecked;
	}

	public void setClothesOuterwearChecked(List<String> clothesOuterwearChecked) {
		this.clothesOuterwearChecked = clothesOuterwearChecked;
	}

	public List<String> getClothesCasualChecked() {
		return clothesCasualChecked;
	}

	public void setClothesCasualChecked(List<String> clothesCasualChecked) {
		this.clothesCasualChecked = clothesCasualChecked;
	}

	public List<String> getClothesFootwearChecked() {
		return clothesFootwearChecked;
	}

	public void setClothesFootwearChecked(List<String> clothesFootwearChecked) {
		this.clothesFootwearChecked = clothesFootwearChecked;
	}

	public List<String> getClothesAccessoriesChecked() {
		return clothesAccessoriesChecked;
	}

	public void setClothesAccessoriesChecked(List<String> clothesAccessoriesChecked) {
		this.clothesAccessoriesChecked = clothesAccessoriesChecked;
	}

	public List<String> getHygieneHygieneChecked() {
		return hygieneHygieneChecked;
	}

	public void setHygieneHygieneChecked(List<String> hygieneHygieneChecked) {
		this.hygieneHygieneChecked = hygieneHygieneChecked;
	}

	public List<String> getMiscellaneousDocumentsChecked() {
		return miscellaneousDocumentsChecked;
	}

	public void setMiscellaneousDocumentsChecked(List<String> miscellaneousDocumentsChecked) {
		this.miscellaneousDocumentsChecked = miscellaneousDocumentsChecked;
	}

	public List<String> getMiscellaneousBagsChecked() {
		return miscellaneousBagsChecked;
	}

	public void setMiscellaneousBagsChecked(List<String> miscellaneousBagsChecked) {
		this.miscellaneousBagsChecked = miscellaneousBagsChecked;
	}

	public List<String> getMiscellaneousMiscellaneousChecked() {
		return miscellaneousMiscellaneousChecked;
	}

	public void setMiscellaneousMiscellaneousChecked(List<String> miscellaneousMiscellaneousChecked) {
		this.miscellaneousMiscellaneousChecked = miscellaneousMiscellaneousChecked;
	}

	public List<String> getMiscellaneousTechnologyChecked() {
		return miscellaneousTechnologyChecked;
	}

	public void setMiscellaneousTechnologyChecked(List<String> miscellaneousTechnologyChecked) {
		this.miscellaneousTechnologyChecked = miscellaneousTechnologyChecked;
	}

	public List<String> getMiscellaneousWorkChecked() {
		return miscellaneousWorkChecked;
	}

	public void setMiscellaneousWorkChecked(List<String> miscellaneousWorkChecked) {
		this.miscellaneousWorkChecked = miscellaneousWorkChecked;
	}

}