package com.odysseus.model.weather.openWeatherMap;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TimemachineApiResponse {

    private OneCallApiResponse.CurrentWeather[] data;

    public TimemachineApiResponse() {
    }

    public TimemachineApiResponse(OneCallApiResponse.CurrentWeather[] data) {
        this.data = data;
    }

    public OneCallApiResponse.CurrentWeather getData() {
        return data[0];
    }

    public void setData(OneCallApiResponse.CurrentWeather[] data) {
        this.data = data;
    }
}
