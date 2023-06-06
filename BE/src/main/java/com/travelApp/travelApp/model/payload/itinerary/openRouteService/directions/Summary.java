package com.travelApp.travelApp.model.payload.itinerary.openRouteService.directions;
public class Summary {
		private double distance;
		private double duration;

		public Summary() {

		}

		public Summary(double distance, double duration) {
			super();
			this.distance = distance;
			this.duration = duration;
		}

		public double getDistance() {
			return distance;
		}

		public void setDistance(double distance) {
			this.distance = distance;
		}

		public double getDuration() {
			return duration;
		}

		public void setDuration(double duration) {
			this.duration = duration;
		}

	}