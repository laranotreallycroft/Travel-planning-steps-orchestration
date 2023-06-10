package com.travelApp.travelApp.controller;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.sql.Timestamp;
import java.util.Comparator;
import java.util.List;

import org.json.JSONArray;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.LineString;
import org.locationtech.jts.geom.Point;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.travelApp.travelApp.model.Itinerary;
import com.travelApp.travelApp.model.ItineraryElement;
import com.travelApp.travelApp.model.Trip;
import com.travelApp.travelApp.model.payload.common.GeosearchPayload;
import com.travelApp.travelApp.model.payload.itinerary.ItineraryRoutingPayload;
import com.travelApp.travelApp.model.payload.itinerary.RouteOptions;
import com.travelApp.travelApp.model.payload.itinerary.ScheduleElement;
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

	public List<Step> getOpenRouteServiceOptimization(ItineraryRoutingPayload itineraryPayload, Coordinate origin) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			var client = HttpClient.newHttpClient();
			OpenRouteServiceOptimizationPayload openRouteServiceOptimizationPayload = new OpenRouteServiceOptimizationPayload(
					itineraryPayload, origin);
			var request = HttpRequest.newBuilder().uri(new URI("https://api.openrouteservice.org/optimization"))
					.headers("Authorization", "5b3ce3597851110001cf624845f0c2fc3f004ad1bd965773236bfa15", "accept",
							"application/json", "Content-Type", "application/json")
					.POST(BodyPublishers.ofString(mapper.writeValueAsString(openRouteServiceOptimizationPayload)))
					.build();
			HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
			OpenRouteServiceOptimizationResponse openRouteServiceResponse = mapper.readValue(response.body(),
					OpenRouteServiceOptimizationResponse.class);

			return openRouteServiceResponse.getRoutes().get(0).getSteps();
		} catch (IOException | URISyntaxException | InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return null;

	}

	public OpenRouteServiceDirectionsResponse getOpenRouteServiceDirections(ItineraryRoutingPayload itineraryPayload,
			Coordinate origin) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			var client = HttpClient.newHttpClient();
			OpenRouteServiceDirectionsPayload openRouteServiceDirectionsPayload = new OpenRouteServiceDirectionsPayload(
					itineraryPayload, origin);
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
	public ResponseEntity createItinerary(@RequestBody ItineraryRoutingPayload itineraryPayload)
			throws URISyntaxException {
		Trip trip = tripRepository.findById(itineraryPayload.getTripId()).orElse(null);

		if (itineraryPayload.getRouteOptions().isOptimize()) {
			List<Step> steps = getOpenRouteServiceOptimization(itineraryPayload, trip.getLocation());
			if (steps == null)
				return ResponseEntity.badRequest()
						.body("Unable to find route between points. Try changing the method of transportation.");
			itineraryPayload.sortLocations(steps);

		}

		OpenRouteServiceDirectionsResponse response = getOpenRouteServiceDirections(itineraryPayload,
				trip.getLocation());
		if (!response.routeFound())
			return ResponseEntity.badRequest()
					.body("Unable to find route between points. Try changing the method of transportation.");

		JSONArray decodedGeometry = GeometryDecoder.decodeGeometry(response.getGeometry(), false);
		LineString linestring = GeometryDecoder.convert(decodedGeometry);
		Itinerary itinerary = new Itinerary(trip, itineraryPayload.getDate(), linestring);

		Integer timeAtLocation = 60;
		LocalTime time = LocalTime.of(8, 0); // Set the desired time to 8 AM
		LocalDateTime dateTime = itinerary.getDate().atTime(time);
		List<Segment> segments = response.getSegments();
		List<GeosearchPayload> locations = itineraryPayload.getLocations();

		// pair travel durations with labels
		for (int i = 0; i < segments.size() - 1; i++) {
			GeosearchPayload payloadLocation = locations.get(i);
			int durationMinutes = (int) segments.get(i).getDuration() / 60;

			ItineraryElement itineraryElement = new ItineraryElement(payloadLocation.getLabel(),
					payloadLocation.toPoint(), Timestamp.valueOf(dateTime),
					Timestamp.valueOf(dateTime.plusMinutes(durationMinutes)),
					Timestamp.valueOf(dateTime.plusMinutes(durationMinutes)),
					Timestamp.valueOf(dateTime.plusMinutes(durationMinutes + timeAtLocation)), itinerary);
			itinerary.addItineraryElement(itineraryElement);
			// TODO REAL TIME
			dateTime = dateTime.plusMinutes(durationMinutes + timeAtLocation);
		}
		if(dateTime.toLocalDate()!=itinerary.getDate()) {
			return ResponseEntity.badRequest()
					.body("This route would take more than a day. Try removing some stops.");

		}
		trip.addItinerary(itinerary);
		tripRepository.save(trip);
		return ResponseEntity.ok(trip);

	}

	@PutMapping("/{itineraryId}/route")
	public ResponseEntity updateItineraryRoute(@PathVariable(value = "itineraryId") Long itineraryId,
			@RequestBody ItineraryRoutingPayload itineraryPayload) throws URISyntaxException {
		Itinerary itinerary = itineraryRepository.findById(itineraryId).orElse(null);

		if (itineraryPayload.getRouteOptions().isOptimize()) {
			List<Step> steps = getOpenRouteServiceOptimization(itineraryPayload, itinerary.getTrip().getLocation());
			if (steps == null)
				return ResponseEntity.badRequest()
						.body("Unable to find route between points. Try changing the method of transportation.");
			itineraryPayload.sortLocations(steps);

		}

		OpenRouteServiceDirectionsResponse response = getOpenRouteServiceDirections(itineraryPayload,
				itinerary.getTrip().getLocation());
		if (!response.routeFound())
			return ResponseEntity.badRequest()
					.body("Unable to find route between points. Try changing the method of transportation.");

		JSONArray decodedGeometry = GeometryDecoder.decodeGeometry(response.getGeometry(), false);
		LineString linestring = GeometryDecoder.convert(decodedGeometry);
		itinerary.setRouteGeometry(linestring);
		itinerary.getItineraryElements().clear();

		Integer timeAtLocation = 60;
		LocalTime time = LocalTime.of(8, 0); // Set the desired time to 8 AM
		LocalDateTime dateTime = itinerary.getDate().atTime(time);

		List<Segment> segments = response.getSegments();
		List<GeosearchPayload> locations = itineraryPayload.getLocations();

		// pair travel durations with labels
		for (int i = 0; i < segments.size() - 1; i++) {
			GeosearchPayload payloadLocation = locations.get(i);
			int durationMinutes = (int) segments.get(i).getDuration() / 60;
			ItineraryElement itineraryElement = new ItineraryElement(payloadLocation.getLabel(),
					payloadLocation.toPoint(), Timestamp.valueOf(dateTime),
					Timestamp.valueOf(dateTime.plusMinutes(durationMinutes)),
					Timestamp.valueOf(dateTime.plusMinutes(durationMinutes)),
					Timestamp.valueOf(dateTime.plusMinutes(durationMinutes + timeAtLocation)), itinerary);
			itinerary.addItineraryElement(itineraryElement);

			// TODO REAL TIME
			dateTime = dateTime.plusMinutes(durationMinutes + timeAtLocation);
		}
		if(dateTime.toLocalDate()!=itinerary.getDate()) {
			return ResponseEntity.badRequest()
					.body("This route would take more than a day. Try removing some stops.");

		}
		itineraryRepository.save(itinerary);
		return ResponseEntity.ok(itinerary.getTrip());

	}

	@PutMapping("/{itineraryId}/schedule")
	public ResponseEntity updateItinerarySchedule(@PathVariable(value = "itineraryId") Long itineraryId,
			@RequestBody List<ScheduleElement> scheduleElements) throws URISyntaxException {

		Itinerary itinerary = itineraryRepository.findById(itineraryId).orElse(null);
		for (ScheduleElement scheduleElement : scheduleElements) {

			ItineraryElement itineraryElement = itineraryElementRepository
					.findById(
							Long.parseLong(scheduleElement.getId().substring(0, scheduleElement.getId().length() - 1)))
					.orElse(null);

			Long previousCommuteLength = itineraryElement.getCommuteEndDate().getTime()
					- itineraryElement.getCommuteStartDate().getTime();

			itineraryElement.setCommuteStartDate(
					new Timestamp(scheduleElement.getStartDate().getTime() - previousCommuteLength));
			itineraryElement.setCommuteEndDate(scheduleElement.getStartDate());
			itineraryElement.setStartDate(scheduleElement.getStartDate());
			itineraryElement.setEndDate(scheduleElement.getEndDate());
			itineraryElementRepository.save(itineraryElement);

		}
		
		return ResponseEntity.ok(itinerary.getTrip());

	}

}
