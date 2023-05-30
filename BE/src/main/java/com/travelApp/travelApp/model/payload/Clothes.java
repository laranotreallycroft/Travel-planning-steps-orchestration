package com.travelApp.travelApp.model.payload;

import java.util.List;

public class Clothes {
		private List<String> basics;
		private List<String> dressy;
		private List<String> outerwear;
		private List<String> casual;
		private List<String> footwear;
		private List<String> accessories;

		public Clothes() {

		}

		public Clothes(List<String> basics, List<String> dressy, List<String> outerwear, List<String> casual,
				List<String> footwear, List<String> accessories) {
			super();
			this.basics = basics;
			this.dressy = dressy;
			this.outerwear = outerwear;
			this.casual = casual;
			this.footwear = footwear;
			this.accessories = accessories;
		}

		public List<String> getBasics() {
			return basics;
		}

		public void setBasics(List<String> basics) {
			this.basics = basics;
		}

		public List<String> getDressy() {
			return dressy;
		}

		public void setDressy(List<String> dressy) {
			this.dressy = dressy;
		}

		public List<String> getOuterwear() {
			return outerwear;
		}

		public void setOuterwear(List<String> outerwear) {
			this.outerwear = outerwear;
		}

		public List<String> getCasual() {
			return casual;
		}

		public void setCasual(List<String> casual) {
			this.casual = casual;
		}

		public List<String> getFootwear() {
			return footwear;
		}

		public void setFootwear(List<String> footwear) {
			this.footwear = footwear;
		}

		public List<String> getAccessories() {
			return accessories;
		}

		public void setAccessories(List<String> accessories) {
			this.accessories = accessories;
		}

	}
