package com.odysseus.model.payload.trip;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TripSettingsPayload extends TripPayload {


    public TripSettingsPayload() {

    }


}
