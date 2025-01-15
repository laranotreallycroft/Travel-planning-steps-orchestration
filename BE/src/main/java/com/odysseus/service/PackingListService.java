package com.odysseus.service;

import com.odysseus.model.packingList.*;
import com.odysseus.model.trip.Trip;
import com.odysseus.repository.PackingListRepository;
import com.odysseus.repository.TripRepository;
import com.odysseus.utils.PackingListPresets;
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

    /**
     * Update and delete packing lists
     *
     * @param packingListUpdateDeletePayload list of packing lists to update and delete
     * @throws IllegalArgumentException if the packing list is null.
     */
    public Trip updateDeletePackingLists(PackingListUpdateDeletePayload packingListUpdateDeletePayload) {
        Trip trip = null;
        for (Long id : packingListUpdateDeletePayload.getDelete()) {

            PackingList packingListToDelete = packingListRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Packing list not found"));
            if (trip == null) {
                trip = packingListToDelete.getTrip();
            }
            packingListRepository.delete(packingListToDelete);

        }

        for (PackingListUpdatePayload packingListUpdatePayload : packingListUpdateDeletePayload.getUpdate()) {
            PackingList packingListToUpdate = packingListRepository.findById(packingListUpdatePayload.getId()).orElseThrow(() -> new IllegalArgumentException("Packing list not found"));
            if (trip == null) {
                trip = packingListToUpdate.getTrip();
            }
            if (packingListUpdatePayload.getItems() != null) {
                packingListToUpdate.setItems(packingListUpdatePayload.getItems());
                packingListToUpdate.filterAndSetCheckedItems(packingListUpdatePayload.getItems());
            }
            if (packingListUpdatePayload.getLabel() != null)
                packingListToUpdate.setLabel(packingListUpdatePayload.getLabel());

            packingListRepository.save(packingListToUpdate);

        }

        return trip;
    }

    /**
     * Copy packing lists
     *
     * @param packingListCopyPayload list of packing lists to add
     * @throws IllegalArgumentException if the trip is null.
     */
    public Trip copyPackingLists(PackingListCopyPayload packingListCopyPayload) {
        Trip trip = tripRepository.findById(packingListCopyPayload.getTripId()).orElseThrow(() -> new IllegalArgumentException("Trip not found"));

        for (Long packingListId : packingListCopyPayload.getPackingListIds()) {
            if (packingListId <= 26) {
                PackingList newPackingList = new PackingList(trip,
                        PackingListPresets.getPresetLabelById(packingListId),
                        PackingListPresets.getPresetItemById(packingListId));
                packingListRepository.save(newPackingList);
            } else {
                PackingList packingList = packingListRepository.findById(packingListId).orElseThrow(() -> new IllegalArgumentException("Packing list not found"));
                PackingList newPackingList = new PackingList(trip, packingList);
                packingListRepository.save(newPackingList);

            }
        }
        return trip;

    }
}
