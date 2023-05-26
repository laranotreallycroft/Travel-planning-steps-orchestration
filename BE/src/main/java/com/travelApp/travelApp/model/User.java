package com.travelApp.travelApp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String email;
	private byte[] password_salt;
	private String password_hash;
	private boolean google_user;
	private String google_user_id;

	public User() {

	}

	public User(String email, byte[] password_salt, String password_hash) {
		super();
		this.email = email;
		this.password_salt = password_salt;
		this.password_hash = password_hash;
	}
	
	public User(boolean google_user,String google_user_id,String email ) {
		super();
		this.google_user = google_user;
		this.google_user_id = google_user_id;
		this.email = email;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public byte[] getPasswordSalt() {
		return password_salt;
	}

	public void setPasswordSalt(byte[] password_salt) {
		this.password_salt = password_salt;
	}

	public String getPasswordHash() {
		return password_hash;
	}

	public void setPasswordHash(String password_hash) {
		this.password_hash = password_hash;
	}

	public boolean isGoogleUser() {
		return google_user;
	}

	public void setGoogleUser(boolean google_user) {
		this.google_user = google_user;
	}

	public String getGoogleUserId() {
		return google_user_id;
	}

	public void setGoogleUserId(String google_user_id) {
		this.google_user_id = google_user_id;
	}



}