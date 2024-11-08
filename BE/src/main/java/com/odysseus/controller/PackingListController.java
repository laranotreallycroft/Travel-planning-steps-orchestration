package com.odysseus.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.odysseus.model.PackingList;
import com.odysseus.model.Trip;
import com.odysseus.model.payload.packingList.PackingListCopyPayload;
import com.odysseus.model.payload.packingList.PackingListCreatePayload;
import com.odysseus.model.payload.packingList.PackingListUpdateDeletePayload;
import com.odysseus.model.payload.packingList.PackingListUpdatePayload;
import com.odysseus.repository.PackingListRepository;
import com.odysseus.repository.TripRepository;
import com.odysseus.utils.PackingListPresets;

@RestController
@RequestMapping("/packinglists")
public class PackingListController {
    private final TripRepository tripRepository;
    private final PackingListRepository packingListRepository;

    public PackingListController(TripRepository tripRepository, PackingListRepository packingListRepository) {

        this.tripRepository = tripRepository;
        this.packingListRepository = packingListRepository;
    }

    @PostMapping
    public ResponseEntity createPackingList(@RequestBody PackingListCreatePayload packingListCreatePayload) {
        Trip trip = tripRepository.findById(packingListCreatePayload.getTripId()).orElse(null);
        if (trip != null) {
            PackingList packingList = new PackingList(trip, packingListCreatePayload.getLabel(),
                    packingListCreatePayload.getItems());
            packingListRepository.save(packingList);
            return ResponseEntity.status(HttpStatus.CREATED).body(trip.getUser().getTrips());
        }
        return ResponseEntity.badRequest().body("Something went wrong");
    }

    @PostMapping("/copy")
    public ResponseEntity copyPackingList(@RequestBody PackingListCopyPayload packingListCopyPayload) {
        Trip trip = tripRepository.findById(packingListCopyPayload.getTripId()).orElse(null);
        if (trip != null) {
            for (Long packingListId : packingListCopyPayload.getPackingListIds()) {
                if (packingListId <= 26) {
                    PackingList newPackingList = new PackingList(trip,
                            PackingListPresets.getPresetLabelById(packingListId),
                            PackingListPresets.getPresetItemById(packingListId));
                    packingListRepository.save(newPackingList);
                } else {
                    PackingList packingList = packingListRepository.findById(packingListId).orElse(null);
                    if (packingList != null) {
                        PackingList newPackingList = new PackingList(trip, packingList);
                        packingListRepository.save(newPackingList);
                    }
                }
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(trip.getUser().getTrips());
        }
        return ResponseEntity.badRequest().body("Something went wrong");
    }

    @PutMapping("/checked")
    public ResponseEntity updatePackingListChecked(@RequestBody PackingListUpdatePayload packingListUpdatePayload) {
        PackingList packingList = packingListRepository.findById(packingListUpdatePayload.getPackingListId())
                .orElse(null);
        if (packingList != null) {
            packingList.setCheckedItems(packingListUpdatePayload.getItems());
            packingListRepository.save(packingList);
            return ResponseEntity.ok(packingList.getTrip());
        }
        return ResponseEntity.badRequest().body("Something went wrong");
    }

    @PutMapping
    public ResponseEntity updatePackingLists(
            @RequestBody PackingListUpdateDeletePayload packingListUpdateDeletePayload) {

        PackingList packingList = null;
        for (Long id : packingListUpdateDeletePayload.getDelete()) {
            packingList = packingListRepository.findById(id).orElse(null);
            if (packingList != null) {
                packingListRepository.delete(packingList);
            }
        }

        for (PackingListUpdatePayload packingListUpdatePayload : packingListUpdateDeletePayload.getUpdate()) {
            packingList = packingListRepository.findById(packingListUpdatePayload.getPackingListId()).orElse(null);
            if (packingList != null) {
                if (packingListUpdatePayload.getItems() != null) {
                    packingList.setItems(packingListUpdatePayload.getItems());
                    packingList.filterAndSetCheckedItems(packingListUpdatePayload.getItems());
                }
                if (packingListUpdatePayload.getLabel() != null)
                    packingList.setLabel(packingListUpdatePayload.getLabel());

                packingListRepository.save(packingList);
            }
        }
        if (packingList != null)
            return ResponseEntity.ok(packingList.getTrip());
        else
            return ResponseEntity.badRequest().body("Something went wrong");
    }
}
