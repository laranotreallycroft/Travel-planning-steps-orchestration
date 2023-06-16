package com.forgetMeNot.model.payload.trip;

import java.time.LocalDate;

import com.forgetMeNot.model.payload.common.GeosearchPayload;

public class TripPayload {

	private String label;
	private Long userId;
	private LocalDate dateFrom;
	private LocalDate dateTo;
	private String locationLabel;
	private GeosearchPayload location;

	public TripPayload() {

	}

	public TripPayload(String label, Long userId, LocalDate dateFrom, LocalDate dateTo, String locationLabel,
			GeosearchPayload location) {
		super();
		this.label = label;
		this.userId = userId;
		this.dateFrom = dateFrom;
		this.dateTo = dateTo;
		this.locationLabel = locationLabel;
		this.location = location;
	}

	public String getLocationLabel() {
		return locationLabel;
	}

	public void setLocationLabel(String locationLabel) {
		this.locationLabel = locationLabel;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
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
