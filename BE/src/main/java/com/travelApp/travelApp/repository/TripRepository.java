package com.travelApp.travelApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travelApp.travelApp.model.Trip;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
}