package com.odysseus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.odysseus.model.Trip;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
}