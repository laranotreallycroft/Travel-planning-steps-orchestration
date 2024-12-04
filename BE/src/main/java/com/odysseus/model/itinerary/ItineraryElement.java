package com.odysseus.model.itinerary;

import java.sql.Timestamp;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.Point;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "itinerary_elements")
public class ItineraryElement implements Comparable<ItineraryElement> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String label;
    private Point location;

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
    @JsonIgnoreProperties("itineraryElements")
    private Itinerary itinerary;

    private Integer duration;

    public ItineraryElement() {

    }

    public ItineraryElement(String label, Point location, Timestamp commuteStartDate, Timestamp commuteEndDate,
                            Timestamp startDate, Timestamp endDate, Itinerary itinerary, Integer duration) {
        super();
        this.label = label;
        this.location = location;
        this.commuteStartDate = commuteStartDate;
        this.commuteEndDate = commuteEndDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.itinerary = itinerary;
        this.duration = duration;
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

    public Coordinate getLocation() {
        return location.getCoordinate();
    }

    public void setLocation(Point location) {
        this.location = location;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
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

    @Override
    public int compareTo(ItineraryElement o) {
        return this.startDate.compareTo(getStartDate());
    }

}
