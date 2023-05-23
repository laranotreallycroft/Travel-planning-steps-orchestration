package com.travelApp.travelApp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelApp.travelApp.model.User;
import com.travelApp.travelApp.repository.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {

	private final UserRepository userRepository;

	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@GetMapping
	public List<User> getAppUsers() {
		return userRepository.findAll();
	}

	@GetMapping("/{id}")
	public User getAppUser(@PathVariable Long id) {
		return userRepository.findById(id).orElseThrow(RuntimeException::new);
	}

}