package com.travelApp.travelApp.controller;

import java.net.URISyntaxException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelApp.travelApp.model.Trip;
import com.travelApp.travelApp.model.User;
import com.travelApp.travelApp.model.payload.TripCreatePayload;
import com.travelApp.travelApp.repository.TripRepository;
import com.travelApp.travelApp.repository.UserRepository;

@RestController
@RequestMapping("/trip")
public class TripController {
	private final UserRepository userRepository;
	private final TripRepository tripRepository;

	public TripController(UserRepository userRepository,TripRepository tripRepository) {
		this.userRepository = userRepository;
		this.tripRepository=tripRepository;
	}

	
	@PostMapping
	public ResponseEntity createTrip(@RequestBody TripCreatePayload tripCreatePayload) throws URISyntaxException {
	
		User user = userRepository.findById(tripCreatePayload.getUserId()).orElse(null);
		if (user != null) {
			 Trip trip= new Trip(tripCreatePayload.getDate_from(),tripCreatePayload.getDate_to(),tripCreatePayload.getLocation(),user);
			 tripRepository.save(trip);
			 
			 ResponseEntity.ok(trip);

		}
		return ResponseEntity.badRequest().body("Something went wrong");
	}
	
}
