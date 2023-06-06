package com.travelApp.travelApp.model.payload.packingList;

import java.util.List;

public class Miscellaneous {
		private List<String> documents;
		private List<String> bags;
		private List<String> miscellaneous;
		private List<String> technology;
		private List<String> work;

		public Miscellaneous() {

		}

		public Miscellaneous(List<String> documents, List<String> bags, List<String> miscellaneous,
				List<String> technology, List<String> work) {
			super();
			this.documents = documents;
			this.bags = bags;
			this.miscellaneous = miscellaneous;
			this.technology = technology;
			this.work = work;
		}

		public List<String> getDocuments() {
			return documents;
		}

		public void setDocuments(List<String> documents) {
			this.documents = documents;
		}

		public List<String> getBags() {
			return bags;
		}

		public void setBags(List<String> bags) {
			this.bags = bags;
		}

		public List<String> getMiscellaneous() {
			return miscellaneous;
		}

		public void setMiscellaneous(List<String> miscellaneous) {
			this.miscellaneous = miscellaneous;
		}

		public List<String> getTechnology() {
			return technology;
		}

		public void setTechnology(List<String> technology) {
			this.technology = technology;
		}

		public List<String> getWork() {
			return work;
		}

		public void setWork(List<String> work) {
			this.work = work;
		}

	}