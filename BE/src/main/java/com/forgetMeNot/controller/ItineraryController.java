package com.forgetMeNot.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.json.JSONArray;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.LineString;
import org.springframework.http.HttpStatus;
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
import com.forgetMeNot.model.Itinerary;
import com.forgetMeNot.model.ItineraryElement;
import com.forgetMeNot.model.Trip;
import com.forgetMeNot.model.payload.itinerary.ItineraryLocation;
import com.forgetMeNot.model.payload.itinerary.ItineraryPayload;
import com.forgetMeNot.model.payload.itinerary.RouteOptions;
import com.forgetMeNot.model.payload.itinerary.ScheduleElement;
import com.forgetMeNot.model.payload.itinerary.openRouteService.directions.OpenRouteServiceDirectionsPayload;
import com.forgetMeNot.model.payload.itinerary.openRouteService.directions.OpenRouteServiceDirectionsResponse;
import com.forgetMeNot.model.payload.itinerary.openRouteService.distanceMatrix.OpenRouteServiceDistanceMatrixPayload;
import com.forgetMeNot.model.payload.itinerary.openRouteService.distanceMatrix.OpenRouteServiceDistanceMatrixResponse;
import com.forgetMeNot.repository.ItineraryElementRepository;
import com.forgetMeNot.repository.TripRepository;
import com.forgetMeNot.utils.DistanceMatrix;
import com.forgetMeNot.utils.GeometryDecoder;

@RestController
@RequestMapping("/itineraries")
public class ItineraryController {
	private final TripRepository tripRepository;
	private final ItineraryElementRepository itineraryElementRepository;

	public ItineraryController(TripRepository tripRepository, ItineraryElementRepository itineraryElementRepository) {
		this.tripRepository = tripRepository;
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

		Itinerary itinerary = new Itinerary(trip, trip.getDateFrom().plusDays(tripDay),
				routeOptions.getVehicleProfile());

		for (int i = 0; i < response.getSegments().size() - 1; i++) {
			LocalDateTime lastItineraryElementEndDateTime;
			if (itinerary.getItineraryElements() != null && itinerary.getItineraryElements().size() > 0)
				lastItineraryElementEndDateTime = itinerary.getItineraryElements()
						.get(itinerary.getItineraryElements().size() - 1).getEndDate().toLocalDateTime();
			else
				lastItineraryElementEndDateTime = itinerary.getDate().atTime(LocalTime.of(8, 0));

			ItineraryLocation payloadLocation = itineraryLocations.get(i);
			int commuteDuration = (int) response.getSegments().get(i).getDuration() / 60;

			if (lastItineraryElementEndDateTime.getHour() > 20
					|| lastItineraryElementEndDateTime.plusMinutes(commuteDuration + payloadLocation.getDuration())
							.isAfter(itinerary.getDate().atTime(LocalTime.of(20, 0)))) {
				if (commuteDuration / 60 + payloadLocation.getDuration() / 60 > 12)
					throw new Exception("Commute and stay duration for " + payloadLocation.getLabel()
							+ " would be longer than 12 hours.");
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
					itinerary, payloadLocation.getDuration());
			itinerary.addItineraryElement(itineraryElement);
		}
		JSONArray decodedGeometry = GeometryDecoder.decodeGeometry(response.getGeometry(), false);
		LineString linestring = GeometryDecoder.convert(decodedGeometry);
		itinerary.setRouteGeometry(linestring);
		trip.addItinerary(itinerary);

	}

	@PostMapping
	public ResponseEntity createItineraries(@RequestBody ItineraryPayload itineraryPayload) throws URISyntaxException {

		Trip trip = tripRepository.findById(itineraryPayload.getTripId()).orElse(null);
		Integer tripDay = 0;
		if (itineraryPayload.getRouteOptions().isOptimize()) {
			try {
				OpenRouteServiceDistanceMatrixResponse response = getOpenRouteServiceDistanceMatrix(
						itineraryPayload.getLocations(), itineraryPayload.getRouteOptions());
				if (response.getDurations() == null)
					return ResponseEntity.badRequest().body("Unable to find route between stops.");
				List<List<Integer>> clusters = DistanceMatrix.getClusters(response.getDurations(), null);
				for (List<Integer> cluster : clusters) {
					List<ItineraryLocation> clusterLocations = IntStream
							.range(0, itineraryPayload.getLocations().size()).filter(i -> cluster.contains(i))
							.mapToObj(itineraryPayload.getLocations()::get).collect(Collectors.toList());
					createItinerariesFromPayload(trip, clusterLocations, itineraryPayload.getRouteOptions(), tripDay++);

				}
			} catch (Exception e) {
				return ResponseEntity.badRequest().body(e.getMessage());
			}

		} else {
			try {
				createItinerariesFromPayload(trip, itineraryPayload.getLocations(), itineraryPayload.getRouteOptions(),
						tripDay);
			} catch (Exception e) {
				return ResponseEntity.badRequest().body(e.getMessage());

			}
		}
		tripRepository.save(trip);
		return ResponseEntity.status(HttpStatus.CREATED).body(trip);

	}

