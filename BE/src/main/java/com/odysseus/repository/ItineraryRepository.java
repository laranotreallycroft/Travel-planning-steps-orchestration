package com.odysseus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.odysseus.model.itinerary.Itinerary;

@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {
}