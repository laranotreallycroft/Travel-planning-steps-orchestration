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
import com.travelApp.travelApp.model.User;
import com.travelApp.travelApp.model.payload.common.GeosearchPayload;
import com.travelApp.travelApp.model.payload.itinerary.ItineraryLocation;
import com.travelApp.travelApp.model.payload.itinerary.RouteOptions;
import com.travelApp.travelApp.model.payload.itinerary.ScheduleElement;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions.OpenRouteServiceDirectionsPayload;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions.OpenRouteServiceDirectionsResponse;
import com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions.Segment;

import com.travelApp.travelApp.repository.ItineraryElementRepository;
import com.travelApp.travelApp.repository.ItineraryRepository;
import com.travelApp.travelApp.repository.TripRepository;
import com.travelApp.travelApp.utils.GeometryDecoder;

@RestController
@RequestMapping("/itinerary")
public class ItineraryController2 {
	private final TripRepository tripRepository;
	private final ItineraryRepository itineraryRepository;
	private final ItineraryElementRepository itineraryElementRepository;

	public ItineraryController2(TripRepository tripRepository, ItineraryRepository itineraryRepository,
			ItineraryElementRepository itineraryElementRepository) {
		this.tripRepository = tripRepository;
		this.itineraryRepository = itineraryRepository;
		this.itineraryElementRepository = itineraryElementRepository;
	}




	  /*
	  @PutMapping("/{itineraryId}/schedule") public ResponseEntity
	  updateItinerarySchedule(@PathVariable(value = "itineraryId") Long
	  itineraryId,
	  
	  @RequestBody List<ScheduleElement> scheduleElements) throws
	  URISyntaxException {
	  
	  Itinerary itinerary = itineraryRepository.findById(itineraryId).orElse(null);
	  for (ScheduleElement scheduleElement : scheduleElements) {
	  
	  ItineraryElement itineraryElement = itineraryElementRepository .findById(
	  Long.parseLong(scheduleElement.getId().substring(0,
	  scheduleElement.getId().length() - 1))) .orElse(null);
	  
	  Long previousCommuteLength = itineraryElement.getCommuteEndDate().getTime() -
	  itineraryElement.getCommuteStartDate().getTime();
	  
	  itineraryElement.setCommuteStartDate( new
	  Timestamp(scheduleElement.getStartDate().getTime() - previousCommuteLength));
	  itineraryElement.setCommuteEndDate(scheduleElement.getStartDate());
	  itineraryElement.setStartDate(scheduleElement.getStartDate());
	  itineraryElement.setEndDate(scheduleElement.getEndDate());
	  itineraryElementRepository.save(itineraryElement);
	  
	  }
	  
	  return ResponseEntity.ok(itinerary.getTrip());
	  
	  }
	  
	  @DeleteMapping("/{itineraryId}") public ResponseEntity
	  deleteItinerary(@PathVariable(value = "itineraryId") Long itineraryId) throws
	  URISyntaxException {
	  
	  Itinerary itinerary = itineraryRepository.findById(itineraryId).orElse(null);
	  if (itinerary != null) { Trip trip = itinerary.getTrip();
	  itineraryRepository.delete(itinerary); return ResponseEntity.ok(trip);
	  
	  }
	  
	  return ResponseEntity.badRequest().body("Something went wrong");
	  
	  }
	 */
}
