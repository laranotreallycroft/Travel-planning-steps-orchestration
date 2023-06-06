package com.travelApp.travelApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travelApp.travelApp.model.ItineraryElement;

@Repository
public interface ItineraryElementRepository extends JpaRepository<ItineraryElement, Long> {
}