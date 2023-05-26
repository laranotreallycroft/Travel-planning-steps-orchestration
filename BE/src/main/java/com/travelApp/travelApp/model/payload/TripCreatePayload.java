package com.travelApp.travelApp.model.payload;

import java.util.Date;

public class TripCreatePayload {

	private Long userId;
	private Date dateFrom;
	private Date dateTo;
	private PointPayload location;

	public TripCreatePayload() {

	}

	public TripCreatePayload(Long userId, Date dateFrom, Date dateTo, PointPayload location) {
		super();
		this.userId = userId;
		this.dateFrom = dateFrom;
		this.dateTo = dateTo;
		this.location = location;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Date getDateFrom() {
		return dateFrom;
	}

	public void setDateFrom(Date dateFrom) {
		this.dateFrom = dateFrom;
	}

	public Date getDateTo() {
		return dateTo;
	}

	public void setDateTo(Date dateTo) {
		this.dateTo = dateTo;
	}

	public PointPayload getLocation() {
		return location;
	}

	public void setLocation(PointPayload location) {
		this.location = location;
	}

}
