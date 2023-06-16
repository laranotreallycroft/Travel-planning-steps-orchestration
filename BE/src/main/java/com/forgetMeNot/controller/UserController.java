package com.forgetMeNot.controller;

import java.net.URISyntaxException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forgetMeNot.model.Trip;
import com.forgetMeNot.model.User;
import com.forgetMeNot.repository.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {
	private final UserRepository userRepository;

	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@GetMapping("/{userId}/trips")
	public ResponseEntity getUserTrips(@PathVariable(value = "userId") Long userId) throws URISyntaxException {

		User user = userRepository.findById(userId).orElse(null);
		if (user != null) {
			List<Trip> trips = user.getTrips();
			return ResponseEntity.ok(trips.toArray());

		}
		return ResponseEntity.badRequest().body("Something went wrong");
	}

}
