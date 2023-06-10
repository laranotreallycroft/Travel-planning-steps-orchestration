package com.travelApp.travelApp.controller;

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

import com.travelApp.travelApp.model.PackingList;
import com.travelApp.travelApp.model.PackingListChecked;
import com.travelApp.travelApp.model.Trip;
import com.travelApp.travelApp.model.User;
import com.travelApp.travelApp.model.payload.packingList.PackingListPayload;
import com.travelApp.travelApp.model.payload.trip.TripPayload;
import com.travelApp.travelApp.model.payload.trip.TripSettingsPayload;
import com.travelApp.travelApp.repository.PackingListCheckedRepository;
import com.travelApp.travelApp.repository.PackingListRepository;
import com.travelApp.travelApp.repository.TripRepository;
import com.travelApp.travelApp.repository.UserRepository;

@RestController
@RequestMapping("/trips")
public class TripController {
	private final UserRepository userRepository;
	private final TripRepository tripRepository;
	private final PackingListRepository packingListRepository;
	private final PackingListCheckedRepository packingListCheckedRepository;

	public TripController(UserRepository userRepository, TripRepository tripRepository,
			PackingListRepository packingListRepository, PackingListCheckedRepository packingListCheckedRepository) {
		this.userRepository = userRepository;
		this.tripRepository = tripRepository;
		this.packingListRepository = packingListRepository;
		this.packingListCheckedRepository = packingListCheckedRepository;
	}

	@PostMapping
	public ResponseEntity createTrip(@RequestBody TripPayload tripCreatePayload) throws URISyntaxException {

		User user = userRepository.findById(tripCreatePayload.getUserId()).orElse(null);
		if (user != null) {

			Trip trip = new Trip(tripCreatePayload.getName(), tripCreatePayload.getDateFrom(),
					tripCreatePayload.getDateTo(), tripCreatePayload.getLocation().toPoint(), user);
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
	public ResponseEntity updateTrip(@PathVariable(value = "tripId") Long tripId, @RequestBody TripSettingsPayload tripPayload)
			throws URISyntaxException {
		Trip trip = tripRepository.findById(tripId).orElse(null);
		if (trip != null) {
			trip.setName(tripPayload.getName());
			tripRepository.save(trip);
			return ResponseEntity.ok(trip.getUser().getTrips());

		}

		return ResponseEntity.badRequest().body("Something went wrong");
	}
	
	@DeleteMapping("/{tripId}")
	public ResponseEntity deleteTrip(@PathVariable(value = "tripId") Long tripId)
			throws URISyntaxException {
		Trip trip = tripRepository.findById(tripId).orElse(null);
		if (trip != null) {
			User user=trip.getUser();
			tripRepository.delete(trip);
			return ResponseEntity.ok(user.getTrips());

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
			PackingListChecked packingListChecked = new PackingListChecked(trip);
			trip.setPackingListChecked(packingListChecked);
			tripRepository.save(trip);
			return ResponseEntity.status(HttpStatus.CREATED).body(trip);

		}
		return ResponseEntity.badRequest().body("Something went wrong");
	}

	@GetMapping("/{tripId}/packinglist")
	public ResponseEntity getTripPackingList(@PathVariable(value = "tripId") Long tripId) throws URISyntaxException {
		Trip trip = tripRepository.findById(tripId).orElse(null);
		if (trip != null) {
			PackingListPayload packingList = trip.getPackingList();
			if (packingList != null)
				return ResponseEntity.ok(packingList);
			return ResponseEntity.noContent().build();

		}
		return ResponseEntity.badRequest().body("Something went wrong");
	}

	@PutMapping("/{tripId}/packinglist")
	public ResponseEntity updateTripPackingList(@PathVariable(value = "tripId") Long tripId,
			@RequestBody PackingListPayload packingListPayload) throws URISyntaxException {
		PackingList packingList = packingListRepository.findByTripId(tripId);
		PackingListChecked packingListChecked = packingListCheckedRepository.findByTripId(tripId);
		if (packingList != null) {
			packingList.updateFromPayload(packingListPayload);
			packingListChecked.updateFromPayloadIntersection(packingListPayload);
			packingListRepository.save(packingList);
			packingListCheckedRepository.save(packingListChecked);
			return ResponseEntity.ok(packingList.getTrip());

		}
		return ResponseEntity.badRequest().body("Something went wrong");
	}

	@GetMapping("/{tripId}/packinglist/checked")
	public ResponseEntity getTripPackingListChecked(@PathVariable(value = "tripId") Long tripId)
			throws URISyntaxException {
		Trip trip = tripRepository.findById(tripId).orElse(null);
		if (trip != null) {
			PackingListPayload packingListChecked = trip.getPackingListChecked();
			if (packingListChecked != null)
				return ResponseEntity.ok(packingListChecked);
			return ResponseEntity.noContent().build();

		}
		return ResponseEntity.badRequest().body("Something went wrong");
	}

	@PutMapping("/{tripId}/packinglist/checked")
	public ResponseEntity updateTripPackingListChecked(@PathVariable(value = "tripId") Long tripId,
			@RequestBody PackingListPayload packingListPayload) throws URISyntaxException {
		PackingListChecked packingListChecked = packingListCheckedRepository.findByTripId(tripId);
		if (packingListChecked != null) {
			packingListChecked.updateFromPayload(packingListPayload);
			packingListCheckedRepository.save(packingListChecked);
			return ResponseEntity.ok(packingListChecked.getTrip());

		}
		return ResponseEntity.badRequest().body("Something went wrong");
	}

}
