package com.travelApp.travelApp.model.payload;

public class PointPayload {

	private Double x;
	private Double y;

	public PointPayload() {

	}

	public PointPayload(Double x, Double y) {
		super();
		this.x = x;
		this.y = y;
	}

	public Double getX() {
		return x;
	}

	public void setX(Double x) {
		this.x = x;
	}

	public Double getY() {
		return y;
	}

	public void setY(Double y) {
		this.y = y;
	}

}
