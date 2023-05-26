package com.travelApp.travelApp.model.payload;

import java.time.LocalDate;

public class TripCreatePayload {
	private Long userId;
	private LocalDate date_from;
	private LocalDate date_to;
	private String location;

	public TripCreatePayload() {

	}

	public TripCreatePayload(Long userId, LocalDate date_from, LocalDate date_to, String location) {
		super();
		this.userId = userId;
		this.date_from = date_from;
		this.date_to = date_to;
		this.location = location;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public LocalDate getDate_from() {
		return date_from;
	}

	public void setDate_from(LocalDate date_from) {
		this.date_from = date_from;
	}

	public LocalDate getDate_to() {
		return date_to;
	}

	public void setDate_to(LocalDate date_to) {
		this.date_to = date_to;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

}
