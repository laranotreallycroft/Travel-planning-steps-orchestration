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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.travelApp.travelApp.model.Itinerary;
import com.travelApp.travelApp.model.ItineraryElement;
import com.travelApp.travelApp.model.Trip;
import com.travelApp.travelApp.model.payload.common.GeosearchPayload;
import com.travelApp.travelApp.model.payload.itinerary.ItineraryCreatePayload;
import com.travelApp.travelApp.model.payload.itinerary.RouteOptions;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions.OpenRouteServiceDirectionsPayload;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions.OpenRouteServiceDirectionsResponse;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions.Segment;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.optimization.OpenRouteServiceOptimizationPayload;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.optimization.OpenRouteServiceOptimizationResponse;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.optimization.Step;
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

	@PostMapping
	public ResponseEntity createItinerary(@RequestBody ItineraryCreatePayload itineraryPayload)
			throws URISyntaxException {
		Trip trip = tripRepository.findById(itineraryPayload.getTripId()).orElse(null);
		Itinerary itinerary = new Itinerary(trip, itineraryPayload.getDate());

		ObjectMapper mapper = new ObjectMapper();
		var client = HttpClient.newHttpClient();
		RouteOptions routeOptions = itineraryPayload.getRouteOptions();
		if (routeOptions.isOptimize()) {
			try {
				// api call
				OpenRouteServiceOptimizationPayload openRouteServiceOptimizationPayload = new OpenRouteServiceOptimizationPayload(
						itineraryPayload);
				var request = HttpRequest.newBuilder().uri(new URI("https://api.openrouteservice.org/optimization"))
						.headers("Authorization", "5b3ce3597851110001cf624845f0c2fc3f004ad1bd965773236bfa15", "accept",
								"application/json", "Content-Type", "application/json")
						.POST(BodyPublishers.ofString(mapper.writeValueAsString(openRouteServiceOptimizationPayload)))
						.build();
				HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
				OpenRouteServiceOptimizationResponse openRouteServiceResponse = mapper.readValue(response.body(),
						OpenRouteServiceOptimizationResponse.class);

				// pair new route with labels
				// remove redundant origin and destination steps
				List<Step> steps = openRouteServiceResponse.getRoutes().get(0).getSteps();
				for (int i = 1; i < steps.size() - 1; i++) {
					for (GeosearchPayload location : itineraryPayload.getLocations()) {
						if (location.getX().equals(steps.get(i).getX())
								&& location.getY().equals(steps.get(i).getY())) {
							ItineraryElement itineraryElement = new ItineraryElement(location.getLabel(),
									location.getPointPayload().toPoint(), steps.get(i).getDuration() / 60, itinerary);

							itinerary.addItineraryElement(itineraryElement);
						}
					}
				}

			} catch (IOException | InterruptedException e) {
				return ResponseEntity.badRequest()
						.body("Unable to find route between points. Try changing the method of transportation.");
			}
		} else {
			try {
				// api call
				OpenRouteServiceDirectionsPayload openRouteServiceDirectionsPayload = new OpenRouteServiceDirectionsPayload(
						itineraryPayload);
				var request = HttpRequest.newBuilder()
						.uri(new URI(
								"https://api.openrouteservice.org/v2/directions/" + routeOptions.getVehicleProfile()))
						.headers("Authorization", "5b3ce3597851110001cf624845f0c2fc3f004ad1bd965773236bfa15", "accept",
								"application/json", "Content-Type", "application/json")
						.POST(BodyPublishers.ofString(mapper.writeValueAsString(openRouteServiceDirectionsPayload)))
						.build();
				HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
				OpenRouteServiceDirectionsResponse openRouteServiceResponse = mapper.readValue(response.body(),
						OpenRouteServiceDirectionsResponse.class);

				List<Segment> segments = openRouteServiceResponse.getRoutes().get(0).getSegments();
				List<GeosearchPayload> locations = itineraryPayload.getLocations();

				// origin is not returned in payload so create it separately
				ItineraryElement firstItineraryElement = new ItineraryElement(locations.get(0).getLabel(),
						locations.get(0).getPointPayload().toPoint(), 0, itinerary);
				itinerary.addItineraryElement(firstItineraryElement);

				// pair travel durations with labels
				for (int i = 0; i < segments.size(); i++) {
					// origin is not returned in payload so payload is i+1
					GeosearchPayload payloadLocation = locations.get(i + 1);
					ItineraryElement itineraryElement = new ItineraryElement(payloadLocation.getLabel(),
							payloadLocation.getPointPayload().toPoint(), (int) (segments.get(i).getDuration() / 60),
							itinerary);
					itinerary.addItineraryElement(itineraryElement);
				}

			} catch (IOException | InterruptedException e) {
				System.out.println(e);
				return ResponseEntity.badRequest()
						.body("Unable to find route between points. Try changing the method of transportation.");
			}
		}
		itineraryRepository.save(itinerary);
		return ResponseEntity.ok(itinerary);

	}

}
