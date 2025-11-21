"use client";

import { useState } from "react";

interface RideSavingsCelebrationProps {
    actualFare: number;
    distance: number;
    duration: number;
    rideType: "Standard" | "Premium" | "SUV";
}

// Commission rates - NYCRide takes 0%!
const COMMISSION_RATES = {
    uber: 0.25,   // Uber takes 25%
    lyft: 0.23,   // Lyft takes 23%
    nycride: 0.00 // NYCRide takes 0% - drivers keep 100%
};

export default function RideSavingsCelebration({
    actualFare,
    distance,
    duration,
    rideType,
}: RideSavingsCelebrationProps) {
    const [showBreakdown, setShowBreakdown] = useState(false);

    // NYCRide business model: 0% commission, flat subscription fee
    // So if market rate for this ride is $20:
    // - Uber charges $20, driver gets $15 (25% commission)
    // - Lyft charges $20, driver gets $15.40 (23% commission)
    // - NYCRide charges LESS (say $17), driver STILL gets $17 (0% commission)

    // For this calculation, we'll assume NYCRide undercuts Uber/Lyft by 20%
    // while STILL paying drivers more
    const uberEstimate = actualFare / 0.80; // If NYC fare is $20, Uber would be $25
    const lyftEstimate = actualFare / 0.80; // Same market positioning

    const savingsVsUber = uberEstimate - actualFare;
    const savingsVsLyft = lyftEstimate - actualFare;
    const avgSavings = (savingsVsUber + savingsVsLyft) / 2;
    const savingsPercent = ((avgSavings / ((uberEstimate + lyftEstimate) / 2)) * 100).toFixed(0);

    return (
        <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md mx-auto">
            {/* Hero Savings Display */}
            <div className="text-center mb-6">
                <div className="inline-block bg-gradient-to-r from-green-400 to-emerald-500 rounded-full px-6 py-2 mb-4">
                    <span className="text-white font-bold text-sm">🎉 SMART CHOICE</span>
                </div>

                <h2 className="text-4xl font-black text-gray-900 mb-2">
                    You Saved ${avgSavings.toFixed(2)}!
                </h2>

                <p className="text-lg text-gray-600 font-semibold">
                    {savingsPercent}% less than Uber/Lyft
                </p>
            </div>

            {/* Sparkle Effect */}
            <div className="flex justify-center mb-6">
                <div className="relative">
                    <div className="text-6xl animate-bounce">💰</div>
                    <div className="absolute -top-2 -right-2 text-2xl animate-ping">✨</div>
                    <div className="absolute -bottom-2 -left-2 text-2xl animate-ping" style={{ animationDelay: '0.3s' }}>✨</div>
                </div>
            </div>

            {/* Your Fare */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-4">
                <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-semibold">Your Fare</span>
                    <span className="text-3xl font-black text-blue-600">
                        ${actualFare.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Comparison Breakdown Toggle */}
            <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-colors mb-4"
            >
                <span className="text-gray-700 font-semibold">
                    {showBreakdown ? "Hide" : "See"} breakdown
                </span>
                <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${showBreakdown ? "rotate-180" : ""
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* Expanded Breakdown */}
            {showBreakdown && (
                <div className="space-y-3 mb-4 animate-slideDown">
                    {/* Uber Comparison */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs">UBER</span>
                            </div>
                            <span className="font-semibold text-gray-700">Uber estimate</span>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-bold text-gray-400 line-through">
                                ${uberEstimate.toFixed(2)}
                            </div>
                            <div className="text-xs text-red-600">
                                +${savingsVsUber.toFixed(2)}
                            </div>
                        </div>
                    </div>

                    {/* Lyft Comparison */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs">LYFT</span>
                            </div>
                            <span className="font-semibold text-gray-700">Lyft estimate</span>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-bold text-gray-400 line-through">
                                ${lyftEstimate.toFixed(2)}
                            </div>
                            <div className="text-xs text-red-600">
                                +${savingsVsLyft.toFixed(2)}
                            </div>
                        </div>
                    </div>

                    {/* NYCRide Winner */}
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-400">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs">NYC</span>
                            </div>
                            <span className="font-bold text-gray-900">NYCRide</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl font-black text-green-600">
                                ${actualFare.toFixed(2)}
                            </span>
                            <span className="text-green-600">✓</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Distance</p>
                    <p className="font-bold text-gray-900">{distance.toFixed(1)} mi</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="font-bold text-gray-900">{duration} min</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="font-bold text-gray-900">{rideType}</p>
                </div>
            </div>

            {/* Encouragement Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <p className="text-sm font-semibold text-blue-900">
                    🌟 You're a smart saver!
                </p>
                <p className="text-xs text-blue-700 mt-1">
                    Keep riding to see your total savings grow
                </p>
            </div>
        </div>
    );
}
