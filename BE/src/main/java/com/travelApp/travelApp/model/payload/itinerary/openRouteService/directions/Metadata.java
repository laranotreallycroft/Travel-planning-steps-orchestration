package com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions;

public class Metadata {
	private String attribution;
	private String service;
	private long timestamp;
	private Query query;
	private Engine engine;

	public Metadata() {

	}

	public Metadata(String attribution, String service, long timestamp, Query query, Engine engine) {
		super();
		this.attribution = attribution;
		this.service = service;
		this.timestamp = timestamp;
		this.query = query;
		this.engine = engine;
	}

	public String getAttribution() {
		return attribution;
	}

	public void setAttribution(String attribution) {
		this.attribution = attribution;
	}

	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
	}

	public long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}

	public Query getQuery() {
		return query;
	}

	public void setQuery(Query query) {
		this.query = query;
	}

	public Engine getEngine() {
		return engine;
	}

	public void setEngine(Engine engine) {
		this.engine = engine;
	}

}
