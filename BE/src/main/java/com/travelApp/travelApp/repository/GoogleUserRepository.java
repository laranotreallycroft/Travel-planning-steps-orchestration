package com.travelApp.travelApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travelApp.travelApp.model.GoogleUser;

@Repository
public interface GoogleUserRepository extends JpaRepository<GoogleUser, String> {
}