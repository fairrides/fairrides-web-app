"use client";

import { useState } from "react";

interface PostRideEarningsProps {
    earnedAmount: number;
    distance: number;
    duration: number;
    rideType: "Standard" | "Premium" | "SUV";
    tips?: number;
}

// Commission rates - NYCRide takes 0%!
const COMMISSION_RATES = {
    uber: 0.25,
    lyft: 0.23,
    nycride: 0.00 // Drivers keep 100%
};

export default function PostRideEarnings({
    earnedAmount,
    distance,
    duration,
    rideType,
    tips = 0,
}: PostRideEarningsProps) {
    const [showBreakdown, setShowBreakdown] = useState(false);

    // NYCRide: Driver earns $20, keeps $20 (0% commission)
    // Uber: For driver to earn $20, Uber charges rider $26.67 (driver gets 75%)
    // Lyft: For driver to earn $20, Lyft charges rider $25.97 (driver gets 77%)

    // What would the fare need to be on other platforms for driver to earn the same?
    const equivalentUberFare = earnedAmount / (1 - COMMISSION_RATES.uber);
    const equivalentLyftFare = earnedAmount / (1 - COMMISSION_RATES.lyft);

    // What would the driver earn if Uber/Lyft charged the same fare?
    const uberDriverWouldEarn = earnedAmount * (1 - COMMISSION_RATES.uber);
    const lyftDriverWouldEarn = earnedAmount * (1 - COMMISSION_RATES.lyft);

    const extraVsUber = earnedAmount - uberDriverWouldEarn;
    const extraVsLyft = earnedAmount - lyftDriverWouldEarn;
    const avgExtra = (extraVsUber + extraVsLyft) / 2;
    const percentMore = ((avgExtra / ((uberDriverWouldEarn + lyftDriverWouldEarn) / 2)) * 100).toFixed(0);

    const totalWithTips = earnedAmount + tips;

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-6 max-w-md mx-auto text-white">
            {/* Hero Earnings Display */}
            <div className="text-center mb-6">
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-6 py-2 mb-4">
                    <span className="font-bold text-sm text-gray-900">🚀 GREAT JOB</span>
                </div>

                <h2 className="text-5xl font-black mb-2">
                    ${totalWithTips.toFixed(2)}
                </h2>

                <p className="text-lg text-gray-300 font-semibold">
                    +${avgExtra.toFixed(2)} more than competitors
                </p>
                <p className="text-sm text-gray-400">
                    ({percentMore}% extra earnings)
                </p>
                <p className="text-xs text-green-400 mt-2 font-bold">
                    You kept 100% of the fare • 0% commission
                </p>
            </div>

            {/* Trophy Animation */}
            <div className="flex justify-center mb-6">
                <div className="relative">
                    <div className="text-6xl animate-bounce">🏆</div>
                    <div className="absolute -top-2 -right-2 text-2xl animate-ping">💫</div>
                    <div className="absolute -bottom-2 -left-2 text-2xl animate-ping" style={{ animationDelay: '0.3s' }}>💫</div>
                </div>
            </div>

            {/* Earnings Breakdown */}
            <div className="space-y-3 mb-4">
                {/* Base Fare */}
                <div className="flex items-center justify-between bg-white/10 backdrop-blur rounded-xl p-4">
                    <span className="text-gray-300">Base Fare</span>
                    <span className="text-2xl font-black">${earnedAmount.toFixed(2)}</span>
                </div>

                {/* Tips */}
                {tips > 0 && (
                    <div className="flex items-center justify-between bg-green-500/20 backdrop-blur rounded-xl p-4 border border-green-400/30">
                        <span className="text-green-200">Tips</span>
                        <span className="text-2xl font-black text-green-400">+${tips.toFixed(2)}</span>
                    </div>
                )}
            </div>

            {/* Comparison Toggle */}
            <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 backdrop-blur rounded-xl p-4 transition-colors mb-4"
            >
                <span className="font-semibold">
                    {showBreakdown ? "Hide" : "See"} competitor comparison
                </span>
                <svg
                    className={`w-5 h-5 transition-transform ${showBreakdown ? "rotate-180" : ""
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

            {/* Expanded Comparison */}
            {showBreakdown && (
                <div className="space-y-3 mb-4 animate-slideDown">
                    {/* NYCRide Winner */}
                    <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur rounded-xl p-4 border-2 border-green-400">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-900 font-bold text-xs">NYC</span>
                                </div>
                                <div>
                                    <span className="font-bold block">You (NYCRide)</span>
                                    <span className="text-xs text-green-300">0% commission</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl font-black text-green-400">
                                    ${earnedAmount.toFixed(2)}
                                </span>
                                <span className="text-green-400 text-2xl">✓</span>
                            </div>
                        </div>
                    </div>

                    {/* Uber Comparison */}
                    <div className="bg-white/5 backdrop-blur rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">UBER</span>
                                </div>
                                <div>
                                    <span className="text-gray-300 block">Uber driver</span>
                                    <span className="text-xs text-gray-500">25% commission</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-gray-400">
                                    ${uberDriverWouldEarn.toFixed(2)}
                                </div>
                                <div className="text-xs text-red-400">
                                    ${extraVsUber.toFixed(2)} less
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lyft Comparison */}
                    <div className="bg-white/5 backdrop-blur rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">LYFT</span>
                                </div>
                                <div>
                                    <span className="text-gray-300 block">Lyft driver</span>
                                    <span className="text-xs text-gray-500">23% commission</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-gray-400">
                                    ${lyftDriverWouldEarn.toFixed(2)}
                                </div>
                                <div className="text-xs text-red-400">
                                    ${extraVsLyft.toFixed(2)} less
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Trip Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-white/10 backdrop-blur rounded-xl">
                    <p className="text-xs text-gray-400">Distance</p>
                    <p className="font-bold">{distance.toFixed(1)} mi</p>
                </div>
                <div className="text-center p-3 bg-white/10 backdrop-blur rounded-xl">
                    <p className="text-xs text-gray-400">Time</p>
                    <p className="font-bold">{duration} min</p>
                </div>
                <div className="text-center p-3 bg-white/10 backdrop-blur rounded-xl">
                    <p className="text-xs text-gray-400">Type</p>
                    <p className="font-bold">{rideType}</p>
                </div>
            </div>

            {/* Encouragement */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-xl p-4 text-center">
                <p className="font-bold text-yellow-300">
                    💪 You keep 100% of every dollar!
                </p>
                <p className="text-xs text-yellow-200/80 mt-1">
                    On Uber/Lyft, 25% of this would be gone to commission
                </p>
            </div>
        </div>
    );
}
