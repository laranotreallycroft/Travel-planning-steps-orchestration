package com.travelApp.travelApp.controller;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.travelApp.travelApp.model.Itinerary;
import com.travelApp.travelApp.model.ItineraryElement;
import com.travelApp.travelApp.model.Trip;
import com.travelApp.travelApp.model.payload.common.GeosearchPayload;
import com.travelApp.travelApp.model.payload.itinerary.ItineraryPayload;
import com.travelApp.travelApp.model.payload.itinerary.RouteOptions;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.OpenRouteServicePayload;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.OpenRouteServiceResponse;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.Step;
import com.travelApp.travelApp.repository.ItineraryElementRepository;
import com.travelApp.travelApp.repository.ItineraryRepository;
import com.travelApp.travelApp.repository.TripRepository;

@RestController
@RequestMapping("/itinerary")
public class ItineraryController {
	private final TripRepository tripRepository;
	private final ItineraryRepository itineraryRepository;
	private final ItineraryElementRepository itineraryElementRepository;

	public ItineraryController(TripRepository tripRepository, ItineraryRepository itineraryRepository,
			ItineraryElementRepository itineraryElementRepository) {
		this.tripRepository = tripRepository;
		this.itineraryRepository = itineraryRepository;
		this.itineraryElementRepository = itineraryElementRepository;
	}

	@PostMapping("/{tripId}")
	public ResponseEntity createItinerary(@PathVariable(value = "tripId") Long tripId,
			@RequestBody ItineraryPayload itineraryPayload) throws URISyntaxException {
		Trip trip = tripRepository.findById(tripId).orElse(null);
		OpenRouteServicePayload openRouteServicePayload = new OpenRouteServicePayload(itineraryPayload);
		Itinerary itinerary = new Itinerary(trip,itineraryPayload.getDate());
		itineraryRepository.save(itinerary);

		RouteOptions routeOptions = itineraryPayload.getRouteOptions();
		if (routeOptions.isOptimize()) {
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

				List<Step> steps = openRouteServiceResponse.getRoutes().get(0).getSteps();

				for (int i = 1; i < steps.size() - 1; i++) {
					for (GeosearchPayload location : itineraryPayload.getLocations()) {
						if (location.getX().equals(steps.get(i).getX())
								&& location.getY().equals(steps.get(i).getY())) {
							ItineraryElement itineraryElement = new ItineraryElement(location.getLabel(),
									location.getPointPayload().toPoint(), steps.get(i).getDuration() / 60, itinerary);

							itineraryElementRepository.save(itineraryElement);
						}
					}
				}

				return ResponseEntity.ok(itinerary);
			} catch (IOException | InterruptedException e) {
				return ResponseEntity.badRequest()
						.body("Unable to find route between points. Try changing the method of transportation.");
			}
		} else {
			for (GeosearchPayload location : itineraryPayload.getLocations()) {
				ItineraryElement itineraryElement = new ItineraryElement(location.getLabel(),
						location.getPointPayload().toPoint(), 0, itinerary);
				itineraryElementRepository.save(itineraryElement);

			}

			return ResponseEntity.ok(itinerary);
		}

	}

}
