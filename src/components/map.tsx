"use client";

import { useEffect, useRef } from "react";
import mapboxgl, { Map as MapboxMap, NavigationControl } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "pk.eyJ1IjoibWZhcnVxMzAiLCJhIjoiY21pNmRoZHV0MmJidTJxb2djcnZzNnR3byJ9.1HrC5RqD7bqt76KRT2-1XA";
mapboxgl.accessToken = MAPBOX_TOKEN;


interface MapComponentProps {
  pickupCoordinates?: [number, number];
  dropoffCoordinates?: [number, number];
  driverCoordinates?: [number, number];
  routeGeoJSON?: any;
  onMapClick?: (lng: number, lat: number) => void;
}

export default function MapComponent({
  pickupCoordinates,
  dropoffCoordinates,
  driverCoordinates,
  routeGeoJSON,
  onMapClick,
}: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const pickupMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const dropoffMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const driverMarkerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Create the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-73.935242, 40.73061], // NYC default
      zoom: 11,
    });

    // Navigation controls (zoom / rotate)
    mapRef.current.addControl(new NavigationControl(), "top-right");

    // Map Click Listener
    mapRef.current.on("click", (e) => {
      if (onMapClick) {
        onMapClick(e.lngLat.lng, e.lngLat.lat);
      }
    });

    // Cleanup on unmount
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [onMapClick]);

  // Handle markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Pickup Marker
    if (pickupCoordinates) {
      if (!pickupMarkerRef.current) {
        pickupMarkerRef.current = new mapboxgl.Marker({ color: "black" })
          .setLngLat(pickupCoordinates)
          .addTo(mapRef.current);
      } else {
        pickupMarkerRef.current.setLngLat(pickupCoordinates);
      }
    } else if (pickupMarkerRef.current) {
      pickupMarkerRef.current.remove();
      pickupMarkerRef.current = null;
    }

    // Dropoff Marker
    if (dropoffCoordinates) {
      if (!dropoffMarkerRef.current) {
        dropoffMarkerRef.current = new mapboxgl.Marker({ color: "red" })
          .setLngLat(dropoffCoordinates)
          .addTo(mapRef.current);
      } else {
        dropoffMarkerRef.current.setLngLat(dropoffCoordinates);
      }
    } else if (dropoffMarkerRef.current) {
      dropoffMarkerRef.current.remove();
      dropoffMarkerRef.current = null;
    }

    // Driver Marker
    if (driverCoordinates) {
      if (!driverMarkerRef.current) {
        const el = document.createElement("div");
        el.className = "driver-marker";
        el.style.fontSize = "24px";
        el.innerHTML = "🚖"; // Taxi emoji as car icon

        driverMarkerRef.current = new mapboxgl.Marker(el)
          .setLngLat(driverCoordinates)
          .addTo(mapRef.current);
      } else {
        driverMarkerRef.current.setLngLat(driverCoordinates);
      }
    } else if (driverMarkerRef.current) {
      driverMarkerRef.current.remove();
      driverMarkerRef.current = null;
    }
  }, [pickupCoordinates, dropoffCoordinates, driverCoordinates]);


  // Handle route
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    if (map.getSource("route")) {
      (map.getSource("route") as mapboxgl.GeoJSONSource).setData(
        routeGeoJSON || { type: "FeatureCollection", features: [] }
      );
    } else if (routeGeoJSON) {
      map.on("load", () => {
        map.addSource("route", {
          type: "geojson",
          data: routeGeoJSON,
        });

        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#000000",
            "line-width": 4,
          },
        });
      });
    }

    // Fit bounds if route exists
    if (routeGeoJSON && pickupCoordinates && dropoffCoordinates) {
      const bounds = new mapboxgl.LngLatBounds()
        .extend(pickupCoordinates)
        .extend(dropoffCoordinates);

      map.fitBounds(bounds, {
        padding: 100,
      });
    }
  }, [routeGeoJSON, pickupCoordinates, dropoffCoordinates]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full"
      style={{ width: "100%", height: "100%" }}
    />
  );
}


;
