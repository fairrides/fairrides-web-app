import { getPricingZone, PRICING_CONSTANTS } from "./zones";
import { extractTripFeatures, estimateDemandIndex } from "./features";
import {
    calculateDriverPay,
    estimateSurgeMultiplier,
    calculateDriverMinimum,
    calculateResidual
} from "./linear-model";

/**
 * Complete price estimate with breakdown
 */
export interface PriceEstimate {
    // Final prices
    competitor_estimate: number;
    driverfirst_price: number;

    // Savings
    discount_amount: number;
    discount_percent: number;

    // Breakdown
    base_fare: number;
    surge_multiplier: number;
    driver_minimum: number;

    // For transparency
    calculation_details: {
        driver_pay: number;
        platform_fee: number;
        surcharges: number;
        total_fare: number;
    };
}

/**
 * Main pricing engine
 * Estimates competitor price and calculates DriverFirst price
 */
export function calculatePrice(
    pickupCoords: [number, number],
    dropoffCoords: [number, number],
    distance_m: number,
    duration_s: number,
    timestamp: Date = new Date()
): PriceEstimate {

    // 1. Determine pricing zones
    const pickupZone = getPricingZone(pickupCoords[0], pickupCoords[1]);
    const dropoffZone = getPricingZone(dropoffCoords[0], dropoffCoords[1]);

    // 2. Estimate current demand
    const demandIndex = estimateDemandIndex(timestamp);

    // 3. Extract all features
    const features = extractTripFeatures(
        pickupCoords,
        dropoffCoords,
        distance_m,
        duration_s,
        pickupZone,
        dropoffZone,
        timestamp,
        demandIndex
    );

    // 4. Calculate Base Driver Pay (TLC Minimum)
    const baseDriverPay = calculateDriverPay(features);

    // 5. Estimate surge multiplier
    const surgeMultiplier = estimateSurgeMultiplier(features);

    // 6. Calculate Surged Driver Pay
    const surgedDriverPay = baseDriverPay * surgeMultiplier;

    // 7. Calculate Platform Fee (15% Margin)
    const platformFee = surgedDriverPay * PRICING_CONSTANTS.MARGIN_PERCENT;

    // 8. Calculate Surcharges
    let surcharges = 0;
    if (features.is_congestion_zone) surcharges += 2.75;
    surcharges += (surgedDriverPay + platformFee) * 0.03; // Black Car Fund approx

    // 9. Calculate Our Price (DriverFirst)
    let driverFirstPrice = surgedDriverPay + platformFee + surcharges;

    // Round to nearest $0.50
    driverFirstPrice = Math.round(driverFirstPrice * 2) / 2;

    // 10. Estimate Competitor Price
    // Competitors usually take ~25-30% commission + higher surges
    // If our price is (Pay * 1.15), theirs is roughly (Pay / 0.75)
    // This means our price is ~86% of theirs (1.15 / 1.33)
    // So Competitor = Our Price * 1.25 (approx 20% savings)
    const competitorEstimate = Math.round((driverFirstPrice * 1.25) * 100) / 100;

    // 11. Calculate final discount
    const discountAmount = competitorEstimate - driverFirstPrice;
    const discountPercent = (discountAmount / competitorEstimate) * 100;

    return {
        competitor_estimate: competitorEstimate,
        driverfirst_price: driverFirstPrice,
        discount_amount: Math.round(discountAmount * 100) / 100,
        discount_percent: Math.round(discountPercent * 10) / 10,
        base_fare: Math.round(baseDriverPay * 100) / 100,
        surge_multiplier: Math.round(surgeMultiplier * 100) / 100,
        driver_minimum: Math.round(surgedDriverPay * 100) / 100,
        calculation_details: {
            driver_pay: Math.round(surgedDriverPay * 100) / 100,
            platform_fee: Math.round(platformFee * 100) / 100,
            surcharges: Math.round(surcharges * 100) / 100,
            total_fare: driverFirstPrice,
        },
    };
}

/**
 * Quick price estimate (simplified interface)
 */
export function estimatePrice(
    pickupLat: number,
    pickupLng: number,
    dropoffLat: number,
    dropoffLng: number,
    distance_m: number,
    duration_s: number
): PriceEstimate {
    return calculatePrice(
        [pickupLat, pickupLng],
        [dropoffLat, dropoffLng],
        distance_m,
        duration_s
    );
}
