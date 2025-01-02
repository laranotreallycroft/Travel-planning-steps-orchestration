package com.odysseus.service;

import com.odysseus.model.itinerary.*;
import com.odysseus.model.itinerary.openRouteService.directions.OpenRouteServiceDirectionsPayload;
import com.odysseus.model.itinerary.openRouteService.directions.OpenRouteServiceDirectionsResponse;
import com.odysseus.model.itinerary.openRouteService.distanceMatrix.OpenRouteServiceDistanceMatrixPayload;
import com.odysseus.model.itinerary.openRouteService.distanceMatrix.OpenRouteServiceDistanceMatrixResponse;
import com.odysseus.model.location.Location;
import com.odysseus.model.location.LocationRequest;
import com.odysseus.model.trip.Trip;
import com.odysseus.repository.ItineraryElementRepository;
import com.odysseus.repository.TripRepository;
import com.odysseus.utils.DistanceMatrix;
import com.odysseus.utils.GeometryDecoder;
import org.json.JSONArray;
import org.locationtech.jts.geom.LineString;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class ItineraryService {

    private final RestTemplate restTemplate;
    private final LocationService locationService;
    private final TripRepository tripRepository;
    private final ItineraryElementRepository itineraryElementRepository;

    @Value("${openRouteService.matrix.baseUrl}")
    private String openRouteServiceMatrixBaseUrl;
    @Value("${openRouteService.directions.baseUrl}")
    private String openRouteServiceDirectionsBaseUrl;
    @Value("${openRouteService.apiKey}")
    private String openRouteServiceApiKey;

    public ItineraryService(RestTemplate restTemplate, LocationService locationService, TripRepository tripRepository, ItineraryElementRepository itineraryElementRepository) {
        this.restTemplate = restTemplate;
        this.locationService = locationService;
        this.tripRepository = tripRepository;
        this.itineraryElementRepository = itineraryElementRepository;
    }

    /**
     * Creates an itinerary for a given trip based on the input request.
     *
     * @param itineraryCreateRequest The request containing trip details, stops, and options.
     * @return The updated Trip object with created itineraries.
     * @throws Exception If any error occurs during itinerary creation.
     */
    public Trip createItinerary(ItineraryCreateRequest itineraryCreateRequest) throws Exception {
        // Retrieve the trip using the given trip ID
        Trip trip = tripRepository.findById(itineraryCreateRequest.getTripId()).orElse(null);
        if (trip == null) {
            throw new IllegalArgumentException("Trip with the specified ID does not exist.");
        }

        // Clear existing itineraries if any
        if (trip.getItineraries() != null) {
            trip.getItineraries().clear();
        }

        int tripDay = 0;
        if (itineraryCreateRequest.isOptimize()) {
            // Optimize route using OpenRouteService Distance Matrix API
            OpenRouteServiceDistanceMatrixResponse response = getOpenRouteServiceDistanceMatrix(
                    itineraryCreateRequest.getStops(), itineraryCreateRequest.getTransportationMethod());
            if (response.getDurations() == null) {
                throw new IllegalArgumentException("Unable to find route between stops.");
            }

            // Cluster stops and create itineraries for each cluster
            List<List<Integer>> clusters = DistanceMatrix.getClusters(response.getDurations(), itineraryCreateRequest.getStops());
            for (List<Integer> cluster : clusters) {
                List<ItineraryElementRequest> clusterLocations = IntStream
                        .range(0, itineraryCreateRequest.getStops().size()).filter(cluster::contains)
                        .mapToObj(itineraryCreateRequest.getStops()::get).collect(Collectors.toList());
                createItinerariesFromPayload(trip, clusterLocations, itineraryCreateRequest.getTransportationMethod(), tripDay++);
            }
        } else {
            // Create itineraries without optimization
            List<List<ItineraryElementRequest>> clusters = DistanceMatrix.getClusters(itineraryCreateRequest.getStops());
            for (List<ItineraryElementRequest> cluster : clusters) {
                createItinerariesFromPayload(trip, cluster, itineraryCreateRequest.getTransportationMethod(), tripDay++);
            }
        }

        // Save the updated trip with itineraries
        return tripRepository.save(trip);
    }

    /**
     * Calls the OpenRouteService Distance Matrix API to get durations between stops.
     *
     * @param itineraryElementRequests List of stops for the itinerary.
     * @param transportationMethodEnum The transportation method to use (e.g., car, walking).
     * @return The response from the Distance Matrix API.
     */
    public OpenRouteServiceDistanceMatrixResponse getOpenRouteServiceDistanceMatrix(List<ItineraryElementRequest> itineraryElementRequests, TransportationMethodEnum transportationMethodEnum) {

        OpenRouteServiceDistanceMatrixPayload openRouteServiceDistanceMatrixPayload = new OpenRouteServiceDistanceMatrixPayload(itineraryElementRequests);
        String openRouteServiceUrl = String.format("%s/%s", openRouteServiceMatrixBaseUrl, transportationMethodEnum.getValue());

        // Set headers for the API request
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", String.format("Bearer %s", openRouteServiceApiKey));
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<OpenRouteServiceDistanceMatrixPayload> entity = new HttpEntity<>(openRouteServiceDistanceMatrixPayload, headers);

        // Make the API call
        ResponseEntity<OpenRouteServiceDistanceMatrixResponse> response = restTemplate.exchange(
                openRouteServiceUrl,
                HttpMethod.POST,
                entity,
                OpenRouteServiceDistanceMatrixResponse.class
        );
        return response.getBody();

    }

    /**
     * Calls the OpenRouteService Directions API to get directions between stops.
     *
     * @param itineraryElementRequests List of stops for the itinerary.
     * @param transportationMethod     The transportation method to use.
     * @return The response from the Directions API.
     */
    public OpenRouteServiceDirectionsResponse getOpenRouteServiceDirections(List<ItineraryElementRequest> itineraryElementRequests, TransportationMethodEnum transportationMethod) {
        try {

            OpenRouteServiceDirectionsPayload openRouteServiceDirectionsPayload = new OpenRouteServiceDirectionsPayload(itineraryElementRequests);
            String openRouteServiceUrl = String.format("%s/%s", openRouteServiceDirectionsBaseUrl, transportationMethod.getValue());

            // Set headers for the API request
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", String.format("Bearer %s", openRouteServiceApiKey));
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            HttpEntity<OpenRouteServiceDirectionsPayload> entity = new HttpEntity<>(openRouteServiceDirectionsPayload, headers);

            // Make the API call
            ResponseEntity<OpenRouteServiceDirectionsResponse> response = restTemplate.exchange(
                    openRouteServiceUrl,
                    HttpMethod.POST,
                    entity,
                    OpenRouteServiceDirectionsResponse.class
            );
            return response.getBody();


        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    /**
     * Creates itineraries for the given trip and cluster of stops.
     *
     * @param trip                     The trip for which itineraries are created.
     * @param itineraryElementRequests List of stops in the cluster.
     * @param transportationMethod     The transportation method to use.
     * @param tripDay                  The day index for the itinerary.
     * @throws Exception If any error occurs during itinerary creation.
     */
    public void createItinerariesFromPayload(Trip trip, List<ItineraryElementRequest> itineraryElementRequests, TransportationMethodEnum transportationMethod, Integer tripDay) throws Exception {
        // If more than one stop, get directions for the cluster
        if (itineraryElementRequests.size() > 1) {
            OpenRouteServiceDirectionsResponse response = getOpenRouteServiceDirections(itineraryElementRequests, transportationMethod);
            if (!response.routeFound())
                throw new Exception("Unable to find route between stops.");

            // Create a new itinerary and initialize its start date and time
            Itinerary itinerary = new Itinerary(trip, trip.getDateFrom().plusDays(tripDay), transportationMethod.getValue());
            LocalDateTime lastEndDateTime = initializeStartDateTime(itinerary);

            // Add the first stop to the itinerary
            addItineraryElement(
                    itinerary,
                    itineraryElementRequests.get(0),
                    lastEndDateTime,
                    0
            );

            // Add remaining stops
            List<ItineraryElementRequest> modifiedItineraryElementRequests = itineraryElementRequests.subList(1, itineraryElementRequests.size());
            for (int i = 0; i < response.getSegments().size(); i++) {
                ItineraryElementRequest currentStop = modifiedItineraryElementRequests.get(i);
                int commuteDuration = (int) response.getSegments().get(i).getDuration() / 60;
                int totalDuration = commuteDuration + currentStop.getDuration();

                if (exceedsDayLimit(lastEndDateTime, totalDuration, itinerary.getDate())) {
                    // If the stop exceeds the day's limit, split into a new itinerary
                    List<ItineraryElementRequest> remainingStops = modifiedItineraryElementRequests.subList(i, modifiedItineraryElementRequests.size());
                    if (remainingStops.isEmpty()) {
                        throw new Exception("Remaining stops exceed day limit.");
                    }
                    createItinerariesFromPayload(trip, remainingStops, transportationMethod, tripDay + 1);
                    return;
                }
                lastEndDateTime = addItineraryElement(
                        itinerary,
                        currentStop,
                        lastEndDateTime,
                        commuteDuration
                );
            }

            // Set the route geometry for the itinerary
            JSONArray decodedGeometry = GeometryDecoder.decodeGeometry(response.getGeometry(), false);
            LineString linestring = GeometryDecoder.convert(decodedGeometry);
            itinerary.setRouteGeometry(linestring);
            trip.addItinerary(itinerary);
        } else {
            // Handle single-stop itineraries
            Itinerary itinerary = new Itinerary(trip, trip.getDateFrom().plusDays(tripDay), transportationMethod.getValue());
            LocalDateTime lastEndDateTime = initializeStartDateTime(itinerary);
            addItineraryElement(
                    itinerary,
                    itineraryElementRequests.get(0),
                    lastEndDateTime,
                    0
            );
            trip.addItinerary(itinerary);
        }

    }

    /**
     * Initializes the start date and time for an itinerary.
     *
     * @param itinerary The itinerary for which to initialize the start time.
     * @return The start date and time.
     */
    private LocalDateTime initializeStartDateTime(Itinerary itinerary) {
        if (itinerary.getItineraryElements() != null && !itinerary.getItineraryElements().isEmpty()) {
            return itinerary.getItineraryElements()
                    .get(itinerary.getItineraryElements().size() - 1)
                    .getEndDate()
                    .toLocalDateTime();
        }
        return itinerary.getDate().atTime(LocalTime.of(8, 0));
    }

    /**
     * Checks if adding a stop exceeds the day's time limit.
     *
     * @param currentDateTime The current date and time.
     * @param totalDuration   The duration to add.
     * @param itineraryDate   The date of the itinerary.
     * @return True if the time exceeds the day's limit, false otherwise.
     */
    private boolean exceedsDayLimit(LocalDateTime currentDateTime, int totalDuration, LocalDate itineraryDate) {
        LocalDateTime endOfDay = itineraryDate.atTime(LocalTime.of(20, 0));
        return currentDateTime.plusMinutes(totalDuration).isAfter(endOfDay);
    }

    /**
     * Adds an itinerary element to an itinerary.
     *
     * @param itinerary       The itinerary to which the element is added.
     * @param stop            The stop to add.
     * @param lastEndDateTime The end time of the last element.
     * @param commuteDuration The duration of the commute to the stop.
     * @return The end date and time of the new element.
     */
    private LocalDateTime addItineraryElement(Itinerary itinerary, ItineraryElementRequest stop, LocalDateTime lastEndDateTime, int commuteDuration) {
        LocalDateTime commuteEndTime = lastEndDateTime.plusMinutes(commuteDuration);
        LocalDateTime stopEndTime = commuteEndTime.plusMinutes(stop.getDuration());

        Location location = locationService.getLocation(stop.getLocation());


        ItineraryElement element = new ItineraryElement(
                location,
                Timestamp.valueOf(lastEndDateTime),
                Timestamp.valueOf(commuteEndTime),
                Timestamp.valueOf(commuteEndTime),
                Timestamp.valueOf(stopEndTime),
                itinerary,
                stop.getDuration(),
                stop.getStart()
        );

        itinerary.addItineraryElement(element);
        return stopEndTime;
    }

    /**
     * Deletes the itinerary for a given trip.
     *
     * @param tripId ID of the Trip object
     * @return The updated Trip object with deleted itineraries.
     * @throws Exception If any error occurs during itinerary deletion.
     */
    public Trip deleteItinerary(Long tripId) {
        // Retrieve the trip using the given trip ID
        Trip trip = tripRepository.findById(tripId).orElse(null);
        if (trip == null) {
            throw new IllegalArgumentException("Trip with the specified ID does not exist.");
        }

        // Clear existing itineraries if any
        if (trip.getItineraries() != null) {
            trip.getItineraries().clear();
        }

        // Save the updated trip with itineraries
        return tripRepository.save(trip);
    }

    public Trip updateItinerarySchedule(List<ScheduleElement> scheduleElements) {
        Set<Itinerary> itinerariesToUpdate = new HashSet<>();
        Trip trip = null;
        for (ScheduleElement scheduleElement : scheduleElements) {
            ItineraryElement itineraryElement = itineraryElementRepository
                    .findById(scheduleElement.getId()).orElse(null);
            if (trip == null)
                trip = itineraryElement.getItinerary().getTrip();

            LocalDateTime originalStartDateTime = itineraryElement.getStartDate().toLocalDateTime();
            LocalDateTime originalEndDateTime = itineraryElement.getEndDate().toLocalDateTime();
            LocalDateTime newStartDateTime = scheduleElement.getStartDate().toLocalDateTime();
            LocalDateTime newEndDateTime = scheduleElement.getEndDate().toLocalDateTime();

            if (!originalStartDateTime.equals(newStartDateTime) || !originalEndDateTime.equals(newEndDateTime)) {

                long previousCommuteLength = itineraryElement.getCommuteEndDate().getTime()
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
                List<ItineraryElementRequest> itineraryLocations = new ArrayList<>();
                for (ItineraryElement itineraryElement : itinerary.getItineraryElements()) {
                    LocationRequest locationRequest = new LocationRequest(itineraryElement.getLocation().getId(), itineraryElement.getLocation().getCoordinatesModel(), itineraryElement.getLocation().getLabel());
                    itineraryLocations.add(new ItineraryElementRequest(itineraryElement.getDuration(), locationRequest, itineraryElement.isStart()));
                }
                itinerary.getItineraryElements().clear();

                createItinerariesFromPayload(trip, itineraryLocations, TransportationMethodEnum.fromValue(itinerary.getTransportationMethod()), 0);

            } catch (Exception e) {
                throw new IllegalArgumentException("Error in updating itinerary schedule!");
            }
        }

        return tripRepository.save(trip);
    }


    public void moveItineraryElements(ItineraryElement changedElement, Itinerary itinerary) {
        Timestamp commuteStartDate = changedElement.getCommuteStartDate();
        Timestamp commuteEndDate = changedElement.getCommuteEndDate();
        Timestamp endDate = changedElement.getEndDate();
        for (ItineraryElement element : itinerary.getItineraryElements()) {
            if (!element.getId().equals(changedElement.getId())) {

                Timestamp elementCommuteStartDate = element.getCommuteStartDate();
                Timestamp elementCommuteEndDate = element.getCommuteEndDate();
                Timestamp elementStartDate = element.getStartDate();
                Timestamp elementEndDate = element.getEndDate();

                boolean overlapsBefore = commuteStartDate.before(elementEndDate)
                        && (commuteEndDate.equals(elementEndDate) || commuteEndDate.after(elementEndDate));
                boolean overlapsAfter = endDate.after(elementCommuteStartDate)
                        && (endDate.before(elementCommuteEndDate) || endDate.equals(elementCommuteEndDate));

                if (overlapsBefore || overlapsAfter) {
                    long offset = overlapsBefore
                            ? commuteStartDate.getTime() - elementEndDate.getTime()
                            : endDate.getTime() - elementCommuteStartDate.getTime();

                    element.setCommuteStartDate(new Timestamp(elementCommuteStartDate.getTime() + offset));
                    element.setCommuteEndDate(new Timestamp(elementCommuteEndDate.getTime() + offset));
                    element.setStartDate(new Timestamp(elementStartDate.getTime() + offset));
                    element.setEndDate(new Timestamp(elementEndDate.getTime() + offset));

                    moveItineraryElements(element, itinerary);
                }

            }
        }

    }


}

