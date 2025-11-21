"use client";

import React from "react";
import { estimatePrice } from "../lib/pricing/engine";

export interface RideOption {
    id: string;
    name: string;
    description: string;
    multiplier: number;
    uberEquivalent: string;
}

const RIDE_OPTIONS: RideOption[] = [
    {
        id: "standard",
        name: "Standard",
        description: "Affordable rides",
        multiplier: 1.0,
        uberEquivalent: "UberX",
    },
    {
        id: "premium",
        name: "Premium",
        description: "Luxury rides",
        multiplier: 1.82,  // Black is ~1.82x UberX  
        uberEquivalent: "Uber Black",
    },
    {
        id: "xl",
        name: "XL",
        description: "Groups up to 6",
        multiplier: 1.37,  // XL is ~1.37x UberX
        uberEquivalent: "UberXL",
    },
];

interface RideOptionsProps {
    selectedOption: RideOption | null;
    onSelect: (option: RideOption) => void;
    distance?: number;
    duration?: number;
    pickup?: { latitude: number; longitude: number };
    dropoff?: { latitude: number; longitude: number };
}

export default function RideOptions({
    selectedOption,
    onSelect,
    distance,
    duration,
    pickup,
    dropoff,
}: RideOptionsProps) {

    const calculatePrice = (option: RideOption) => {
        if (!distance || !duration || !pickup || !dropoff) {
            return {
                price: (12 * option.multiplier).toFixed(2),
                competitorPrice: (15 * option.multiplier).toFixed(2),
                savings: (3 * option.multiplier).toFixed(2),
                savingsPercent: 20,
            };
        }

        const baseEstimate = estimatePrice(
            pickup.latitude,
            pickup.longitude,
            dropoff.latitude,
            dropoff.longitude,
            distance,
            duration
        );

        const price = baseEstimate.driverfirst_price * option.multiplier;
        const competitorPrice = baseEstimate.competitor_estimate * option.multiplier;
        const savings = competitorPrice - price;
        const savingsPercent = baseEstimate.discount_percent;

        return {
            price: price.toFixed(2),
            competitorPrice: competitorPrice.toFixed(2),
            savings: savings.toFixed(2),
            savingsPercent: Math.round(savingsPercent),
        };
    };

    return (
        <div className="flex flex-col space-y-3 mt-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-700">Choose a ride</h3>
                <span className="text-xs text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">
                    15-20% cheaper
                </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {RIDE_OPTIONS.map((option) => {
                    const pricing = calculatePrice(option);

                    return (
                        <button
                            key={option.id}
                            onClick={() => onSelect(option)}
                            className={`
                flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all
                ${selectedOption?.id === option.id
                                    ? "border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200"
                                    : "border-gray-200 hover:border-gray-400 hover:shadow-md"
                                }
              `}
                        >
                            <div className={`w-12 h-10 rounded-lg mb-2 flex items-center justify-center ${option.id === 'premium'
                                    ? 'bg-gradient-to-r from-gray-800 to-black'
                                    : option.id === 'xl'
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                                        : 'bg-gradient-to-r from-blue-400 to-purple-400'
                                }`}>
                                <span className="text-white text-xl">
                                    {option.id === 'premium' ? '🚙' : option.id === 'xl' ? '🚐' : '🚗'}
                                </span>
                            </div>

                            <span className="text-sm font-bold text-gray-900">
                                {option.name}
                            </span>

                            <span className="text-xs text-gray-500 mb-1">
                                ({option.uberEquivalent})
                            </span>

                            <span className="text-lg font-black text-blue-600">
                                ${pricing.price}
                            </span>

                            <span className="text-xs text-gray-400 line-through">
                                ${pricing.competitorPrice}
                            </span>

                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-1">
                                Save ${pricing.savings}
                            </span>
                        </button>
                    );
                })}
            </div>

            {distance && duration && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 border border-blue-200">
                    <div className="flex items-start space-x-2">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="text-sm font-semibold text-blue-900">
                                Smart Pricing Active
                            </p>
                            <p className="text-xs text-blue-700">
                                Prices calibrated from real Uber data - {Math.round(calculatePrice(RIDE_OPTIONS[0]).savingsPercent)}% cheaper
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
