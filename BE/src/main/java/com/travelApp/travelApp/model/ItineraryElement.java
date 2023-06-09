package com.travelApp.travelApp.model;

import java.time.LocalDateTime;

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

	@Column(name = "date_time")
	private LocalDateTime dateTime;

	@ManyToOne
	@JoinColumn(name = "itinerary_id")
	@JsonIgnoreProperties("itineraryElements")
	private Itinerary itinerary;

	public ItineraryElement() {

	}

	public ItineraryElement(String label, Point location, Integer travelDuration, LocalDateTime dateTime,
			Itinerary itinerary) {
		super();
		this.label = label;
		this.location = location;
		this.travelDuration = travelDuration;
		this.dateTime = dateTime;
		this.itinerary = itinerary;
	}

	public LocalDateTime getDateTime() {
		return dateTime;
	}

	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
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
