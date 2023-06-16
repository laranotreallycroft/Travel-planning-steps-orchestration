package com.forgetMeNot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.forgetMeNot.model.Itinerary;

@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {
}