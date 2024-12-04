package com.odysseus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.odysseus.model.itinerary.ItineraryElement;

@Repository
public interface ItineraryElementRepository extends JpaRepository<ItineraryElement, Long> {
}