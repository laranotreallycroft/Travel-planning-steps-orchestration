package com.travelApp.travelApp.utils;

import com.fasterxml.jackson.annotation.JsonSetter;

public abstract class PointMixIn {
	@JsonSetter("x")
	public abstract void setX(double x);

	@JsonSetter("y")
	public abstract void setY(double y);
	
	@JsonSetter("z")
	public abstract void setZ(double z);
}
