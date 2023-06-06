package com.travelApp.travelApp.controller;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.travelApp.travelApp.model.payload.itinerary.ItineraryPayload;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.OpenRouteServicePayload;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.OpenRouteServiceResponse;

@RestController
@RequestMapping("/itinerary")
public class ItineraryController {

	public ItineraryController() {

	}

	@PostMapping("/{tripId}")
	public ResponseEntity createItinerary(@PathVariable(value = "tripId") Long tripId,
			@RequestBody ItineraryPayload itineraryPayload) throws URISyntaxException {
		OpenRouteServicePayload openRouteServicePayload = new OpenRouteServicePayload(itineraryPayload);
		ObjectMapper mapper = new ObjectMapper();
		try {
			// create a client
			var client = HttpClient.newHttpClient();

			// create a request
			var request = HttpRequest.newBuilder().uri(new URI("https://api.openrouteservice.org/optimization"))
					.headers("Authorization", "5b3ce3597851110001cf624845f0c2fc3f004ad1bd965773236bfa15", "accept",
							"application/json", "Content-Type", "application/json")
					.POST(BodyPublishers.ofString(mapper.writeValueAsString(openRouteServicePayload))).build();

			// use the client to send the request
			HttpResponse<String> response = client.send(request, BodyHandlers.ofString());

			// the response:
			OpenRouteServiceResponse openRouteServiceResponse = mapper.readValue(response.body(),
					OpenRouteServiceResponse.class);
			return ResponseEntity.ok(openRouteServiceResponse);
		} catch (IOException | InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return ResponseEntity.badRequest().body("Something went wrong");
	}

}
