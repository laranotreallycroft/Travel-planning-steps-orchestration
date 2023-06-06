package com.travelApp.travelApp.controller;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.travelApp.travelApp.model.payload.common.GeosearchPayload;
import com.travelApp.travelApp.model.payload.itinerary.ItineraryPayload;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.OpenRouteServicePayload;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.OpenRouteServiceResponse;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.Step;

@RestController
@RequestMapping("/itinerary")
public class ItineraryController {

	public ItineraryController() {

	}

	@PostMapping("/{tripId}")
	public ResponseEntity createItinerary(@PathVariable(value = "tripId") Long tripId,
			@RequestBody ItineraryPayload itineraryPayload) throws URISyntaxException {
		OpenRouteServicePayload openRouteServicePayload = new OpenRouteServicePayload(itineraryPayload);

		try {
			// api call
			ObjectMapper mapper = new ObjectMapper();
			var client = HttpClient.newHttpClient();
			var request = HttpRequest.newBuilder().uri(new URI("https://api.openrouteservice.org/optimization"))
					.headers("Authorization", "5b3ce3597851110001cf624845f0c2fc3f004ad1bd965773236bfa15", "accept",
							"application/json", "Content-Type", "application/json")
					.POST(BodyPublishers.ofString(mapper.writeValueAsString(openRouteServicePayload))).build();
			HttpResponse<String> response = client.send(request, BodyHandlers.ofString());

			OpenRouteServiceResponse openRouteServiceResponse = mapper.readValue(response.body(),
					OpenRouteServiceResponse.class);

			List<Step> locations = openRouteServiceResponse.getRoutes().get(0).getSteps();
			List<GeosearchPayload> locationsSorted = new ArrayList<>();

			/// TODO IZVADI OVO NEKAM
			for (Step step : locations) {
				for (GeosearchPayload location : itineraryPayload.getLocations()) {
					if (location.getX().equals(step.getX()) && location.getY().equals(step.getY()))
						locationsSorted.add(location);
				}
			}
			locationsSorted.remove(0);
			locationsSorted.remove(locationsSorted.size() - 1);
			///
			return ResponseEntity.ok(locationsSorted);
		} catch (IOException | InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return ResponseEntity.badRequest().body("Something went wrong");
	}

}
