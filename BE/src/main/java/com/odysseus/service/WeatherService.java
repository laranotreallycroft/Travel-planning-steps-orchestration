package com.odysseus.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.odysseus.model.weather.WeatherResponse;
import com.odysseus.model.weather.openWeatherMap.OneCallApiResponse;
import com.odysseus.model.weather.openWeatherMap.ReverseApiResponseItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
public class WeatherService {

    private final ParallelService parallelService;

    @Value("${weather.apiKey}")
    private String apiKey;

    @Value("${weather.oneCall.baseUrl}")
    private String oneCallBaseUrl;
    @Value("${weather.reverse.baseUrl}")
    private String reverseBaseUrl;

    public WeatherService(ParallelService parallelService) {
        this.parallelService = parallelService;
    }

    public WeatherResponse fetchCurrentWeather(double lat, double lon, String lang) {
        String oneCallUrl = String.format(
                "%sonecall?lat=%f&lon=%f&lang=%s&exclude=minutely,hourly,alerts&units=metric&appid=%s",
                oneCallBaseUrl, lat, lon, lang, apiKey
        );
        String geoUrl = String.format(
                "%sreverse?lat=%f&lon=%f&limit=5&appid=%s",
                reverseBaseUrl, lat, lon, apiKey
        );

        CompletableFuture<OneCallApiResponse> weatherFuture = parallelService.fetchData(oneCallUrl, OneCallApiResponse.class);
        CompletableFuture<ArrayList> reverseFuture = parallelService.fetchData(geoUrl, ArrayList.class);


        // Combine the results
        return weatherFuture.thenCombine(reverseFuture, (weatherData, reverseData) -> {
            if (weatherData == null || reverseData == null || reverseData.isEmpty()) {
                throw new RuntimeException("Unable to fetch weather or location data");
            }

            WeatherResponse mappedResponse = mapWeatherData(weatherData, lang);

            // Extract the first reverse geocoding result
            ObjectMapper mapper = new ObjectMapper();
            ReverseApiResponseItem responseItem = mapper.convertValue(reverseData.get(0), ReverseApiResponseItem.class);
            mappedResponse.setName(responseItem.getName());

            return mappedResponse;
        }).join();


    }


    private WeatherResponse mapWeatherData(OneCallApiResponse data, String lang) {
        return new WeatherResponse(mapCurrentWeatherData(data.getCurrent(), lang), mapForecast(data.getDaily(), lang));
    }

    private WeatherResponse.CurrentWeather mapCurrentWeatherData(OneCallApiResponse.CurrentWeather currentWeather, String lang) {
        WeatherResponse.CurrentWeather mapped = new WeatherResponse.CurrentWeather();

        mapped.setDate(formatDate(currentWeather.getDt(), lang));
        if (currentWeather.getWeather() != null && !currentWeather.getWeather().isEmpty()) {
            OneCallApiResponse.WeatherDescription weather = currentWeather.getWeather().get(0);
            mapped.setDescription(weather.getDescription());
            mapped.setIcon(weather.getIcon());
        }
        mapped.setTemperature(currentWeather.getTemp());
        mapped.setWind(currentWeather.getWind_speed());
        mapped.setHumidity(currentWeather.getHumidity());
        return mapped;
    }

    private List<WeatherResponse.DailyForecast> mapForecast(List<OneCallApiResponse.DailyWeather> dailyWeatherList, String lang) {
        List<WeatherResponse.DailyForecast> mappedForecast = new ArrayList<>();

        for (OneCallApiResponse.DailyWeather dailyWeather : dailyWeatherList) {
            WeatherResponse.DailyForecast forecast = new WeatherResponse.DailyForecast();
            forecast.setDate(formatDate(dailyWeather.getDt(), lang));

            if (dailyWeather.getWeather() != null && !dailyWeather.getWeather().isEmpty()) {
                OneCallApiResponse.WeatherDescription weather = dailyWeather.getWeather().get(0);
                forecast.setDescription(weather.getDescription());
                forecast.setIcon(weather.getIcon());

            }
            forecast.setTemperature(dailyWeather.getTemp().getMin(), dailyWeather.getTemp().getMax());
            forecast.setWind(String.valueOf(dailyWeather.getWind_speed()));
            forecast.setHumidity(dailyWeather.getHumidity());
            forecast.setKey(UUID.randomUUID().toString());
            mappedForecast.add(forecast);
        }
        return mappedForecast;
    }

    // Format the date based on the timestamp and language
    private static String formatDate(long timestamp, String lang) {
        Locale locale = lang != null && !lang.equals("en") ? Locale.forLanguageTag(lang.replace("_", "-")) : Locale.ENGLISH;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE d MMMM", locale);
        LocalDateTime date = LocalDateTime.ofInstant(Instant.ofEpochSecond(timestamp), ZoneId.systemDefault());
        return date.format(formatter);
    }
}

