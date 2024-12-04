package com.odysseus.model.weather;

import java.util.List;


public class WeatherResponse {
    private String name;
    private CurrentWeather current;
    private List<DailyForecast> forecast;


    public WeatherResponse(CurrentWeather current, List<DailyForecast> forecast) {
        this.current = current;
        this.forecast = forecast;
    }

    public WeatherResponse(String name, CurrentWeather current, List<DailyForecast> forecast) {
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

    public static class CurrentWeather {
        private String date;
        private String description;
        private String icon;
        private TemperatureResponse temperature;
        private double wind;
        private int humidity;

        public CurrentWeather() {

        }

        public CurrentWeather(String date, String description, String icon, TemperatureResponse temperature, double wind, int humidity) {
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

        public void setTemperature(TemperatureResponse temperature) {
            this.temperature = temperature;
        }

        public double getWind() {
            return wind;
        }

        public int getHumidity() {
            return humidity;
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

    public static class DailyForecast {
        private String date;
        private String description;
        private String icon;
        private TemperatureResponse temperature;
        private String wind;
        private int humidity;
        private String key;

        public DailyForecast() {

        }

        public DailyForecast(String date, String description, String icon, Double temperatureMin, Double temperatureMax, String wind, int humidity, String key) {
            this.date = date;
            this.description = description;
            this.icon = icon;
            this.temperature = new TemperatureResponse((int) Math.round(temperatureMin), (int) Math.round(temperatureMax));
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

        public void setTemperature(double min, double max) {
            this.temperature = new TemperatureResponse((int) Math.round(min), (int) Math.round(max));
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

        public TemperatureResponse getTemperature() {
            return temperature;
        }

        public void setTemperature(TemperatureResponse temperature) {
            this.temperature = temperature;
        }
    }
}
