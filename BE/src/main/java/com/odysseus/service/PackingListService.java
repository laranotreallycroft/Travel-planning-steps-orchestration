package com.odysseus.service;

import com.odysseus.model.packingList.PackingList;
import com.odysseus.model.packingList.PackingListCheckedPayload;
import com.odysseus.model.packingList.PackingListCreatePayload;
import com.odysseus.model.trip.Trip;
import com.odysseus.repository.PackingListRepository;
import com.odysseus.repository.TripRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PackingListService {

    private final TripRepository tripRepository;
    private final PackingListRepository packingListRepository;

    public PackingListService(TripRepository tripRepository, PackingListRepository packingListRepository) {
        this.tripRepository = tripRepository;
        this.packingListRepository = packingListRepository;
    }

    /**
     * Creates a new packing list for the given user based on the provided packing list create request.
     *
     * @param packingListCreatePayload the details of the packing list to be created.
     * @throws IllegalArgumentException if the trip is null.
     */
    public Trip createPackingList(PackingListCreatePayload packingListCreatePayload) {
        Trip trip = tripRepository.findById(packingListCreatePayload.getTripId()).orElseThrow(() -> new IllegalArgumentException("Trip not found"));

        PackingList packingList = new PackingList(trip, packingListCreatePayload.getLabel(),
                packingListCreatePayload.getItems());
        packingListRepository.save(packingList);
        return trip;

    }

    /**
     * Update checked items of a packing list.
     *
     * @param packingListCheckedPayload list of checked items
     * @throws IllegalArgumentException if the packing list is null.
     */
    public Trip checkPackingList(PackingListCheckedPayload packingListCheckedPayload) {
        PackingList packingList = packingListRepository.findById(packingListCheckedPayload.getId())
                .orElseThrow(() -> new IllegalArgumentException("Packing list not found"));

        packingList.setCheckedItems(packingListCheckedPayload.getCheckedItems());
        packingListRepository.save(packingList);
        return packingList.getTrip();


    }

}
