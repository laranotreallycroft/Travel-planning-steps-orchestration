package com.travelApp.travelApp.model.payload;

public class UserPayload {
	private String email;
	private String id;

	public UserPayload(String email, String id) {
		super();
		this.email = email;
		this.id = id;
	}

	public UserPayload() {

	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

}
