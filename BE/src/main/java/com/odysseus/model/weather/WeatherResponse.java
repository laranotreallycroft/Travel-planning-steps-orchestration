package com.odysseus.model.weather;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


public class WeatherResponse {
    private String locationName;
    private CurrentWeather current;
    private List<DailyForecast> forecast;


    public WeatherResponse(CurrentWeather current, List<DailyForecast> forecast) {
        this.current = current;
        this.forecast = forecast;
    }

    public WeatherResponse(String locationName, CurrentWeather current, List<DailyForecast> forecast) {
        this.locationName = locationName;
        this.current = current;
        this.forecast = forecast;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public CurrentWeather getCurrent() {
        return current;
    }

    public void setCurrent(CurrentWeather current) {
        this.current = current;
    }

    public List<DailyForecast> getForecast() {
        return forecast;
    }

    public void setForecast(List<DailyForecast> forecast) {
        this.forecast = forecast;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class CurrentWeather {
        private String date;
        private String description;
        private String icon;
        private double temperature;
        private double wind;
        private int humidity;

        public CurrentWeather() {

        }

        public CurrentWeather(String date, String description, String icon, double temperature, double wind, int humidity) {
            this.date = date;
            this.description = description;
            this.icon = icon;
            this.temperature = temperature;
            this.wind = wind;
            this.humidity = humidity;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getIcon() {
            return icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }

        public double getTemperature() {
            return temperature;
        }

        public void setTemperature(double temperature) {
            this.temperature = temperature;
        }

        public double getWind() {
            return wind;
        }

        public void setWind(double wind) {
            this.wind = wind;
        }

        public int getHumidity() {
            return humidity;
        }

        public void setHumidity(int humidity) {
            this.humidity = humidity;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class DailyForecast {
        private String date;
        private String description;
        private String icon;
        private Double temperatureMin;
        private Double temperatureMax;
        private String wind;
        private int humidity;
        private String key;

        public DailyForecast() {

        }

        public DailyForecast(String date, String description, String icon, Double temperatureMin, Double temperatureMax, String wind, int humidity, String key) {
            this.date = date;
            this.description = description;
            this.icon = icon;
            this.temperatureMin = temperatureMin;
            this.temperatureMax = temperatureMax;
            this.wind = wind;
            this.humidity = humidity;
            this.key = key;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getIcon() {
            return icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }

        public Double getTemperatureMin() {
            return temperatureMin;
        }

        public void setTemperatureMin(Double temperatureMin) {
            this.temperatureMin = temperatureMin;
        }

        public Double getTemperatureMax() {
            return temperatureMax;
        }

        public void setTemperatureMax(Double temperatureMax) {
            this.temperatureMax = temperatureMax;
        }

        public String getWind() {
            return wind;
        }

        public void setWind(String wind) {
            this.wind = wind;
        }

        public int getHumidity() {
            return humidity;
        }

        public void setHumidity(int humidity) {
            this.humidity = humidity;
        }

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }
    }
}
