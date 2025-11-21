import { PricingZone } from "./zones";

/**
 * Trip features used for pricing calculations
 */
export interface TripFeatures {
    // Route metrics
    distance_km: number;
    duration_min: number;

    // Location
    pickup_zone: PricingZone;
    dropoff_zone: PricingZone;
    pickup_coords: [number, number];
    dropoff_coords: [number, number];

    // Time
    timestamp: Date;
    hour_of_day: number;        // 0-23
    day_of_week: number;        // 0-6 (0=Sunday)
    is_weekend: boolean;
    is_peak_hour: boolean;      // 7-9am or 5-7pm
    is_night: boolean;          // 10pm-6am

    // Special flags
    is_manhattan: boolean;
    is_airport_trip: boolean;
    is_congestion_zone: boolean;

    // Dynamic factors
    demand_index: number;       // active_requests / active_drivers (1.0 = balanced)
    weather_flag?: "clear" | "rain" | "snow";
    event_flag?: boolean;       // major event happening
}

/**
 * Extract all pricing features from trip parameters
 */
export function extractTripFeatures(
    pickupCoords: [number, number],
    dropoffCoords: [number, number],
    distance_m: number,
    duration_s: number,
    pickupZone: PricingZone,
    dropoffZone: PricingZone,
    timestamp: Date = new Date(),
    demandIndex: number = 1.0
): TripFeatures {
    const hour = timestamp.getHours();
    const dayOfWeek = timestamp.getDay();

    // Peak hours: 7-9am, 5-7pm
    const isPeakHour = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19);

    // Night: 10pm-6am
    const isNight = hour >= 22 || hour < 6;

    // Weekend
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Manhattan check
    const isManhattan = pickupZone.borough === "Manhattan" ||
        dropoffZone.borough === "Manhattan";

    // Airport check
    const isAirport = pickupZone.tlc_zone === "JFK" ||
        pickupZone.tlc_zone === "LGA" ||
        dropoffZone.tlc_zone === "JFK" ||
        dropoffZone.tlc_zone === "LGA";

    // Congestion zone (simplified - south of 60th Street in Manhattan)
    const isCongestion = (pickupCoords[0] >= 40.700 && pickupCoords[0] <= 40.764) ||
        (dropoffCoords[0] >= 40.700 && dropoffCoords[0] <= 40.764);

    return {
        distance_km: distance_m / 1000,
        duration_min: duration_s / 60,
        pickup_zone: pickupZone,
        dropoff_zone: dropoffZone,
        pickup_coords: pickupCoords,
        dropoff_coords: dropoffCoords,
        timestamp,
        hour_of_day: hour,
        day_of_week: dayOfWeek,
        is_weekend: isWeekend,
        is_peak_hour: isPeakHour,
        is_night: isNight,
        is_manhattan: isManhattan,
        is_airport_trip: isAirport,
        is_congestion_zone: isCongestion,
        demand_index: demandIndex,
    };
}

/**
 * Simple demand estimation based on time patterns
 * In production, this would query live driver/rider counts
 */
export function estimateDemandIndex(timestamp: Date): number {
    const hour = timestamp.getHours();
    const dayOfWeek = timestamp.getDay();

    // Weekend nights (Friday/Saturday 10pm-2am)
    if ((dayOfWeek === 5 || dayOfWeek === 6) && (hour >= 22 || hour < 2)) {
        return 1.8; // High demand
    }

    // Weekday rush hours
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        if (hour >= 7 && hour <= 9) return 1.6;  // Morning rush
        if (hour >= 17 && hour <= 19) return 1.7; // Evening rush
    }

    // Lunch time
    if (hour >= 12 && hour <= 14) return 1.2;

    // Late night (2am-6am)
    if (hour >= 2 && hour < 6) return 0.7;

    // Normal
    return 1.0;
}
