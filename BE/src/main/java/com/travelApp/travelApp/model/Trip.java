package com.travelApp.travelApp.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.Point;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "trips")
public class Trip {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String label;

	@Column(name = "date_from")
	private LocalDate dateFrom;
	@Column(name = "date_to")
	private LocalDate dateTo;

	@Column(name = "location_label")
	private String locationLabel;
	private Point location;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonBackReference
	private User user;

	@OneToMany(mappedBy = "trip", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("trip")
	private List<PackingList> packingLists;

	@OneToMany(mappedBy = "trip", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("trip")
	private List<Itinerary> itineraries;

	public Trip() {

	}

	public Trip(String label, LocalDate dateFrom, LocalDate dateTo, String locationLabel, Point location, User user) {
		super();
		this.label = label;
		this.dateFrom = dateFrom;
		this.dateTo = dateTo;
		this.locationLabel = locationLabel;
		this.location = location;
		this.user = user;
	}

	public String getLocationLabel() {
		return locationLabel;
	}

	public void setLocationLabel(String locationLabel) {
		this.locationLabel = locationLabel;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public LocalDate getDateFrom() {
		return dateFrom;
	}

	public void setDateFrom(LocalDate dateFrom) {
		this.dateFrom = dateFrom;
	}

	public LocalDate getDateTo() {
		return dateTo;
	}

	public void setDateTo(LocalDate dateTo) {
		this.dateTo = dateTo;
	}

	public Coordinate getLocation() {
		return location.getCoordinate();
	}

	public void setLocation(Point location) {
		this.location = location;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<PackingList> getPackingLists() {
		 packingLists.sort(Comparator.comparing(PackingList::getId));
		 return packingLists;
	}

	public void setPackingLists(List<PackingList> packingLists) {
		this.packingLists = packingLists;
	}

	public List<Itinerary> getItineraries() {
		return itineraries;
	}

	public void setItineraries(List<Itinerary> itineraries) {
		this.itineraries = itineraries;
	}

	public void addItinerary(Itinerary itinerary) {
		if (itineraries == null)
			itineraries = new ArrayList<>();
		itineraries.add(itinerary);
	}
}
