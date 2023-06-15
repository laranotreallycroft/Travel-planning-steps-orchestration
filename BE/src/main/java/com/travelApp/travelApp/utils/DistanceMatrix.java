package com.travelApp.travelApp.utils;

import java.util.ArrayList;
import java.util.List;

import weka.clusterers.HierarchicalClusterer;
import weka.core.Attribute;
import weka.core.DenseInstance;
import weka.core.Instances;

public class DistanceMatrix {

	public static List<List<Integer>> getClusters(List<List<Double>> distanceMatrix, List<Double> durations)
			throws Exception {
		int numDataPoints = distanceMatrix.size();
		int numAttributes = distanceMatrix.get(0).size();

		// Create attributes
		ArrayList<Attribute> attributes = new ArrayList<>();
		for (int i = 0; i < numAttributes; i++) {
			Attribute attribute = new Attribute("attribute_" + i);
			attributes.add(attribute);
		}

		// Create Instances object
		Instances instances = new Instances("DistanceMatrixInstances", attributes, numDataPoints);

		// Add data points to instances
		for (List<Double> dataPoint : distanceMatrix) {
			DenseInstance instance = new DenseInstance(numAttributes);

			// Set attribute values
			for (int i = 0; i < numAttributes; i++) {
				instance.setValue(i, dataPoint.get(i));
			}

			// Add instance to instances
			instances.add(instance);
		}

		// Create the HierarchicalClusterer
		HierarchicalClusterer clusterer = new HierarchicalClusterer();

		// Build the clustering model
		clusterer.buildClusterer(instances);

		// Perform clustering based on distance matrix and durations
		List<List<Integer>> clusters = new ArrayList<>();
		for (int i = 0; i < instances.numInstances(); i++) {

			double maxDistance = 1800; // Set your desired maximum distance threshold here

			boolean isNewCluster = true;

			// Check if the instance can be added to any existing clusters
			for (int j = 0; j < clusters.size(); j++) {
				List<Integer> cluster = clusters.get(j);
				boolean canAddToCluster = true;

				// Check if the instance's distance to all points in the cluster is within the
				// maximum distance threshold
				for (int index : cluster) {
					double distance = distanceMatrix.get(i).get(index);
					if (distance > maxDistance) {
						canAddToCluster = false;
						break;
					}
				}

				// Add the instance to the cluster if it meets the distance threshold
				if (canAddToCluster) {
					cluster.add(i);
					isNewCluster = false;
					break;
				}
			}

			// Create a new cluster if the instance couldn't be added to any existing
			// clusters
			if (isNewCluster) {
				List<Integer> newCluster = new ArrayList<>();
				newCluster.add(i);
				clusters.add(newCluster);
			}
		}

		return clusters;
	}
}
