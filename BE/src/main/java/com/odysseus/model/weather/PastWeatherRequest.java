package com.odysseus.model.weather;

public class PastWeatherRequest extends WeatherRequest {
    private long timestamp;

    public PastWeatherRequest(double lat, double lon, String lang, long timestamp) {
        super(lat, lon, lang);
        this.timestamp = timestamp;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
