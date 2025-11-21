const MAPBOX_TOKEN = "pk.eyJ1IjoibWZhcnVxMzAiLCJhIjoiY21pNmRoZHV0MmJidTJxb2djcnZzNnR3byJ9.1HrC5RqD7bqt76KRT2-1XA";

export interface Place {
    id: string;
    name: string;
    longitude: number;
    latitude: number;
}

export async function searchPlaces(query: string): Promise<Place[]> {
    if (!query) return [];

    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
    )}.json?access_token=${MAPBOX_TOKEN}&bbox=-74.25909,40.477399,-73.700272,40.917577&limit=5`; // NYC BBox

    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        return data.features.map((feature: any) => ({
            id: feature.id,
            name: feature.place_name,
            longitude: feature.center[0],
            latitude: feature.center[1],
        }));
    } catch (error) {
        console.error("Error searching places:", error);
        return [];
    }
}

export async function getRoute(
    start: [number, number],
    end: [number, number]
): Promise<{ geometry: any; distance: number; duration: number } | null> {
    const endpoint = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${MAPBOX_TOKEN}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const route = data.routes[0];

        if (!route) return null;

        return {
            geometry: route.geometry,
            distance: route.distance, // in meters
            duration: route.duration, // in seconds
        };
    } catch (error) {
        console.error("Error fetching route:", error);
        throw new Error("Failed to connect to navigation service.");
    }
}
export async function reverseGeocode(lng: number, lat: number): Promise<Place | null> {
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const feature = data.features[0];

        if (!feature) return null;

        return {
            id: feature.id,
            name: feature.place_name,
            longitude: feature.center[0],
            latitude: feature.center[1],
        };
    } catch (error) {
        console.error("Error reverse geocoding:", error);
        return null;
    }
}
