package com.odysseus.model.itinerary;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.odysseus.model.location.Location;
import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "itinerary_elements")
public class ItineraryElement implements Comparable<ItineraryElement> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "location_id")
    @JsonIgnoreProperties("itinerary_elements")
    private Location location;

    @Column(name = "start_date")
    private Timestamp startDate;
    @Column(name = "end_date")
    private Timestamp endDate;
    @Column(name = "commute_start_date")
    private Timestamp commuteStartDate;
    @Column(name = "commute_end_date")
    private Timestamp commuteEndDate;

    @ManyToOne
    @JoinColumn(name = "itinerary_id")
    @JsonIgnoreProperties("itinerary_elements")
    private Itinerary itinerary;

    private Integer duration;
    private boolean start;

    public ItineraryElement() {

    }

    public ItineraryElement(Location location, Timestamp commuteStartDate, Timestamp commuteEndDate,
                            Timestamp startDate, Timestamp endDate, Itinerary itinerary, Integer duration, boolean start) {
        super();
        this.location = location;
        this.commuteStartDate = commuteStartDate;
        this.commuteEndDate = commuteEndDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.itinerary = itinerary;
        this.duration = duration;
        this.start = start;
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

    public Timestamp getCommuteStartDate() {
        return commuteStartDate;
    }

    public void setCommuteStartDate(Timestamp commuteStartDate) {
        this.commuteStartDate = commuteStartDate;
    }

    public Timestamp getCommuteEndDate() {
        return commuteEndDate;
    }

    public void setCommuteEndDate(Timestamp commuteEndDate) {
        this.commuteEndDate = commuteEndDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Itinerary getItinerary() {
        return itinerary;
    }

    public void setItinerary(Itinerary itinerary) {
        this.itinerary = itinerary;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public boolean isStart() {
        return start;
    }

    public void setStart(boolean start) {
        this.start = start;
    }

    @Override
    public int compareTo(ItineraryElement o) {
        return this.startDate.compareTo(getStartDate());
    }

}
