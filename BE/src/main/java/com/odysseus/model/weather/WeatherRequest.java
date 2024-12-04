package com.odysseus.model.weather;

public class WeatherRequest {
    private double lat;
    private double lon;
    private String lang;

    public WeatherRequest(double lat, double lon, String lang) {
        this.lat = lat;
        this.lon = lon;
        this.lang = lang;
    }


    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }
}
