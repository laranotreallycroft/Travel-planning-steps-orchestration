package com.travelApp.travelApp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "google_users")
public class GoogleUser {

	@Id
	private String id;

	private String email;

	public GoogleUser(String id, String email) {
		super();
		this.id = id;
		this.email = email;
	}

	public GoogleUser() {

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}