package com.odysseus.model.weather.openWeatherMap;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReverseApiResponseItem {
    private String name;

    public ReverseApiResponseItem() {

    }

    public ReverseApiResponseItem(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }


}