package com.odysseus.controller;

import com.odysseus.model.trip.Trip;
import com.odysseus.model.trip.TripCreateRequest;
import com.odysseus.model.trip.TripListFilter;
import com.odysseus.model.user.User;
import com.odysseus.service.TripService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        User currentUser = getCurrentUser();
        if (currentUser != null) {
            try {
                tripService.createTrip(currentUser, tripCreateRequest);
                TripListFilter tripListFilter = new TripListFilter();
                tripListFilter.setUpcomingOnly(true);
                List<Trip> trips = tripService.getFilteredTripList(currentUser, tripListFilter);
                return ResponseEntity.ok(trips.toArray());
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


    /**
     * Updates a trip based on the provided trip update request.
     * The method validates the request and updates the specified trip.
     *
     * @param tripId            the updated trip id.
     * @param tripCreateRequest the updated details of the trip.
     * @return a ResponseEntity containing the trip or an error message.
     */
    @PutMapping("/{tripId}")
    public ResponseEntity<?> updateTrip(@RequestBody TripCreateRequest tripCreateRequest, @PathVariable(value = "tripId") Long tripId) {
        try {
            Trip trip = tripService.updateTrip(tripId, tripCreateRequest);
            return ResponseEntity.ok(trip);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    /**
     * Deletes a trip based on the specified trip ID and the authenticated user.
     *
     * @param tripId the ID of the trip to be deleted.
     * @return a ResponseEntity with the status of the operation and the updated list of trips for the user if successful.
     * Else return an error message.
     */
    @DeleteMapping("/{tripId}")
    public ResponseEntity<?> deleteTrip(@PathVariable(value = "tripId") Long tripId) {
        User currentUser = getCurrentUser();
        if (currentUser != null) {
            try {
                Trip trip = tripService.getTripById(tripId, currentUser);
                boolean hasDateToPassed = trip.hasDateToPassed();

                tripService.deleteTrip(tripId, currentUser);
                
                TripListFilter tripListFilter = new TripListFilter();
                tripListFilter.setUpcomingOnly(hasDateToPassed);
                List<Trip> trips = tripService.getFilteredTripList(currentUser, tripListFilter);
                return ResponseEntity.ok(trips.toArray());
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Error creating trip: " + e.getMessage());
            }
        }
        return ResponseEntity.badRequest().body("User is not authenticated");


    }
}
