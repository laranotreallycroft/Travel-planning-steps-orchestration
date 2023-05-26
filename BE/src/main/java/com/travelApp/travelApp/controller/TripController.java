package com.travelApp.travelApp.controller;

import java.net.URISyntaxException;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.http.HttpStatus;
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

	public TripController(UserRepository userRepository, TripRepository tripRepository) {
		this.userRepository = userRepository;
		this.tripRepository = tripRepository;
	}
 
	@PostMapping
	public ResponseEntity createTrip(@RequestBody TripCreatePayload tripCreatePayload) throws URISyntaxException {
		
		User user = userRepository.findById(tripCreatePayload.getUserId()).orElse(null);
		if (user != null) {
			GeometryFactory gf = new GeometryFactory();
			Point point = gf.createPoint(new Coordinate(tripCreatePayload.getLocation().getX(), tripCreatePayload.getLocation().getY()));
			Trip trip = new Trip(tripCreatePayload.getDateFrom(), tripCreatePayload.getDateTo(),
					point, user);
			tripRepository.save(trip); 
			return ResponseEntity.status(HttpStatus.CREATED).body(trip.getId());

		}
		return ResponseEntity.badRequest().body("Something went wrong");
	}

}
