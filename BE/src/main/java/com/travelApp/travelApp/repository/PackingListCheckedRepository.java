package com.travelApp.travelApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.travelApp.travelApp.model.PackingListChecked;

@Repository
public interface PackingListCheckedRepository extends JpaRepository<PackingListChecked, Long> {
	@Query(value = "SELECT * FROM packing_lists_checked WHERE trip_id = ?1", nativeQuery=true)
	public PackingListChecked findByTripId (Long tripId);
}