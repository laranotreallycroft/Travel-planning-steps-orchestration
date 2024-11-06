package com.odysseus.model.payload.common;

import java.util.List;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

public class GeosearchPayload {

    private String id;
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

    public GeosearchPayload(String id, Double x, Double y, String label) {
        super();
        this.id = id;
        this.x = x;
        this.y = y;
        this.label = label;
    }

    public GeosearchPayload(List<Double> location) {
        this.x = location.get(0);
        this.y = location.get(1);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Point toPoint() {
        GeometryFactory gf = new GeometryFactory();
        return gf.createPoint(new Coordinate(this.x, this.y));
    }

}
