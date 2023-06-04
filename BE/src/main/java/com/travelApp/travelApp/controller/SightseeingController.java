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
import com.travelApp.travelApp.model.payload.SightseeingRoutePayload;
import com.travelApp.travelApp.model.payload.TripPayload;
import com.travelApp.travelApp.repository.PackingListRepository;
import com.travelApp.travelApp.repository.TripRepository;
import com.travelApp.travelApp.repository.UserRepository;

@RestController
@RequestMapping("/sightseeing")
public class SightseeingController {
	private final UserRepository userRepository;
	private final TripRepository tripRepository;
	private final PackingListRepository packingListRepository;

	public SightseeingController(UserRepository userRepository, TripRepository tripRepository,
			PackingListRepository packingListRepository) {
		this.userRepository = userRepository;
		this.tripRepository = tripRepository;
		this.packingListRepository = packingListRepository;
	}

	@PostMapping
	public ResponseEntity createSightseeingRoute(@RequestBody SightseeingRoutePayload sightseeingRoutePayload)
			throws URISyntaxException {
		System.out.println("HERE");
		/*
		 * User user =
		 * userRepository.findById(tripCreatePayload.getUserId()).orElse(null); if (user
		 * != null) {
		 * 
		 * Trip trip = new Trip(tripCreatePayload.getName(),
		 * tripCreatePayload.getDateFrom(), tripCreatePayload.getDateTo(),
		 * tripCreatePayload.getLocation().toPoint(), user); tripRepository.save(trip);
		 * return ResponseEntity.status(HttpStatus.CREATED).body(trip);
		 * 
		 * }
		 */
		return ResponseEntity.badRequest().body("Something went wrong");
	}


}
