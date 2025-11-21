import { TripFeatures } from "./features";
import { TLC_RATES, PRICING_CONSTANTS } from "./zones";

/**
 * Calculate Driver Pay based on TLC Minimum Pay Standards
 * Effective Aug 1, 2025
 */
export function calculateDriverPay(features: TripFeatures): number {
    const distanceMiles = features.distance_km * 0.621371;
    const durationMinutes = features.duration_min;

    let ratePerMile = TLC_RATES.NON_WAV.PER_MILE;
    let ratePerMinute = TLC_RATES.NON_WAV.PER_MINUTE;

    // Out of town rates (simplified check)
    if (!features.is_manhattan && !features.is_congestion_zone && features.distance_km > 20) {
        ratePerMile = TLC_RATES.OUT_OF_TOWN.PER_MILE;
        ratePerMinute = TLC_RATES.OUT_OF_TOWN.PER_MINUTE;
    }

    const driverPay = (distanceMiles * ratePerMile) + (durationMinutes * ratePerMinute);

    return Math.max(PRICING_CONSTANTS.MINIMUM_DRIVER_PAY, driverPay);
}

/**
 * Calculate Final Fare with 15% Margin
 */
export function calculateLinearFare(features: TripFeatures): number {
    // 1. Calculate Base Driver Pay (TLC Minimum)
    const driverPay = calculateDriverPay(features);

    // 2. Add 15% Platform Margin
    const baseFare = driverPay * (1 + PRICING_CONSTANTS.MARGIN_PERCENT);

    // 3. Add Surcharges (Pass-throughs)
    let finalFare = baseFare;

    // NYC Congestion Surcharge ($2.75) - only for Manhattan south of 96th
    if (features.is_congestion_zone) {
        finalFare += 2.75;
    }

    // Black Car Fund (2.5% - approx)
    finalFare += (baseFare * 0.03);

    return finalFare;
}

export function estimateSurgeMultiplier(features: TripFeatures): number {
    // Simplified surge for now as we are sticking to TLC baseline
    // We can add small multipliers for extreme conditions
    let surge = 1.0;

    if (features.demand_index > 1.5) surge = 1.1;
    if (features.weather_flag === "snow") surge = 1.2;

    return surge;
}

export function calculateDriverMinimum(features: TripFeatures): number {
    return calculateDriverPay(features);
}

export function calculateResidual(features: TripFeatures): number {
    return 0; // No residual needed with strict formula
}
