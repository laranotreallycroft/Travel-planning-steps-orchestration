package com.travelApp.travelApp.model;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.Point;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "itinerary_elements")
public class ItineraryElement {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String label;
	private Point location;
	@Column(name = "travel_duration")
	private Integer travelDuration;

	@ManyToOne
	@JoinColumn(name = "itinerary_id")
	@JsonIgnoreProperties("itinerary")
	private Itinerary itinerary;

	public ItineraryElement() {

	}

	public ItineraryElement(String label, Point location, Integer travelDuration, Itinerary itinerary) {
		super();
		this.label = label;
		this.location = location;
		this.travelDuration = travelDuration;
		this.itinerary = itinerary;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Coordinate getLocation() {
		return location.getCoordinate();
	}

	public void setLocation(Point location) {
		this.location = location;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public Integer getTravelDuration() {
		return travelDuration;
	}

	public void setTravelDuration(Integer tripTime) {
		this.travelDuration = tripTime;
	}

	public Itinerary getItinerary() {
		return itinerary;
	}

	public void setItinerary(Itinerary itinerary) {
		this.itinerary = itinerary;
	}

}
