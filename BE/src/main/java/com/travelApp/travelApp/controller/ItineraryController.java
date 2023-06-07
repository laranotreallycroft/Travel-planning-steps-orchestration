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

import org.json.JSONArray;
import org.locationtech.jts.geom.LineString;
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
import com.travelApp.travelApp.utils.GeometryDecoder;

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

	public List<Step> getOpenRouteServiceOptimization(ItineraryCreatePayload itineraryPayload) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			var client = HttpClient.newHttpClient();
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
			return openRouteServiceResponse.getRoutes().get(0).getSteps();
		} catch (IOException | URISyntaxException | InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return null;

	}

	public OpenRouteServiceDirectionsResponse getOpenRouteServiceDirections(ItineraryCreatePayload itineraryPayload) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			var client = HttpClient.newHttpClient();
			OpenRouteServiceDirectionsPayload openRouteServiceDirectionsPayload = new OpenRouteServiceDirectionsPayload(
					itineraryPayload);
			RouteOptions routeOptions = itineraryPayload.getRouteOptions();
			HttpRequest request = HttpRequest.newBuilder()
					.uri(new URI("https://api.openrouteservice.org/v2/directions/" + routeOptions.getVehicleProfile()))
					.headers("Authorization", "5b3ce3597851110001cf624845f0c2fc3f004ad1bd965773236bfa15", "accept",
							"application/json", "Content-Type", "application/json")
					.POST(BodyPublishers.ofString(mapper.writeValueAsString(openRouteServiceDirectionsPayload)))
					.build();
			HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
			return mapper.readValue(response.body(), OpenRouteServiceDirectionsResponse.class);

		} catch (IOException | URISyntaxException | InterruptedException e) {

		}

		return null;

	}

	@PostMapping
	public ResponseEntity createItinerary(@RequestBody ItineraryCreatePayload itineraryPayload)
			throws URISyntaxException {
		Trip trip = tripRepository.findById(itineraryPayload.getTripId()).orElse(null);

		if (itineraryPayload.getRouteOptions().isOptimize()) {
			List<Step> steps = getOpenRouteServiceOptimization(itineraryPayload);
			if (steps == null)
				return ResponseEntity.badRequest()
						.body("Unable to find route between points. Try changing the method of transportation.");
			itineraryPayload.sortLocations(steps);

		}

		OpenRouteServiceDirectionsResponse response = getOpenRouteServiceDirections(itineraryPayload);
		if (!response.routeFound())
			return ResponseEntity.badRequest()
					.body("Unable to find route between points. Try changing the method of transportation.");

		JSONArray decodedGeometry = GeometryDecoder.decodeGeometry(response.getGeometry(), false);
		LineString linestring = GeometryDecoder.convert(decodedGeometry);
		Itinerary itinerary = new Itinerary(trip, itineraryPayload.getDate(), linestring);

		List<Segment> segments = response.getSegments();
		List<GeosearchPayload> locations = itineraryPayload.getLocations();
		// origin time is 0 so create it separately
		ItineraryElement firstItineraryElement = new ItineraryElement(locations.get(0).getLabel(),
				locations.get(0).toPoint(), 0, itinerary);
		itinerary.addItineraryElement(firstItineraryElement);

		// pair travel durations with labels
		for (int i = 0; i < segments.size(); i++) {
			// origin is not returned as segment so payload is i+1
			GeosearchPayload payloadLocation = locations.get(i + 1);
			ItineraryElement itineraryElement = new ItineraryElement(payloadLocation.getLabel(),
					payloadLocation.toPoint(), (int) (segments.get(i).getDuration() / 60), itinerary);
			itinerary.addItineraryElement(itineraryElement);
		}

		trip.addItinerary(itinerary);
		tripRepository.save(trip);
		return ResponseEntity.ok(trip);

	}

}
