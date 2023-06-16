package com.forgetMeNot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.forgetMeNot.model.ItineraryElement;

@Repository
public interface ItineraryElementRepository extends JpaRepository<ItineraryElement, Long> {
}