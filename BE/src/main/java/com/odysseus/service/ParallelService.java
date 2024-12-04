package com.odysseus.service;


import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@Service
public class ParallelService {

    private RestTemplate restTemplate;
    private Executor executor;

    public ParallelService() {
        this.restTemplate = new RestTemplate();
        this.executor = Executors.newFixedThreadPool(10);
    }


    // Fetches data from a given URL asynchronously
    public <T> CompletableFuture<T> fetchData(String url, Class<T> responseType) {
        return CompletableFuture.supplyAsync(() -> restTemplate.getForObject(url, responseType), executor);
    }

}