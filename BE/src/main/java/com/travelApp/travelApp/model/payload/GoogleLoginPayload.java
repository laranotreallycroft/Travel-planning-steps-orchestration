package com.travelApp.travelApp.model.payload;

public class GoogleLoginPayload {
	private String credential;

	public GoogleLoginPayload(String credential) {
		super();
		this.credential = credential;
	}

	public GoogleLoginPayload() {

	}

	public String getCredential() {
		return credential;
	}

	public void setCredential(String credential) {
		this.credential = credential;
	}
}
