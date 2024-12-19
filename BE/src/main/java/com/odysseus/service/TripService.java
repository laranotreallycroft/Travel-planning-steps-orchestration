package com.odysseus.service;

import com.odysseus.model.location.Location;
import com.odysseus.model.trip.Trip;
import com.odysseus.model.trip.TripCreateRequest;
import com.odysseus.model.trip.TripListFilter;
import com.odysseus.model.user.User;
import com.odysseus.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
public class TripService {

    private final TripRepository tripRepository;
    private final LocationService locationService;

    public TripService(TripRepository tripRepository, LocationService locationService) {
        this.tripRepository = tripRepository;
        this.locationService = locationService;
    }

    /**
     * Creates a new trip for the given user based on the provided trip create request.
     *
     * @param user              the user who is creating the trip.
     * @param tripCreateRequest the details of the trip to be created.
     * @throws IllegalArgumentException if the user is null.
     */
    public void createTrip(User user, TripCreateRequest tripCreateRequest) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }

        Location location = locationService.getLocation(tripCreateRequest.getLocation());
        Trip trip = new Trip(
                tripCreateRequest.getLabel(),
                tripCreateRequest.getDateFrom(),
                tripCreateRequest.getDateTo(),
                location,
                user
        );
        tripRepository.save(trip);
    }

    /**
     * Retrieves a list of trips for the current user, filtered based on the provided filter criteria.
     *
     * @param currentUser    the current user whose trips are being fetched.
     * @param tripListFilter the filter criteria to apply to the trips.
     * @return a list of trips matching the filter criteria.
     * @throws IllegalArgumentException if the current user is null.
     */
    public List<Trip> getFilteredTripList(User currentUser, TripListFilter tripListFilter) {
        if (currentUser == null) {
            throw new IllegalArgumentException("User cannot be null");
        }

        List<Trip> trips = tripRepository.findByUserId(currentUser.getId());

        if (tripListFilter.isUpcomingOnly()) {
            trips = trips.stream()
                    .filter(trip -> trip.getDateTo().isAfter(LocalDate.now()))
                    .toList();
        }

        if (tripListFilter.isPastOnly()) {
            trips = trips.stream()
                    .filter(trip -> trip.getDateTo().isBefore(LocalDate.now()))
                    .toList();
        }

        return trips;
    }

    /**
     * Retrieves a specific trip by its ID for the given user.
     * Throws an exception if the trip is not found or if the user does not have permission to access the trip.
     *
     * @param tripId the ID of the trip to retrieve.
     * @param user   the user who is requesting the trip.
     * @return the trip with the specified ID.
     * @throws IllegalArgumentException if the user is null, the trip is not found, or the user doesn't have permission to access the trip.
     */
    public Trip getTripById(Long tripId, User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new IllegalArgumentException("Trip not found"));

        // Check if the trip belongs to the current user
        if (!Objects.equals(trip.getUser().getId(), user.getId())) {
            throw new IllegalArgumentException("User does not have permission for this action.");
        }

        return trip;
    }
}
