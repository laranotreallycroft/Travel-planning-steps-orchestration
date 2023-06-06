package com.travelApp.travelApp.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "itineraries")
public class Itinerary {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private LocalDate date;
	@ManyToOne
	@JoinColumn(name = "trip_id")
	@JsonIgnoreProperties("itinerary")
	private Trip trip;

	@OneToMany(mappedBy = "itinerary", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("itinerary")
	private List<ItineraryElement> itineraryElements;

	public Itinerary() {

	}

	public Itinerary(Trip trip, LocalDate date) {
		super();
		this.trip = trip;
		this.date = date;
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

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public List<ItineraryElement> getItineraryElements() {
		return itineraryElements;
	}

	public void setItineraryElements(List<ItineraryElement> itineraryElements) {
		this.itineraryElements = itineraryElements;
	}

	public void addItineraryElement(ItineraryElement itineraryElement) {
		if(this.itineraryElements==null) itineraryElements= new ArrayList<>();
		this.itineraryElements.add(itineraryElement);
	}

}
