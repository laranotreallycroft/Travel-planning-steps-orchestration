package com.travelApp.travelApp.model;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "trips")
public class Trip {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private LocalDate date_from;
	private LocalDate date_to;

	private String location;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	public Trip() {

	}

	public Trip(LocalDate date_from, LocalDate date_to, String location, User user) {
		super();
		this.date_from = date_from;
		this.date_to = date_to;
		this.location = location;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDate_from() {
		return date_from;
	}

	public void setDate_from(LocalDate date_from) {
		this.date_from = date_from;
	}

	public LocalDate getDate_to() {
		return date_to;
	}

	public void setDate_to(LocalDate date_to) {
		this.date_to = date_to;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
