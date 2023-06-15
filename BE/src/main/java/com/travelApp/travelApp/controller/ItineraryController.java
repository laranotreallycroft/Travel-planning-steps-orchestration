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
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.json.JSONArray;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.LineString;
import org.locationtech.jts.geom.Point;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.travelApp.travelApp.model.payload.itinerary.ItineraryCreatePayload;
import com.travelApp.travelApp.model.payload.itinerary.ItineraryLocation;
import com.travelApp.travelApp.model.payload.itinerary.RouteOptions;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions.OpenRouteServiceDirectionsPayload;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions.OpenRouteServiceDirectionsResponse;

import com.travelApp.travelApp.model.payload.itinerary.openRouteService.distanceMatrix.OpenRouteServiceDistanceMatrixPayload;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.distanceMatrix.OpenRouteServiceDistanceMatrixResponse;

import com.travelApp.travelApp.repository.ItineraryElementRepository;
import com.travelApp.travelApp.repository.ItineraryRepository;
import com.travelApp.travelApp.repository.TripRepository;
import com.travelApp.travelApp.utils.DistanceMatrix;
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

	public OpenRouteServiceDistanceMatrixResponse getOpenRouteServiceDistanceMatrix(
			List<ItineraryLocation> itineraryLocations, RouteOptions routeOptions) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			var client = HttpClient.newHttpClient();
			OpenRouteServiceDistanceMatrixPayload openRouteServiceDistanceMatrixPayload = new OpenRouteServiceDistanceMatrixPayload(
					itineraryLocations);
			HttpRequest request = HttpRequest.newBuilder()
					.uri(new URI("https://api.openrouteservice.org/v2/matrix/" + routeOptions.getVehicleProfile()))
					.headers("Authorization", "5b3ce3597851110001cf624845f0c2fc3f004ad1bd965773236bfa15", "accept",
							"application/json", "Content-Type", "application/json")
					.POST(BodyPublishers.ofString(mapper.writeValueAsString(openRouteServiceDistanceMatrixPayload)))
					.build();
			HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
			return mapper.readValue(response.body(), OpenRouteServiceDistanceMatrixResponse.class);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;

	}

	public OpenRouteServiceDirectionsResponse getOpenRouteServiceDirections(List<ItineraryLocation> itineraryLocations,
			Coordinate origin, RouteOptions routeOptions) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			var client = HttpClient.newHttpClient();
			OpenRouteServiceDirectionsPayload openRouteServiceDirectionsPayload = new OpenRouteServiceDirectionsPayload(
					itineraryLocations, origin);
			HttpRequest request = HttpRequest.newBuilder()
					.uri(new URI("https://api.openrouteservice.org/v2/directions/" + routeOptions.getVehicleProfile()))
					.headers("Authorization", "5b3ce3597851110001cf624845f0c2fc3f004ad1bd965773236bfa15", "accept",
							"application/json", "Content-Type", "application/json")
					.POST(BodyPublishers.ofString(mapper.writeValueAsString(openRouteServiceDirectionsPayload)))
					.build();
			HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
			return mapper.readValue(response.body(), OpenRouteServiceDirectionsResponse.class);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;

	}

	public void createItinerariesFromPayload(Trip trip, List<ItineraryLocation> itineraryLocations,
			RouteOptions routeOptions, Integer tripDay) throws Exception {

		OpenRouteServiceDirectionsResponse response = getOpenRouteServiceDirections(itineraryLocations,
				trip.getLocation(), routeOptions);
		if (!response.routeFound())
			throw new Exception("Unable to find route between stops.");

		Itinerary itinerary = new Itinerary(trip, trip.getDateFrom().plusDays(tripDay));

		for (int i = 0; i < response.getSegments().size() - 1; i++) {
			LocalDateTime lastItineraryElementEndDateTime;
			if (itinerary.getItineraryElements() != null)
				lastItineraryElementEndDateTime = itinerary.getItineraryElements()
						.get(itinerary.getItineraryElements().size() - 1).getEndDate().toLocalDateTime();
			else
				lastItineraryElementEndDateTime = itinerary.getDate().atTime(LocalTime.of(8, 0));

			ItineraryLocation payloadLocation = itineraryLocations.get(i);
			int commuteDuration = (int) response.getSegments().get(i).getDuration() / 60;

			if (lastItineraryElementEndDateTime.getHour() > 20
					|| lastItineraryElementEndDateTime.plusMinutes(commuteDuration + payloadLocation.getDuration())
							.isAfter(itinerary.getDate().atTime(LocalTime.of(20, 0)))) {
				if (commuteDuration + payloadLocation.getDuration() > 12)
					throw new Exception("Commute and stay duration for "+ payloadLocation.getLabel()+" would be longer than 12 hours.");
				response = getOpenRouteServiceDirections(itineraryLocations.subList(0, i), trip.getLocation(),
						routeOptions);
				createItinerariesFromPayload(trip, itineraryLocations.subList(i, itineraryLocations.size()),
						routeOptions, ++tripDay);
				break;
			}

			ItineraryElement itineraryElement = new ItineraryElement(payloadLocation.getLabel(),
					payloadLocation.toPoint(), Timestamp.valueOf(lastItineraryElementEndDateTime),
					Timestamp.valueOf(lastItineraryElementEndDateTime.plusMinutes(commuteDuration)),
					Timestamp.valueOf(lastItineraryElementEndDateTime.plusMinutes(commuteDuration)),
					Timestamp.valueOf(lastItineraryElementEndDateTime
							.plusMinutes(commuteDuration + payloadLocation.getDuration())),
					itinerary);
			itinerary.addItineraryElement(itineraryElement);
		}
		JSONArray decodedGeometry = GeometryDecoder.decodeGeometry(response.getGeometry(), false);
		LineString linestring = GeometryDecoder.convert(decodedGeometry);
		itinerary.setRouteGeometry(linestring);
		trip.addItinerary(itinerary);

	}

	@PostMapping
	public ResponseEntity createItineraries(@RequestBody ItineraryCreatePayload itineraryPayload)
			throws URISyntaxException {

		Trip trip = tripRepository.findById(itineraryPayload.getTripId()).orElse(null);
		Integer tripDay = 0;
		if (itineraryPayload.getRouteOptions().isOptimize()) {
			try {
				OpenRouteServiceDistanceMatrixResponse response = getOpenRouteServiceDistanceMatrix(
						itineraryPayload.getLocations(), itineraryPayload.getRouteOptions());

				List<List<Integer>> clusters = DistanceMatrix.getClusters(response.getDurations(), null);
				for (List<Integer> cluster : clusters) {
					List<ItineraryLocation> clusterLocations = IntStream
							.range(0, itineraryPayload.getLocations().size()).filter(i -> cluster.contains(i))
							.mapToObj(itineraryPayload.getLocations()::get).collect(Collectors.toList());
					createItinerariesFromPayload(trip, clusterLocations, itineraryPayload.getRouteOptions(), tripDay);

				}
			} catch (Exception e) {
				return ResponseEntity.badRequest().body(e.getMessage());
			}

		} else {
			try {
				createItinerariesFromPayload(trip, itineraryPayload.getLocations(), itineraryPayload.getRouteOptions(),
						tripDay);
			} catch (Exception e) {
				return ResponseEntity.badRequest().body(
						e.getMessage());

			}
		}
		tripRepository.save(trip);
	return ResponseEntity.ok(trip);

	}

}
