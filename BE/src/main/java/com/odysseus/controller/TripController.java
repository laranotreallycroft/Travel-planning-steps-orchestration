package com.odysseus.controller;

import com.odysseus.model.Location;
import com.odysseus.model.Trip;
import com.odysseus.model.User;
import com.odysseus.model.payload.common.LocationPayload;
import com.odysseus.model.payload.trip.TripListFilter;
import com.odysseus.model.payload.trip.TripPayload;
import com.odysseus.model.payload.trip.TripSettingsPayload;
import com.odysseus.repository.LocationRepository;
import com.odysseus.repository.TripRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.odysseus.utils.JwtAuthenticationFilter.getCurrentUser;

@RestController
@RequestMapping("/trips")
public class TripController {
    private final TripRepository tripRepository;
    private final LocationRepository locationRepository;

    public TripController(TripRepository tripRepository, LocationRepository locationRepository) {
        this.tripRepository = tripRepository;
        this.locationRepository = locationRepository;
    }

    public Location getLocation(LocationPayload locationPayload) {
        Location location = locationRepository.findById(locationPayload.getId()).orElse(null);
        if (location == null) {
            location = new Location(locationPayload.getId(), locationPayload.getLabel(), locationPayload.getCoordinates().toPoint());
            locationRepository.save(location);

        }
        return location;
    }

    @PostMapping
    public ResponseEntity<?> createTrip(@RequestBody TripPayload tripCreatePayload) throws URISyntaxException {
        User user = getCurrentUser();

        if (user != null) {
            Location location = getLocation(tripCreatePayload.getLocation());
            Trip trip = new Trip(tripCreatePayload.getLabel(), tripCreatePayload.getDateFrom(),
                    tripCreatePayload.getDateTo(), location, user);
            tripRepository.save(trip);
            return ResponseEntity.status(HttpStatus.CREATED).build();

        }
        return ResponseEntity.badRequest().body("Something went wrong");

    }

    @GetMapping
    public ResponseEntity<?> getTripList(@ModelAttribute TripListFilter tripListFilter) {
        User currentUser = getCurrentUser();
        List<Trip> trips = tripRepository.findByUserId(currentUser.getId());
        if (tripListFilter.isUpcomingOnly())
            trips = trips.stream().filter(trip -> trip.getDateTo().isAfter(LocalDate.now())).toList();
        if (tripListFilter.isPastOnly())
            trips = trips.stream().filter(trip -> trip.getDateTo().isBefore(LocalDate.now())).toList();

        return ResponseEntity.ok(trips.toArray());
    }

    @GetMapping("/{tripId}")
    public ResponseEntity<?> getTrip(@PathVariable(value = "tripId") Long tripId) throws URISyntaxException {
        Trip trip = tripRepository.findById(tripId).orElse(null);
        if (!Objects.equals(trip.getUser().getId(), getCurrentUser().getId())) {
            return ResponseEntity.badRequest().body("User does not have permission for this action.");
        }
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
            Location location = getLocation(tripPayload.getLocation());
            trip.setLocation(location);

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
