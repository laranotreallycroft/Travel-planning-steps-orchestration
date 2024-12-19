package com.odysseus.service;

import com.odysseus.model.location.Location;
import com.odysseus.model.location.LocationRequest;
import com.odysseus.repository.LocationRepository;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public Location getLocation(LocationRequest locationRequest) {
        Location location = locationRepository.findById(locationRequest.getId()).orElse(null);
        if (location == null) {
            location = new Location(locationRequest.getId(), locationRequest.getLabel(), locationRequest.getCoordinates().toPoint());
            locationRepository.save(location);

        }
        return location;
    }
}
