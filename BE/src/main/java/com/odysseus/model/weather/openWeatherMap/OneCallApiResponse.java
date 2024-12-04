package com.odysseus.model.weather.openWeatherMap;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OneCallApiResponse {

    private CurrentWeather current;
    private List<DailyWeather> daily;

    public OneCallApiResponse() {

    }

    public OneCallApiResponse(CurrentWeather current, List<DailyWeather> daily) {

        this.current = current;
        this.daily = daily;
    }


    public CurrentWeather getCurrent() {
        return current;
    }


    public List<DailyWeather> getDaily() {
        return daily;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class CurrentWeather {
        private long dt;
        private double temp;
        private int humidity;
        private double wind_speed;
        private List<WeatherDescription> weather;

        public CurrentWeather() {

        }

        public CurrentWeather(long dt, double temp, int humidity, double wind_speed, List<WeatherDescription> weather) {
            this.dt = dt;
            this.temp = temp;
            this.humidity = humidity;
            this.wind_speed = wind_speed;
            this.weather = weather;
        }

        public double getWind_speed() {
            return wind_speed;
        }


        public long getDt() {
            return dt;
        }


        public double getTemp() {
            return temp;
        }


        public int getHumidity() {
            return humidity;
        }


        public List<WeatherDescription> getWeather() {
            return weather;
        }


    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class DailyWeather {
        private long dt;
        private Temperature temp;
        private int humidity;
        private double wind_speed;
        private List<WeatherDescription> weather;

        public DailyWeather() {
        }

        public DailyWeather(long dt, Temperature temp, int humidity, double wind_speed, List<WeatherDescription> weather) {
            this.dt = dt;
            this.temp = temp;
            this.humidity = humidity;
            this.wind_speed = wind_speed;
            this.weather = weather;
        }

        public long getDt() {
            return dt;
        }


        public Temperature getTemp() {
            return temp;
        }


        public int getHumidity() {
            return humidity;
        }


        public double getWind_speed() {
            return wind_speed;
        }


        public List<WeatherDescription> getWeather() {
            return weather;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Temperature {

        private double min;
        private double max;

        public Temperature() {
        }


        public Temperature(double min, double max) {

            this.min = min;
            this.max = max;
        }


        public double getMin() {
            return min;
        }

        public double getMax() {
            return max;
        }

    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class WeatherDescription {
        private int id;
        private String description;
        private String icon;

        public WeatherDescription() {

        }


        public WeatherDescription(int id, String description, String icon) {
            this.id = id;
            this.description = description;
            this.icon = icon;
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getDescription() {
            return description;
        }

        public String getIcon() {
            return icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }
    }

}
