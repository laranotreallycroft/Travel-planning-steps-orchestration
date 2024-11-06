package com.odysseus.utils;

import java.util.ArrayList;
import java.util.List;

public class DistanceMatrix {

    public static List<List<Integer>> getClusters(List<List<Double>> distanceMatrix, List<Double> durations)
            throws Exception {

        // Perform clustering based on distance matrix and durations
        List<List<Integer>> clusters = new ArrayList<>();
        for (int i = 0; i < distanceMatrix.size(); i++) {
            double maxDistance = 1800; // Set your desired maximum distance threshold
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
