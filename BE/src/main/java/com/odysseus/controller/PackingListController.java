package com.odysseus.controller;


import com.odysseus.model.packingList.*;
import com.odysseus.service.PackingListService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.odysseus.model.trip.Trip;
import com.odysseus.repository.PackingListRepository;
import com.odysseus.repository.TripRepository;
import com.odysseus.utils.PackingListPresets;

@RestController
@RequestMapping("/packinglists")
public class PackingListController {
    private final TripRepository tripRepository;
    private final PackingListRepository packingListRepository;
    private final PackingListService packingListService;

    public PackingListController(TripRepository tripRepository, PackingListRepository packingListRepository, PackingListService packingListService) {

        this.tripRepository = tripRepository;
        this.packingListRepository = packingListRepository;
        this.packingListService = packingListService;
    }

    @PostMapping
    public ResponseEntity<?> createPackingList(@RequestBody PackingListCreatePayload packingListCreatePayload) {
        try {
            Trip trip = packingListService.createPackingList(packingListCreatePayload);
            return ResponseEntity.ok(trip);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

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
    public ResponseEntity updatePackingListChecked(@RequestBody PackingListCheckedPayload packingListCheckedPayload) {
        try {
            Trip trip = packingListService.checkPackingList(packingListCheckedPayload);
            return ResponseEntity.ok(trip);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity updatePackingLists(@RequestBody PackingListUpdateDeletePayload packingListUpdateDeletePayload) {
        try {
            Trip trip = packingListService.updateDeletePackingLists(packingListUpdateDeletePayload);
            return ResponseEntity.ok(trip);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}