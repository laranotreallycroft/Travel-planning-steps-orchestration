package com.forgetMeNot.model.payload.login;

public class GoogleLoginPayload {
	private String credential;

	public GoogleLoginPayload() {

	}

	public GoogleLoginPayload(String credential) {
		super();
		this.credential = credential;
	}

	public String getCredential() {
		return credential;
	}

	public void setCredential(String credential) {
		this.credential = credential;
	}
}
