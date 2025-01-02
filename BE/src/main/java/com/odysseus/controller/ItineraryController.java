package com.odysseus.controller;

import com.odysseus.model.itinerary.ItineraryCreateRequest;
import com.odysseus.model.itinerary.ScheduleElement;
import com.odysseus.model.trip.Trip;
import com.odysseus.service.ItineraryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/itineraries")
public class ItineraryController {
    private final ItineraryService itineraryService;


    public ItineraryController(ItineraryService itineraryService) {
        this.itineraryService = itineraryService;
    }

    /**
     * Creates a new itinerary based on the provided itinerary create request.
     *
     * @param itineraryCreateRequest the details of the itinerary to be created.
     * @return a ResponseEntity with the status of the operation and the created trip if successful.
     */
    @PostMapping
    public ResponseEntity<?> createItinerary(@RequestBody ItineraryCreateRequest itineraryCreateRequest) {
        try {
            Trip trip = itineraryService.createItinerary(itineraryCreateRequest);
            if (trip == null) {
                return ResponseEntity.badRequest().body("Trip with the specified ID does not exist.");
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(trip);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    /**
     * Updates an existing itinerary based on the provided itinerary update request.
     *
     * @param itineraryUpdateRequest the details of the itinerary to be updated.
     * @return a ResponseEntity with the status of the operation and the updated trip if successful.
     */
    @PutMapping
    public ResponseEntity<?> updateItinerary(@RequestBody ItineraryCreateRequest itineraryUpdateRequest) {
        try {
            Trip trip = itineraryService.createItinerary(itineraryUpdateRequest);
            if (trip == null) {
                return ResponseEntity.badRequest().body("Trip with the specified ID does not exist.");
            }
            return ResponseEntity.ok(trip);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }


    /**
     * Updates an existing schedule based on the provided schedule update request.
     *
     * @param scheduleElements the details of the schedule to be updated.
     * @return a ResponseEntity with the status of the operation and the updated trip if successful.
     */

    @PutMapping("/schedule")
    public ResponseEntity<?> updateItinerarySchedule(@RequestBody List<ScheduleElement> scheduleElements) {
        try {
            Trip trip = itineraryService.updateItinerarySchedule(scheduleElements);
            if (trip == null) {
                return ResponseEntity.badRequest().body("Trip with the specified ID does not exist.");
            }
            return ResponseEntity.ok(trip);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }


    /**
     * Deletes a trip itinerary.
     *
     * @param tripId the id of the trip.
     * @return a ResponseEntity with the status of the operation and the updated trip if successful.
     */
    @DeleteMapping("/{tripId}")
    public ResponseEntity<?> deleteItinerary(@PathVariable(value = "tripId") Long tripId) {
        try {
            Trip trip = itineraryService.deleteItinerary(tripId);
            if (trip == null) {
                return ResponseEntity.badRequest().body("Trip with the specified ID does not exist.");
            }
            return ResponseEntity.ok(trip);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }


}
