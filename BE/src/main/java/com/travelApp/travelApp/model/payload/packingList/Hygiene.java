package com.travelApp.travelApp.model.payload.packingList;

import java.util.List;

public class Hygiene {
		private List<String> hygiene;

		public Hygiene() {

		}

		public Hygiene(List<String> hygiene) {
			super();
			this.hygiene = hygiene;
		}

		public List<String> getHygiene() {
			return hygiene;
		}

		public void setHygiene(List<String> hygiene) {
			this.hygiene = hygiene;
		}

	}
