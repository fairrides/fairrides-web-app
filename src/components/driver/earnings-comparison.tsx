"use client";

import React from "react";

interface EarningsComparisonProps {
    nycRideEarnings: number;
    uberEarnings: number;
    lyftEarnings: number;
    showDetailed?: boolean;
}

export default function EarningsComparison({
    nycRideEarnings,
    uberEarnings,
    lyftEarnings,
    showDetailed = true,
}: EarningsComparisonProps) {
    const savingsVsUber = nycRideEarnings - uberEarnings;
    const savingsVsLyft = nycRideEarnings - lyftEarnings;
    const avgSavings = (savingsVsUber + savingsVsLyft) / 2;

    const percentVsUber = ((savingsVsUber / uberEarnings) * 100).toFixed(0);
    const percentVsLyft = ((savingsVsLyft / lyftEarnings) * 100).toFixed(0);

    if (!showDetailed) {
        // Compact version for ride offers
        return (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-3xl font-black text-green-700">
                            ${nycRideEarnings.toFixed(2)}
                        </div>
                        <div className="text-sm text-green-600 font-semibold">
                            Your Earnings (100%)
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-bold text-green-700">
                            +${avgSavings.toFixed(2)}
                        </div>
                        <div className="text-xs text-green-600">
                            vs competitors
                        </div>
                    </div>
                </div>
                <div className="mt-3 flex items-center space-x-2 text-xs">
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full font-semibold">
                        ✓ ${savingsVsUber.toFixed(2)} more than Uber
                    </span>
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full font-semibold">
                        ✓ ${savingsVsLyft.toFixed(2)} more than Lyft
                    </span>
                </div>
                <div className="mt-2 text-center">
                    <span className="text-xs text-gray-600 bg-yellow-100 px-2 py-1 rounded-full font-bold">
                        0% Commission • Keep 100%
                    </span>
                </div>
            </div>
        );
    }

    // Detailed version for post-trip
    const maxEarnings = Math.max(nycRideEarnings, uberEarnings, lyftEarnings);
    const nycRidePercent = (nycRideEarnings / maxEarnings) * 100;
    const uberPercent = (uberEarnings / maxEarnings) * 100;
    const lyftPercent = (lyftEarnings / maxEarnings) * 100;

    return (
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-gray-900">
                    💰 Earnings Comparison
                </h3>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                    You earned ${avgSavings.toFixed(2)} more!
                </div>
            </div>

            <div className="space-y-4">
                {/* NYCRide */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">NYC</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-900 block">NYCRide</span>
                                <span className="text-xs text-green-600">0% commission</span>
                            </div>
                        </div>
                        <span className="text-xl font-black text-green-600">
                            ${nycRideEarnings.toFixed(2)}
                        </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500"
                            style={{ width: `${nycRidePercent}%` }}
                        />
                    </div>
                </div>

                {/* Uber */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs">UBER</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700 block">Uber</span>
                                <span className="text-xs text-gray-500">25% commission</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-lg font-bold text-gray-600">
                                ${uberEarnings.toFixed(2)}
                            </span>
                            <span className="text-xs text-red-600 ml-2">
                                (-{percentVsUber}%)
                            </span>
                        </div>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gray-400 rounded-full transition-all duration-500"
                            style={{ width: `${uberPercent}%` }}
                        />
                    </div>
                </div>

                {/* Lyft */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs">LYFT</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700 block">Lyft</span>
                                <span className="text-xs text-gray-500">23% commission</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-lg font-bold text-gray-600">
                                ${lyftEarnings.toFixed(2)}
                            </span>
                            <span className="text-xs text-red-600 ml-2">
                                (-{percentVsLyft}%)
                            </span>
                        </div>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-pink-400 rounded-full transition-all duration-500"
                            style={{ width: `${lyftPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p className="font-bold text-green-900 text-sm">
                            With NYCRide, you keep every dollar you earn!
                        </p>
                        <p className="text-xs text-green-700 mt-1">
                            0% commission means you earned ${avgSavings.toFixed(2)} more on this ride. On Uber/Lyft, that would've gone to fees.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
