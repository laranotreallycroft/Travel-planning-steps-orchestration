package com.odysseus.model.payload.itinerary;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ScheduleElement implements Comparable<ScheduleElement> {
    private String id;
    private Timestamp startDate;
    private Timestamp endDate;

    public ScheduleElement() {

    }

    public ScheduleElement(String id, Timestamp startDate, Timestamp endDate) {
        super();
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Timestamp getStartDate() {
        return startDate;
    }

    public void setStartDate(Timestamp startDate) {
        this.startDate = startDate;
    }

    public Timestamp getEndDate() {
        return endDate;
    }

    public void setEndDate(Timestamp endDate) {
        this.endDate = endDate;
    }


    @Override
    public int compareTo(ScheduleElement o) {
        return startDate.compareTo(o.getStartDate());
    }


}
