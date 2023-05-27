package com.travelApp.travelApp.model.payload;

import java.time.LocalDate;

public class TripPayload {

	private String name;
	private Long userId;
	private LocalDate dateFrom;
	private LocalDate dateTo;
	private PointPayload location;

	public TripPayload() {

	}

	public TripPayload(String name, Long userId, LocalDate dateFrom, LocalDate dateTo, PointPayload location) {
		super();
		this.name = name;
		this.userId = userId;
		this.dateFrom = dateFrom;
		this.dateTo = dateTo;
		this.location = location;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
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

	public PointPayload getLocation() {
		return location;
	}

	public void setLocation(PointPayload location) {
		this.location = location;
	}

}
