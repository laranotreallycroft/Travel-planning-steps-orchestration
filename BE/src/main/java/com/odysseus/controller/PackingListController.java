package com.odysseus.controller;


import com.odysseus.model.packingList.PackingListCheckedPayload;
import com.odysseus.model.packingList.PackingListCopyPayload;
import com.odysseus.model.packingList.PackingListCreatePayload;
import com.odysseus.model.packingList.PackingListUpdateDeletePayload;
import com.odysseus.model.trip.Trip;
import com.odysseus.service.PackingListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/packinglists")
public class PackingListController {
    private final PackingListService packingListService;

    public PackingListController(PackingListService packingListService) {

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
    public ResponseEntity<?> copyPackingList(@RequestBody PackingListCopyPayload packingListCopyPayload) {
        try {
            Trip trip = packingListService.copyPackingLists(packingListCopyPayload);
            return ResponseEntity.ok(trip);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/checked")
    public ResponseEntity<?> updatePackingListChecked(@RequestBody PackingListCheckedPayload packingListCheckedPayload) {
        try {
            Trip trip = packingListService.checkPackingList(packingListCheckedPayload);
            return ResponseEntity.ok(trip);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> updatePackingLists(@RequestBody PackingListUpdateDeletePayload packingListUpdateDeletePayload) {
        try {
            Trip trip = packingListService.updateDeletePackingLists(packingListUpdateDeletePayload);
            return ResponseEntity.ok(trip);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}