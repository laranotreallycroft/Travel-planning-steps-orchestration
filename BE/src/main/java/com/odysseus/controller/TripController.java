package com.odysseus.controller;

import java.net.URISyntaxException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.odysseus.model.Trip;
import com.odysseus.model.User;
import com.odysseus.model.payload.trip.TripPayload;
import com.odysseus.model.payload.trip.TripSettingsPayload;
import com.odysseus.repository.TripRepository;
import com.odysseus.repository.UserRepository;

@RestController
@RequestMapping("/trips")
public class TripController {
    private final UserRepository userRepository;
    private final TripRepository tripRepository;

    public TripController(UserRepository userRepository, TripRepository tripRepository) {
        this.userRepository = userRepository;
        this.tripRepository = tripRepository;
    }

    @PostMapping
    public ResponseEntity createTrip(@RequestBody TripPayload tripCreatePayload) throws URISyntaxException {

        User user = userRepository.findById(tripCreatePayload.getUserId()).orElse(null);
        if (user != null) {

            Trip trip = new Trip(tripCreatePayload.getLabel(), tripCreatePayload.getDateFrom(),
                    tripCreatePayload.getDateTo(), tripCreatePayload.getLocationLabel(),
                    tripCreatePayload.getLocation().toPoint(), user);
            tripRepository.save(trip);
            return ResponseEntity.status(HttpStatus.CREATED).body(user.getTrips());

        }
        return ResponseEntity.badRequest().body("Something went wrong");
    }

    @GetMapping("/{tripId}")
    public ResponseEntity getTrip(@PathVariable(value = "tripId") Long tripId) throws URISyntaxException {
        Trip trip = tripRepository.findById(tripId).orElse(null);
        if (trip != null) {
            return ResponseEntity.ok(trip);

        }
        return ResponseEntity.badRequest().body("Something went wrong");
    }

    @PutMapping("/{tripId}")
    public ResponseEntity updateTrip(@PathVariable(value = "tripId") Long tripId,
                                     @RequestBody TripSettingsPayload tripPayload) throws URISyntaxException {
        Trip trip = tripRepository.findById(tripId).orElse(null);
        if (trip != null) {
            trip.setLabel(tripPayload.getLabel());
            trip.setDateFrom(tripPayload.getDateFrom());
            trip.setDateTo(tripPayload.getDateTo());

            trip.setLocation(tripPayload.getLocation().toPoint());
            trip.setLocationLabel(tripPayload.getLocationLabel());

            tripRepository.save(trip);
            return ResponseEntity.ok(trip.getUser().getTrips());

        }

        return ResponseEntity.badRequest().body("Something went wrong");
    }

    @DeleteMapping("/{tripId}")
    public ResponseEntity deleteTrip(@PathVariable(value = "tripId") Long tripId) throws URISyntaxException {
        Trip trip = tripRepository.findById(tripId).orElse(null);
        if (trip != null) {
            User user = trip.getUser();
            tripRepository.delete(trip);
            return ResponseEntity.ok(user.getTrips());

        }

        return ResponseEntity.badRequest().body("Something went wrong");
    }

}
