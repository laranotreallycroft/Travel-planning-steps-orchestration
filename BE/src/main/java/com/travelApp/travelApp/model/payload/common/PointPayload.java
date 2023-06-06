package com.travelApp.travelApp.model.payload.common;

import java.util.List;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

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

	public PointPayload(List<Double> location) {
		this.x = location.get(0);
		this.y = location.get(1);
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

	public Point toPoint() {
		GeometryFactory gf = new GeometryFactory();
		return gf.createPoint(new Coordinate(x, y));
	}

}
