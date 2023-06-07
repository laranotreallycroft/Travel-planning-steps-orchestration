package com.travelApp.travelApp.utils;

import org.json.JSONArray;
import org.json.JSONException;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LineString;

public class GeometryDecoder {

	public static JSONArray decodeGeometry(String encodedGeometry, boolean inclElevation) {

		JSONArray geometry = new JSONArray();
		int len = encodedGeometry.length();
		int index = 0;
		int lat = 0;
		int lng = 0;
		int ele = 0;

		while (index < len) {
			int result = 1;
			int shift = 0;
			int b;
			do {
				b = encodedGeometry.charAt(index++) - 63 - 1;
				result += b << shift;
				shift += 5;
			} while (b >= 0x1f);
			lat += (result & 1) != 0 ? ~(result >> 1) : (result >> 1);

			result = 1;
			shift = 0;
			do {
				b = encodedGeometry.charAt(index++) - 63 - 1;
				result += b << shift;
				shift += 5;
			} while (b >= 0x1f);
			lng += (result & 1) != 0 ? ~(result >> 1) : (result >> 1);

			if (inclElevation) {
				result = 1;
				shift = 0;
				do {
					b = encodedGeometry.charAt(index++) - 63 - 1;
					result += b << shift;
					shift += 5;
				} while (b >= 0x1f);
				ele += (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
			}

			JSONArray location = new JSONArray();
			try {
				location.put(lat / 1E5);
				location.put(lng / 1E5);
				if (inclElevation) {
					location.put((float) (ele / 100));
				}
				geometry.put(location);
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		return geometry;
	}
	
	public static LineString convert(JSONArray json) {
        try {
            Coordinate[] coordinates = new Coordinate[json.length()];
            for (int i = 0; i < json.length(); i++) {
                JSONArray coord = json.getJSONArray(i);
                double x = coord.getDouble(0);
                double y = coord.getDouble(1);
                coordinates[i] = new Coordinate(x, y);
            }
            GeometryFactory factory = new GeometryFactory();
            return factory.createLineString(coordinates);
        } catch (JSONException e) {
            throw new IllegalArgumentException("Invalid JSONArray", e);
        }
    }
}


