package com.odysseus.controller;

import com.odysseus.model.location.Location;
import com.odysseus.model.location.LocationRequest;
import com.odysseus.model.trip.Trip;
import com.odysseus.model.trip.TripCreateRequest;
import com.odysseus.model.trip.TripListFilter;
import com.odysseus.model.user.User;
import com.odysseus.repository.LocationRepository;
import com.odysseus.repository.TripRepository;
import com.odysseus.service.LocationService;
import com.odysseus.service.TripService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

import static com.odysseus.utils.JwtAuthenticationFilter.getCurrentUser;

@RestController
@RequestMapping("/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }


    /**
     * Creates a new trip for the authenticated user based on the provided trip create request.
     *
     * @param tripCreateRequest the details of the trip to be created.
     * @return a ResponseEntity with the status of the operation.
     */
    @PostMapping
    public ResponseEntity<?> createTrip(@RequestBody TripCreateRequest tripCreateRequest) {
        User user = getCurrentUser();
        if (user != null) {
            try {
                tripService.createTrip(user, tripCreateRequest);
                return ResponseEntity.status(HttpStatus.CREATED).build();
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Error creating trip: " + e.getMessage());
            }
        }
        return ResponseEntity.badRequest().body("User is not authenticated");
    }

    /**
     * Retrieves a list of trips for the authenticated user, optionally filtered by the provided trip list filter.
     *
     * @param tripListFilter the filter criteria to apply to the trip list.
     * @return a ResponseEntity containing the filtered list of trips.
     */
    @GetMapping
    public ResponseEntity<?> getTripList(@ModelAttribute TripListFilter tripListFilter) {
        User currentUser = getCurrentUser();

        if (currentUser != null) {
            try {
                List<Trip> trips = tripService.getFilteredTripList(currentUser, tripListFilter);
                return ResponseEntity.ok(trips.toArray());
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Error fetching trips: " + e.getMessage());
            }
        }
        return ResponseEntity.badRequest().body("User is not authenticated");
    }

    /**
     * Retrieves a specific trip by its ID for the authenticated user.
     *
     * @param tripId the ID of the trip to retrieve.
     * @return a ResponseEntity containing the trip or an error message.
     */
    @GetMapping("/{tripId}")
    public ResponseEntity<?> getTrip(@PathVariable(value = "tripId") Long tripId) {
        User currentUser = getCurrentUser();

        if (currentUser != null) {
            try {
                Trip trip = tripService.getTripById(tripId, currentUser);
                return ResponseEntity.ok(trip);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
        return ResponseEntity.badRequest().body("User is not authenticated");
    }
/*
    @PutMapping("/{tripId}")
    public ResponseEntity updateTrip(@PathVariable(value = "tripId") Long tripId,
                                     @RequestBody TripCreateRequest tripCreateRequest) throws URISyntaxException {
        Trip trip = tripRepository.findById(tripId).orElse(null);
        if (trip != null) {
            trip.setLabel(tripCreateRequest.getLabel());
            trip.setDateFrom(tripCreateRequest.getDateFrom());
            trip.setDateTo(tripCreateRequest.getDateTo());
            Location location = getLocation(tripCreateRequest.getLocation());
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
    }*/

}
