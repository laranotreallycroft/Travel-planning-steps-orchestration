package com.odysseus.model.itinerary;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ScheduleElement implements Comparable<ScheduleElement> {
    private Long id;
    private Timestamp startDate;
    private Timestamp endDate;

    public ScheduleElement() {

    }

    public ScheduleElement(Long id, Timestamp startDate, Timestamp endDate) {
        super();
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
