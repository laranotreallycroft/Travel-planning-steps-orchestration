package com.odysseus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.odysseus.model.packingList.PackingList;

@Repository
public interface PackingListRepository extends JpaRepository<PackingList, Long> {
    @Query(value = "SELECT * FROM packing_lists WHERE trip_id = ?1", nativeQuery = true)
    public PackingList findByTripId(Long tripId);
}