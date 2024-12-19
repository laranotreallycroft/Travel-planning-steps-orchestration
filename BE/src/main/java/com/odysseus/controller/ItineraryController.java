package com.odysseus.controller;

import com.odysseus.model.itinerary.ItineraryCreateRequest;
import com.odysseus.model.trip.Trip;
import com.odysseus.repository.ItineraryElementRepository;
import com.odysseus.repository.TripRepository;
import com.odysseus.service.ItineraryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/itineraries")
public class ItineraryController {
    private final TripRepository tripRepository;
    private final ItineraryElementRepository itineraryElementRepository;
    private final ItineraryService itineraryService;


    public ItineraryController(TripRepository tripRepository, ItineraryElementRepository itineraryElementRepository, ItineraryService itineraryService) {
        this.tripRepository = tripRepository;
        this.itineraryElementRepository = itineraryElementRepository;
        this.itineraryService = itineraryService;
    }

    /**
     * Creates a new itinerary based on the provided itinerary create request.
     *
     * @param itineraryCreateRequest the details of the itinerary to be created.
     * @return a ResponseEntity with the status of the operation and the created trip if successful.
     */
    @PostMapping
    public ResponseEntity<?> createItinerary(@RequestBody ItineraryCreateRequest itineraryCreateRequest) {
        try {
            Trip trip = itineraryService.createItinerary(itineraryCreateRequest);
            if (trip == null) {
                return ResponseEntity.badRequest().body("Trip with the specified ID does not exist.");
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(trip);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    /**
     * Updates an existing itinerary based on the provided itinerary update request.
     *
     * @param itineraryUpdateRequest the details of the itinerary to be updated.
     * @return a ResponseEntity with the status of the operation and the updated trip if successful.
     */
    @PutMapping
    public ResponseEntity<?> updateItinerary(@RequestBody ItineraryCreateRequest itineraryUpdateRequest) {
        try {
            Trip trip = itineraryService.createItinerary(itineraryUpdateRequest);
            if (trip == null) {
                return ResponseEntity.badRequest().body("Trip with the specified ID does not exist.");
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(trip);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
/*
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
                } else if (endDate.after(elementCommuteStartDate)
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

    }*/

   /* public void updateItinerarySchedule(Trip trip, Itinerary itinerary) throws Exception {

        RouteOptions routeOptions = new RouteOptions(false, itinerary.getTransportationMethod());
        List<ItineraryElementRequest> itineraryLocations = new ArrayList<>();
        /*for (ItineraryElement itineraryElement : itinerary.getItineraryElements()) {
            itineraryLocations.add(new ItineraryElementRequest(itineraryElement.getId().toString(),
                    itineraryElement.getLocation(),
                    itineraryElement.getLabel(), itineraryElement.getDuration()));
        }*/
     /*   itinerary.getItineraryElements().clear();
        if (itineraryLocations.size() > 0) {
            OpenRouteServiceDirectionsResponse response = getOpenRouteServiceDirections(itineraryLocations,
                    trip.getLocation().getCoordinates(), routeOptions);
            if (!response.routeFound())
                throw new Exception("Unable to find route between stops.");

            for (int i = 0; i < response.getSegments().size() - 1; i++) {
                LocalDateTime lastItineraryElementEndDateTime;
                if (itinerary.getItineraryElements() != null && itinerary.getItineraryElements().size() > 0)
                    lastItineraryElementEndDateTime = itinerary.getItineraryElements()
                            .get(itinerary.getItineraryElements().size() - 1).getEndDate().toLocalDateTime();
                else
                    lastItineraryElementEndDateTime = itinerary.getDate().atTime(LocalTime.of(8, 0));

                ItineraryElementRequest originalItineraryLocation = itineraryLocations.get(i);
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
                        originalItineraryLocation.getCoordinates().toPoint(), Timestamp.valueOf(lastItineraryElementEndDateTime),
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

    }*/
}
