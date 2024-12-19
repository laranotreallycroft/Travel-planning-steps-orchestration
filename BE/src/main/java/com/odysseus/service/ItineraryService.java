package com.odysseus.service;

import com.odysseus.model.itinerary.Itinerary;
import com.odysseus.model.itinerary.ItineraryElement;
import com.odysseus.model.itinerary.ItineraryElementRequest;
import com.odysseus.model.itinerary.TransportationMethodEnum;
import com.odysseus.model.itinerary.openRouteService.directions.OpenRouteServiceDirectionsPayload;
import com.odysseus.model.itinerary.openRouteService.directions.OpenRouteServiceDirectionsResponse;
import com.odysseus.model.itinerary.openRouteService.distanceMatrix.OpenRouteServiceDistanceMatrixPayload;
import com.odysseus.model.itinerary.openRouteService.distanceMatrix.OpenRouteServiceDistanceMatrixResponse;
import com.odysseus.model.location.Location;
import com.odysseus.model.trip.Trip;
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
import java.util.Collections;
import java.util.List;

@Service
public class ItineraryService {

    private final RestTemplate restTemplate;
    private final LocationService locationService;

    @Value("${openRouteService.matrix.baseUrl}")
    private String openRouteServiceMatrixBaseUrl;
    @Value("${openRouteService.directions.baseUrl}")
    private String openRouteServiceDirectionsBaseUrl;
    @Value("${openRouteService.apiKey}")
    private String openRouteServiceApiKey;

    public ItineraryService(RestTemplate restTemplate, LocationService locationService) {
        this.restTemplate = restTemplate;
        this.locationService = locationService;
    }

    public OpenRouteServiceDistanceMatrixResponse getOpenRouteServiceDistanceMatrix(List<ItineraryElementRequest> itineraryElementRequests, TransportationMethodEnum transportationMethodEnum) {

        OpenRouteServiceDistanceMatrixPayload openRouteServiceDistanceMatrixPayload = new OpenRouteServiceDistanceMatrixPayload(itineraryElementRequests);
        String openRouteServiceUrl = String.format("%s/%s", openRouteServiceMatrixBaseUrl, transportationMethodEnum.getValue());

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", String.format("Bearer %s", openRouteServiceApiKey));
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<OpenRouteServiceDistanceMatrixPayload> entity = new HttpEntity<>(openRouteServiceDistanceMatrixPayload, headers);

        ResponseEntity<OpenRouteServiceDistanceMatrixResponse> response = restTemplate.exchange(
                openRouteServiceUrl,
                HttpMethod.POST,
                entity,
                OpenRouteServiceDistanceMatrixResponse.class
        );
        return response.getBody();

    }


    public OpenRouteServiceDirectionsResponse getOpenRouteServiceDirections(List<ItineraryElementRequest> itineraryElementRequests, TransportationMethodEnum transportationMethod) {
        try {

            OpenRouteServiceDirectionsPayload openRouteServiceDirectionsPayload = new OpenRouteServiceDirectionsPayload(itineraryElementRequests);
            String openRouteServiceUrl = String.format("%s/%s", openRouteServiceDirectionsBaseUrl, transportationMethod.getValue());

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", String.format("Bearer %s", openRouteServiceApiKey));
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            HttpEntity<OpenRouteServiceDirectionsPayload> entity = new HttpEntity<>(openRouteServiceDirectionsPayload, headers);

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


    public void createItinerariesFromPayload(Trip trip, List<ItineraryElementRequest> itineraryElementRequests, TransportationMethodEnum transportationMethod, Integer tripDay) throws Exception {
        if (itineraryElementRequests.size() > 1) {
            OpenRouteServiceDirectionsResponse response = getOpenRouteServiceDirections(itineraryElementRequests, transportationMethod);
            if (!response.routeFound())
                throw new Exception("Unable to find route between stops.");

            Itinerary itinerary = new Itinerary(trip, trip.getDateFrom().plusDays(tripDay), transportationMethod.getValue());


            LocalDateTime lastEndDateTime = initializeStartDateTime(itinerary);
            addItineraryElement(
                    itinerary,
                    itineraryElementRequests.get(0),
                    lastEndDateTime,
                    0
            );
            List<ItineraryElementRequest> modifiedItineraryElementRequests = itineraryElementRequests.subList(1, itineraryElementRequests.size());
            for (int i = 0; i < response.getSegments().size(); i++) {
                ItineraryElementRequest currentStop = modifiedItineraryElementRequests.get(i);
                int commuteDuration = (int) response.getSegments().get(i).getDuration() / 60;
                int totalDuration = commuteDuration + currentStop.getDuration();

                if (exceedsDayLimit(lastEndDateTime, totalDuration, itinerary.getDate())) {
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
            JSONArray decodedGeometry = GeometryDecoder.decodeGeometry(response.getGeometry(), false);
            LineString linestring = GeometryDecoder.convert(decodedGeometry);
            itinerary.setRouteGeometry(linestring);
            trip.addItinerary(itinerary);
        } else {
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

    private LocalDateTime initializeStartDateTime(Itinerary itinerary) {
        if (itinerary.getItineraryElements() != null && !itinerary.getItineraryElements().isEmpty()) {
            return itinerary.getItineraryElements()
                    .get(itinerary.getItineraryElements().size() - 1)
                    .getEndDate()
                    .toLocalDateTime();
        }
        return itinerary.getDate().atTime(LocalTime.of(8, 0));
    }

    private boolean exceedsDayLimit(LocalDateTime currentDateTime, int totalDuration, LocalDate itineraryDate) {
        LocalDateTime endOfDay = itineraryDate.atTime(LocalTime.of(20, 0));
        return currentDateTime.plusMinutes(totalDuration).isAfter(endOfDay);
    }


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
                stop.getDuration()
        );

        itinerary.addItineraryElement(element);
        return stopEndTime;
    }
}
