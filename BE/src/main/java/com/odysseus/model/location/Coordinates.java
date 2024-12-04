package com.odysseus.model.location;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;


public class Coordinates {

    private Double x;
    private Double y;


    public Coordinates(Double x, Double y) {
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

    public Point toPoint() {
        GeometryFactory gf = new GeometryFactory();
        return gf.createPoint(new Coordinate(this.x, this.y));
    }

}
