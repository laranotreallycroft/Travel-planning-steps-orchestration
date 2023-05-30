package com.travelApp.travelApp.model.payload;

import java.util.List;

public class Basics {
		private List<String> travelAids;
		private List<String> funds;
		private List<String> travelInfo;

		public Basics() {

		}

		public Basics(List<String> travelAids, List<String> funds, List<String> travelInfo) {
			super();
			this.travelAids = travelAids;
			this.funds = funds;
			this.travelInfo = travelInfo;
		}

		public List<String> getTravelAids() {
			return travelAids;
		}

		public void setTravelAids(List<String> travelAids) {
			this.travelAids = travelAids;
		}

		public List<String> getFunds() {
			return funds;
		}

		public void setFunds(List<String> funds) {
			this.funds = funds;
		}

		public List<String> getTravelInfo() {
			return travelInfo;
		}

		public void setTravelInfo(List<String> travelInfo) {
			this.travelInfo = travelInfo;
		}

	}
