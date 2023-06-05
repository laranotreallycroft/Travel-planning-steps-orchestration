package com.travelApp.travelApp.controller;

import java.net.URISyntaxException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelApp.travelApp.model.payload.TripPayload;

@RestController
@RequestMapping("/sightseeing")
public class SightseeingController {

	public SightseeingController() {

	}


	@PostMapping("/{tripId}")
	public ResponseEntity updateTrip(@PathVariable(value = "tripId") Long tripId, @RequestBody TripPayload tripPayload)
			throws URISyntaxException {
	System.out.println("HERE");

		return ResponseEntity.badRequest().body("Something went wrong");
	}


}
