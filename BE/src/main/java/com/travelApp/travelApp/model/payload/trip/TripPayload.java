package com.travelApp.travelApp.model.payload.trip;

import java.time.LocalDate;

import com.travelApp.travelApp.model.payload.common.GeosearchPayload;

public class TripPayload {

	private String name;
	private Long userId;
	private LocalDate dateFrom;
	private LocalDate dateTo;
	private GeosearchPayload location;

	public TripPayload() {

	}

	public TripPayload(String name, Long userId, LocalDate dateFrom, LocalDate dateTo, GeosearchPayload location) {
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

	public GeosearchPayload getLocation() {
		return location;
	}

	public void setLocation(GeosearchPayload location) {
		this.location = location;
	}

}
