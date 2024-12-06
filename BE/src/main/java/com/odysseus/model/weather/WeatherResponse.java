package com.odysseus.model.weather;

import java.util.ArrayList;
import java.util.List;


public class WeatherResponse {
    private String name;
    private Weather current;
    private List<Weather> forecast;

    public WeatherResponse() {
        forecast = new ArrayList<Weather>();
    }

    public WeatherResponse(Weather current, List<Weather> forecast) {
        this.current = current;
        this.forecast = forecast;
    }

    public WeatherResponse(String name, Weather current, List<Weather> forecast) {
        this.name = name;
        this.current = current;
        this.forecast = forecast;
    }

    public String getName() {
        return name;
    }

    public void setName(String locationName) {
        this.name = locationName;
    }

    public Weather getCurrent() {
        return current;
    }

    public void setCurrent(Weather current) {
        this.current = current;
    }

    public List<Weather> getForecast() {
        return forecast;
    }

    public void setForecast(List<Weather> forecast) {
        this.forecast = forecast;
    }

    public void addForecast(Weather forecast) {
        this.forecast.add(forecast);
    }

    public static class Weather {
        private String date;
        private String description;
        private String icon;
        private TemperatureResponse temperature;
        private double wind;
        private int humidity;
        private String key;

        public Weather() {

        }

        public Weather(String date, String description, String icon, TemperatureResponse temperature, double wind, int humidity) {
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


        public void setIcon(String icon) {
            this.icon = icon;
        }


        public void setTemperature(double temperature) {
            this.temperature = new TemperatureResponse((int) Math.round(temperature));
        }


        public void setWind(double wind) {
            this.wind = wind;
        }


        public void setHumidity(int humidity) {
            this.humidity = humidity;
        }

        public String getIcon() {
            return icon;
        }

        public TemperatureResponse getTemperature() {
            return temperature;
        }

        public void setTemperature(double min, double max) {
            this.temperature = new TemperatureResponse((int) Math.round(min), (int) Math.round(max));
        }

        public void setTemperature(TemperatureResponse temperature) {
            this.temperature = temperature;
        }

        public double getWind() {
            return wind;
        }

        public int getHumidity() {
            return humidity;
        }

        public String getKey() {
            return key;
        }

        public void setKey(String string) {
        }
    }

    private static class TemperatureResponse {
        private int min;
        private int max;
        private int current;

        public TemperatureResponse() {

        }

        public TemperatureResponse(int current) {
            this.current = current;
        }

        public TemperatureResponse(int min, int max) {
            this.min = min;
            this.max = max;
        }

        public double getMin() {
            return min;
        }

        public void setMin(int min) {
            this.min = min;
        }

        public double getMax() {
            return max;
        }

        public void setMax(int max) {
            this.max = max;
        }

        public double getCurrent() {
            return current;
        }

        public void setCurrent(int current) {
            this.current = current;
        }
    }


}
