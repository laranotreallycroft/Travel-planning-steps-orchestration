package com.odysseus.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.odysseus.model.weather.WeatherResponse;
import com.odysseus.model.weather.openWeatherMap.OneCallApiResponse;
import com.odysseus.model.weather.openWeatherMap.ReverseApiResponseItem;
import com.odysseus.model.weather.openWeatherMap.TimemachineApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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
    @Value("${weather.timemachine.baseUrl}")
    private String timemachineBaseUrl;

    public WeatherService(ParallelService parallelService) {
        this.parallelService = parallelService;
    }

    public WeatherResponse fetchCurrentWeather(double lat, double lon, String lang) {
        String oneCallUrl = String.format(
                "%s?lat=%f&lon=%f&lang=%s&exclude=minutely,hourly,alerts&units=metric&appid=%s",
                oneCallBaseUrl, lat, lon, lang, apiKey
        );
        String geoUrl = String.format(
                "%s?lat=%f&lon=%f&limit=1&appid=%s",
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

    public WeatherResponse fetchPastWeather(double lat, double lon, String lang, long dt) {

        String geoUrl = String.format(
                "%s?lat=%f&lon=%f&limit=1&appid=%s",
                reverseBaseUrl, lat, lon, apiKey
        );

        CompletableFuture[] weatherPastArray = new CompletableFuture[6];
        for (int i = 0; i < 6; i++) {
            long offset = i * 60 * 60 * 24;
            String timemachineUrl = String.format(
                    "%s?lat=%f&lon=%f&lang=%s&exclude=minutely,hourly,alerts&units=metric&dt=%s&appid=%s",
                    timemachineBaseUrl, lat, lon, lang, dt + offset, apiKey
            );
            CompletableFuture<TimemachineApiResponse> weatherFuture = parallelService.fetchData(timemachineUrl, TimemachineApiResponse.class);
            weatherPastArray[i] = weatherFuture;
        }

        CompletableFuture<ArrayList> reverseFuture = parallelService.fetchData(geoUrl, ArrayList.class);

        // Combine all weather futures
        CompletableFuture<Void> allWeatherFutures = CompletableFuture.allOf(weatherPastArray);

        return allWeatherFutures.thenCompose(ignored -> {
            // Extract results after all futures complete
            List<TimemachineApiResponse> weatherResults = new ArrayList<>();
            for (CompletableFuture<TimemachineApiResponse> future : weatherPastArray) {
                weatherResults.add(future.join());
            }


            return reverseFuture.thenApply(reverseData -> {
                if (reverseData == null || reverseData.isEmpty()) {
                    throw new RuntimeException("Unable to fetch location data");
                }

                WeatherResponse mappedResponse = new WeatherResponse();
                for (TimemachineApiResponse response : weatherResults) {
                    WeatherResponse.Weather weather = mapCurrentWeatherData(response.getData(), lang);
                    if (mappedResponse.getCurrent() == null)
                        mappedResponse.setCurrent(weather);
                    mappedResponse.addForecast(weather);
                }


                ObjectMapper mapper = new ObjectMapper();
                ReverseApiResponseItem responseItem = mapper.convertValue(reverseData.get(0), ReverseApiResponseItem.class);
                mappedResponse.setName(responseItem.getName());

                return mappedResponse;
            });
        }).join();


    }

    private WeatherResponse mapWeatherData(OneCallApiResponse data, String lang) {
        return new WeatherResponse(mapCurrentWeatherData(data.getCurrent(), lang), mapForecast(data.getDaily(), lang));
    }

    private WeatherResponse.Weather mapCurrentWeatherData(OneCallApiResponse.CurrentWeather currentWeather, String lang) {
        WeatherResponse.Weather mapped = new WeatherResponse.Weather();

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

    private List<WeatherResponse.Weather> mapForecast(List<OneCallApiResponse.DailyWeather> dailyWeatherList, String lang) {
        List<WeatherResponse.Weather> mappedForecast = new ArrayList<>();

        for (OneCallApiResponse.DailyWeather dailyWeather : dailyWeatherList) {
            WeatherResponse.Weather forecast = new WeatherResponse.Weather();
            forecast.setDate(formatDate(dailyWeather.getDt(), lang));

            if (dailyWeather.getWeather() != null && !dailyWeather.getWeather().isEmpty()) {
                OneCallApiResponse.WeatherDescription weather = dailyWeather.getWeather().get(0);
                forecast.setDescription(weather.getDescription());
                forecast.setIcon(weather.getIcon());

            }
            forecast.setTemperature(dailyWeather.getTemp().getMin(), dailyWeather.getTemp().getMax());
            forecast.setWind(dailyWeather.getWind_speed());
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

