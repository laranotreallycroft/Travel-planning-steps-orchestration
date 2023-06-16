package com.forgetMeNot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.forgetMeNot.model.Trip;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
}