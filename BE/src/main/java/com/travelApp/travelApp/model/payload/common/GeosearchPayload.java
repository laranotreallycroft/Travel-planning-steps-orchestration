package com.travelApp.travelApp.model.payload.common;

public class GeosearchPayload {

	private Double x;
	private Double y;
	private String label;

	public GeosearchPayload() {

	}

	public GeosearchPayload(Double x, Double y, String label) {
		super();
		this.x = x;
		this.y = y;
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
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

	public PointPayload getPointPayload() {
		return new PointPayload(this.x, this.y);
	}

}
