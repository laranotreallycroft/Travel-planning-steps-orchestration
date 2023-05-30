package com.travelApp.travelApp.controller;

import java.net.URISyntaxException;
import java.util.List;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelApp.travelApp.model.PackingList;
import com.travelApp.travelApp.model.Trip;
import com.travelApp.travelApp.model.User;
import com.travelApp.travelApp.model.payload.PackingListPayload;
import com.travelApp.travelApp.model.payload.TripPayload;
import com.travelApp.travelApp.repository.PackingListRepository;
import com.travelApp.travelApp.repository.TripRepository;
import com.travelApp.travelApp.repository.UserRepository;

@RestController
@RequestMapping("/trips")
public class TripController {
	private final UserRepository userRepository;
	private final TripRepository tripRepository;
	private final PackingListRepository packingListRepository;

	public TripController(UserRepository userRepository, TripRepository tripRepository,PackingListRepository packingListRepository) {
		this.userRepository = userRepository;
		this.tripRepository = tripRepository;
		this.packingListRepository=packingListRepository;
	}

	@PostMapping
	public ResponseEntity createTrip(@RequestBody TripPayload tripCreatePayload) throws URISyntaxException {

		User user = userRepository.findById(tripCreatePayload.getUserId()).orElse(null);
		if (user != null) {

			Trip trip = new Trip(tripCreatePayload.getName(), tripCreatePayload.getDateFrom(),
					tripCreatePayload.getDateTo(), tripCreatePayload.getLocation().toPoint(), user);
			tripRepository.save(trip);
			return ResponseEntity.status(HttpStatus.CREATED).body(trip.getId());

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
	public ResponseEntity updateTrip(@PathVariable(value = "tripId") Long tripId, @RequestBody TripPayload tripPayload)
			throws URISyntaxException {
		Trip trip = tripRepository.findById(tripId).orElse(null);
		if (trip != null) {
			trip.setName(tripPayload.getName());
			trip.setDateFrom(tripPayload.getDateFrom());
			trip.setDateTo(tripPayload.getDateTo());
			trip.setLocation(tripPayload.getLocation().toPoint());
			tripRepository.save(trip);
			return ResponseEntity.ok(trip);

		}

		return ResponseEntity.badRequest().body("Something went wrong");
	}

	@PostMapping("/{tripId}/packinglist")
	public ResponseEntity createTripPackingList(@PathVariable(value = "tripId") Long tripId,
			@RequestBody PackingListPayload packingListPayload) throws URISyntaxException {
		Trip trip = tripRepository.findById(tripId).orElse(null);
		if (trip != null && trip.getPackingList() == null) {
			PackingList packingList = packingListPayload.payloadToModel(trip);
			trip.setPackingList(packingList);
			tripRepository.save(trip);
			return ResponseEntity.status(HttpStatus.CREATED).body(packingListPayload);

		}
		return ResponseEntity.badRequest().body("Something went wrong");
	}

	@GetMapping("/{tripId}/packinglist")
	public ResponseEntity getTripPackingList(@PathVariable(value = "tripId") Long tripId) throws URISyntaxException {
		Trip trip = tripRepository.findById(tripId).orElse(null);
		if (trip != null) {
			PackingList packingList = trip.getPackingList();
			if (packingList != null)
				return ResponseEntity.ok(packingList.modelToPayload());
			return ResponseEntity.noContent().build();

		}
		return ResponseEntity.badRequest().body("Something went wrong");
	}

	@PutMapping("/{tripId}/packinglist")
	public ResponseEntity updateTripPackingList(@PathVariable(value = "tripId") Long tripId,
			@RequestBody PackingListPayload packingListPayload) throws URISyntaxException {
		PackingList packingList = packingListRepository.findByTripId(tripId);
		if (packingList != null) {
			packingList.updateFromPayload(packingListPayload);
			packingListRepository.save(packingList);
			return  ResponseEntity.ok(packingListPayload);

		}
		return ResponseEntity.badRequest().body("Something went wrong");
	}
}
