// NYC Pricing Zones - TLC Minimum Pay Standards (Effective Aug 1, 2025)
// Based on user request to strictly follow TLC pay rules + 15% margin

export interface PricingZone {
    id: string;
    name: string;
    borough: "Manhattan" | "Brooklyn" | "Queens" | "Bronx" | "Staten Island";
    tlc_zone?: string;
}

// TLC Driver Pay Rates (Effective Aug 1, 2025)
// Source: NYC TLC Driver Pay Calculator
export const TLC_RATES = {
    NON_WAV: {
        PER_MILE: 1.241,
        PER_MINUTE: 0.659,
    },
    WAV: {
        PER_MILE: 1.549,
        PER_MINUTE: 0.659,
    },
    OUT_OF_TOWN: {
        PER_MILE: 1.700,
        PER_MINUTE: 0.701,
    }
};

export const PRICING_CONSTANTS = {
    MARGIN_PERCENT: 0.15, // 15% markup on top of driver pay
    MINIMUM_DRIVER_PAY: 7.68, // Based on 3mi/6min example
};

// Zones definitions (simplified as rates are now uniform city-wide for standard trips)
export const PRICING_ZONES: PricingZone[] = [
    {
        id: "manhattan_core",
        name: "Manhattan Core",
        borough: "Manhattan",
    },
    {
        id: "manhattan_uptown",
        name: "Upper Manhattan",
        borough: "Manhattan",
    },
    {
        id: "brooklyn",
        name: "Brooklyn",
        borough: "Brooklyn",
    },
    {
        id: "queens",
        name: "Queens",
        borough: "Queens",
    },
    {
        id: "bronx",
        name: "Bronx",
        borough: "Bronx",
    },
    {
        id: "jfk_airport",
        name: "JFK Airport",
        borough: "Queens",
        tlc_zone: "JFK",
    },
    {
        id: "lga_airport",
        name: "LaGuardia Airport",
        borough: "Queens",
        tlc_zone: "LGA",
    },
];

export function getPricingZone(lat: number, lng: number): PricingZone {
    // Manhattan
    if (lat >= 40.700 && lat <= 40.8 && lng >= -74.02 && lng <= -73.93) {
        if (lat >= 40.76) {
            return PRICING_ZONES.find((z) => z.id === "manhattan_uptown")!;
        }
        return PRICING_ZONES.find((z) => z.id === "manhattan_core")!;
    }

    // JFK
    if (lat >= 40.63 && lat <= 40.65 && lng >= -73.80 && lng <= -73.76) {
        return PRICING_ZONES.find((z) => z.id === "jfk_airport")!;
    }

    // LaGuardia
    if (lat >= 40.76 && lat <= 40.78 && lng >= -73.88 && lng <= -73.86) {
        return PRICING_ZONES.find((z) => z.id === "lga_airport")!;
    }

    // Brooklyn
    if (lat >= 40.57 && lat <= 40.74 && lng >= -74.05 && lng <= -73.83) {
        return PRICING_ZONES.find((z) => z.id === "brooklyn")!;
    }

    // Queens
    if (lat >= 40.54 && lat <= 40.80 && lng >= -73.96 && lng <= -73.70) {
        return PRICING_ZONES.find((z) => z.id === "queens")!;
    }

    // Bronx
    if (lat >= 40.79 && lat <= 40.92 && lng >= -73.93 && lng <= -73.75) {
        return PRICING_ZONES.find((z) => z.id === "bronx")!;
    }

    return PRICING_ZONES.find((z) => z.id === "queens")!;
}

export function isAirportTrip(pickupZone: PricingZone, dropoffZone: PricingZone): boolean {
    return !!(pickupZone.tlc_zone || dropoffZone.tlc_zone);
}
