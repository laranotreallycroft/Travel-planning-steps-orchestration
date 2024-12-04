package com.odysseus.controller;

import com.odysseus.model.weather.WeatherRequest;
import com.odysseus.model.weather.WeatherResponse;
import com.odysseus.service.WeatherService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/weather")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentWeather(
            @ModelAttribute WeatherRequest weatherRequest) {
        try {
            WeatherResponse weatherResponse = weatherService.fetchCurrentWeather(weatherRequest.getLat(), weatherRequest.getLon(), weatherRequest.getLang());
            return ResponseEntity.ok(weatherResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