	@PutMapping
	public ResponseEntity updateItineraries(@RequestBody ItineraryPayload itineraryPayload) throws URISyntaxException {

		Trip trip = tripRepository.findById(itineraryPayload.getTripId()).orElse(null);
		trip.getItineraries().clear();
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
					createItinerariesFromPayload(trip, clusterLocations, itineraryPayload.getRouteOptions(), tripDay++);

				}
			} catch (Exception e) {
				return ResponseEntity.badRequest().body(e.getMessage());
			}

		} else {
			try {
				createItinerariesFromPayload(trip, itineraryPayload.getLocations(), itineraryPayload.getRouteOptions(),
						tripDay);
			} catch (Exception e) {
				return ResponseEntity.badRequest().body(e.getMessage());

			}
		}
		tripRepository.save(trip);
		return ResponseEntity.ok(trip);

	}

	public void moveItineraryElements(ItineraryElement changedElement, Itinerary itinerary) {
		Timestamp commuteStartDate = changedElement.getCommuteStartDate();
		Timestamp commuteEndDate = changedElement.getCommuteEndDate();
		Timestamp startDate = changedElement.getStartDate();
		Timestamp endDate = changedElement.getEndDate();
		for (ItineraryElement element : itinerary.getItineraryElements()) {
			if (element.getId() != changedElement.getId()) {
				Timestamp elementCommuteStartDate = element.getCommuteStartDate();
				Timestamp elementCommuteEndDate = element.getCommuteEndDate();
				Timestamp elementStartDate = element.getStartDate();
				Timestamp elementEndDate = element.getEndDate();

				if (commuteStartDate.before(elementEndDate)
						&& (commuteEndDate.equals(elementEndDate) || commuteEndDate.after(elementEndDate))) {
					Long offset = elementEndDate.getTime() - commuteStartDate.getTime();
					element.setCommuteStartDate(new Timestamp(elementCommuteStartDate.getTime() - offset));
					element.setCommuteEndDate(new Timestamp(elementCommuteEndDate.getTime() - offset));
					element.setStartDate(new Timestamp(elementStartDate.getTime() - offset));
					element.setEndDate(new Timestamp(elementEndDate.getTime() - offset));

					moveItineraryElements(element, itinerary);
				}

				else if (endDate.after(elementCommuteStartDate)
						&& (endDate.before(elementCommuteEndDate) || endDate.equals(elementCommuteEndDate))) {
					Long offset = endDate.getTime() - elementCommuteStartDate.getTime();

					element.setCommuteStartDate(new Timestamp(elementCommuteStartDate.getTime() + offset));
					element.setCommuteEndDate(new Timestamp(elementCommuteEndDate.getTime() + offset));
					element.setStartDate(new Timestamp(elementStartDate.getTime() + offset));
					element.setEndDate(new Timestamp(elementEndDate.getTime() + offset));

					moveItineraryElements(element, itinerary);

				}
			}
		}

	}

	public void updateItinerarySchedule(Trip trip, Itinerary itinerary) throws Exception {

		RouteOptions routeOptions = new RouteOptions(false, itinerary.getTransportationMethod());
		List<ItineraryLocation> itineraryLocations = new ArrayList<>();
		for (ItineraryElement itineraryElement : itinerary.getItineraryElements()) {
			itineraryLocations.add(new ItineraryLocation(itineraryElement.getId().toString(),
					itineraryElement.getLocation().getX(), itineraryElement.getLocation().getY(),
					itineraryElement.getLabel(), itineraryElement.getDuration()));
		}
		itinerary.getItineraryElements().clear();
		if (itineraryLocations.size() > 0) {
			OpenRouteServiceDirectionsResponse response = getOpenRouteServiceDirections(itineraryLocations,
					trip.getLocation(), routeOptions);
			if (!response.routeFound())
				throw new Exception("Unable to find route between stops.");

			for (int i = 0; i < response.getSegments().size() - 1; i++) {
				LocalDateTime lastItineraryElementEndDateTime;
				if (itinerary.getItineraryElements() != null && itinerary.getItineraryElements().size() > 0)
					lastItineraryElementEndDateTime = itinerary.getItineraryElements()
							.get(itinerary.getItineraryElements().size() - 1).getEndDate().toLocalDateTime();
				else
					lastItineraryElementEndDateTime = itinerary.getDate().atTime(LocalTime.of(8, 0));

				ItineraryLocation originalItineraryLocation = itineraryLocations.get(i);
				int commuteDuration = (int) response.getSegments().get(i).getDuration() / 60;

				if (lastItineraryElementEndDateTime.getHour() > 20 || lastItineraryElementEndDateTime
						.plusMinutes(commuteDuration + originalItineraryLocation.getDuration())
						.isAfter(itinerary.getDate().atTime(LocalTime.of(20, 0)))) {
					if (commuteDuration / 60 + originalItineraryLocation.getDuration() / 60 > 12)
						throw new Exception("Commute and stay duration for " + originalItineraryLocation.getLabel()
								+ " would be longer than 12 hours.");
					throw new Exception("Itinerary items for " + itinerary.getDate() + "can't be visited in one day.");

				}

				ItineraryElement itineraryElement = new ItineraryElement(originalItineraryLocation.getLabel(),
						originalItineraryLocation.toPoint(), Timestamp.valueOf(lastItineraryElementEndDateTime),
						Timestamp.valueOf(lastItineraryElementEndDateTime.plusMinutes(commuteDuration)),
						Timestamp.valueOf(lastItineraryElementEndDateTime.plusMinutes(commuteDuration)),
						Timestamp.valueOf(lastItineraryElementEndDateTime
								.plusMinutes(commuteDuration + originalItineraryLocation.getDuration())),
						itinerary, originalItineraryLocation.getDuration());
				itinerary.addItineraryElement(itineraryElement);
			}
			JSONArray decodedGeometry = GeometryDecoder.decodeGeometry(response.getGeometry(), false);
			LineString linestring = GeometryDecoder.convert(decodedGeometry);
			itinerary.setRouteGeometry(linestring);

		} else {

			trip.removeItinerary(itinerary);

		}
	}

	@PutMapping("/schedule")
	public ResponseEntity updateItinerarySchedule(@RequestBody List<ScheduleElement> scheduleElements) {
		Set<Itinerary> itinerariesToUpdate = new HashSet<>();
		Trip trip = null;
		for (ScheduleElement scheduleElement : scheduleElements) {
			ItineraryElement itineraryElement = itineraryElementRepository
					.findById(
							Long.parseLong(scheduleElement.getId().substring(0, scheduleElement.getId().length() - 1)))
					.orElse(null);
			if (trip == null)
				trip = itineraryElement.getItinerary().getTrip();

			LocalDateTime originalStartDateTime = itineraryElement.getStartDate().toLocalDateTime();
			LocalDateTime originalEndDateTime = itineraryElement.getEndDate().toLocalDateTime();
			LocalDateTime newStartDateTime = scheduleElement.getStartDate().toLocalDateTime();
			LocalDateTime newEndDateTime = scheduleElement.getEndDate().toLocalDateTime();

			if (!(originalStartDateTime.equals(newStartDateTime) && originalEndDateTime.equals(newEndDateTime))) {

				Long previousCommuteLength = itineraryElement.getCommuteEndDate().getTime()
						- itineraryElement.getCommuteStartDate().getTime();

				itineraryElement.setCommuteStartDate(
						new Timestamp(scheduleElement.getStartDate().getTime() - previousCommuteLength));
				itineraryElement.setCommuteEndDate(scheduleElement.getStartDate());
				itineraryElement.setStartDate(scheduleElement.getStartDate());
				itineraryElement.setEndDate(scheduleElement.getEndDate());
				itineraryElement.setDuration(
						(int) ((scheduleElement.getEndDate().getTime() - scheduleElement.getStartDate().getTime())
								/ 60000));

				moveItineraryElements(itineraryElement,
						trip.findItineraryWithDate(originalStartDateTime.toLocalDate()));
				if (!originalStartDateTime.toLocalDate().equals(newStartDateTime.toLocalDate())) {
					Itinerary originalItinerary = trip.findItineraryWithDate(originalStartDateTime.toLocalDate());
					originalItinerary.removeItineraryElement(itineraryElement);
					itinerariesToUpdate.add(originalItinerary);

					Itinerary newItinerary = trip.findItineraryWithDate(newStartDateTime.toLocalDate());
					newItinerary.addItineraryElement(itineraryElement);
					itinerariesToUpdate.add(newItinerary);
				}
			}
		}
		for (Itinerary itinerary : itinerariesToUpdate) {
			try {
				itinerary.sortElementsAsc();
				updateItinerarySchedule(trip, itinerary);
			} catch (Exception e) {
				return ResponseEntity.badRequest().body(e.getMessage());
			}
		}
		tripRepository.save(trip);
		return ResponseEntity.ok(trip);
	}

	@DeleteMapping("/{tripId}")
	public ResponseEntity deleteItinenaries(@PathVariable(value = "tripId") Long tripId) throws URISyntaxException {

		Trip trip = tripRepository.findById(tripId).orElse(null);
		trip.getItineraries().clear();
		tripRepository.save(trip);
		return ResponseEntity.ok(trip);

	}
}
