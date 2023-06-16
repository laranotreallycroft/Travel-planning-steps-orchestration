package com.forgetMeNot.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "packing_lists")
public class PackingList {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "trip_id", nullable = false)
	private Trip trip;

	private String label;

	private List<String> items;

	@Column(name = "checked_items")
	private List<String> checkedItems;

	public PackingList() {

	}

	public PackingList(Trip trip) {
		super();
		this.trip = trip;
	}

	public PackingList(Trip trip, PackingList packingList) {
		super();
		this.trip = trip;
		this.label = packingList.getLabel();
		this.items = packingList.getItems();
		this.checkedItems = new ArrayList<>();
	}

	public PackingList(Trip trip, String label, List<String> items) {
		super();
		this.trip = trip;
		this.label = label;
		this.items = items;
		this.checkedItems = new ArrayList<>();
	}

	public PackingList(Trip trip, String label, List<String> items, List<String> checkedItems) {
		super();
		this.trip = trip;
		this.label = label;
		this.items = items;
		this.checkedItems = checkedItems;
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

	public List<String> getCheckedItems() {
		return checkedItems;
	}

	public void setCheckedItems(List<String> checkedItems) {
		this.checkedItems = checkedItems;
	}

	public void filterAndSetCheckedItems(List<String> items) {
		checkedItems.retainAll(items);
	}

}