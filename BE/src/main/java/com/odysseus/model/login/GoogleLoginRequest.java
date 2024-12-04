package com.odysseus.model.login;

public class GoogleLoginRequest {
    private String credential;

    public GoogleLoginRequest() {

    }

    public GoogleLoginRequest(String credential) {
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
