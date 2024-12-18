package com.odysseus.model.itinerary;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TransportationMethodEnum {
    CAR("driving-car"),
    BICYCLE("cycling-regular"),
    MOUNTAIN_BICYCLE("cycling-mountain"),
    WALKING("foot-walking"),
    HIKING("foot-hiking"),
    WHEELCHAIR("wheelchair");

    private final String value;

    TransportationMethodEnum(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static TransportationMethodEnum fromValue(String value) {
        for (TransportationMethodEnum method : TransportationMethodEnum.values()) {
            if (method.value.equals(value)) {
                return method;
            }
        }
        throw new IllegalArgumentException("Unknown transportation method: " + value);
    }
}
