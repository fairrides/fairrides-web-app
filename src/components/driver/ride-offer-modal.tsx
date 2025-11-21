"use client";

import React, { useState, useEffect } from "react";
import EarningsComparison from "./earnings-comparison";

interface RideOffer {
    id: string;
    pickupLocation: string;
    dropoffLocation: string;
    distance: number;
    duration: number;
    fareNYCRide: number;
    fareUber: number;
    fareLyft: number;
    rideType: "Standard" | "Premium" | "SUV";
}

interface RideOfferModalProps {
    offer: RideOffer;
    onAccept: () => void;
    onDecline: () => void;
}

export default function RideOfferModal({
    offer,
    onAccept,
    onDecline,
}: RideOfferModalProps) {
    const [timeLeft, setTimeLeft] = useState(15);

    useEffect(() => {
        if (timeLeft === 0) {
            onDecline();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onDecline]);

    const progress = (timeLeft / 15) * 100;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-slideUp">
                {/* Countdown Timer */}
                <div className="relative h-2 bg-gray-200">
                    <div
                        className={`h-full transition-all duration-1000 ${timeLeft <= 5 ? "bg-red-500" : "bg-blue-500"
                            }`}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-black text-gray-900">New Ride Request</h2>
                        <div className={`text-4xl font-black ${timeLeft <= 5 ? "text-red-600 animate-pulse" : "text-blue-600"}`}>
                            {timeLeft}s
                        </div>
                    </div>

                    {/* Ride Details */}
                    <div className="space-y-3 mb-4">
                        <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                                <span className="text-white font-bold text-sm">P</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500">Pickup</p>
                                <p className="font-semibold text-gray-900">{offer.pickupLocation}</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mr-3 flex-shrink-0">
                                <span className="text-white font-bold text-sm">D</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500">Dropoff</p>
                                <p className="font-semibold text-gray-900">{offer.dropoffLocation}</p>
                            </div>
                        </div>
                    </div>

                    {/* Trip Info */}
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3 mb-4">
                        <div className="text-center flex-1">
                            <p className="text-xs text-gray-500">Distance</p>
                            <p className="font-bold text-gray-900">{offer.distance.toFixed(1)} mi</p>
                        </div>
                        <div className="w-px h-8 bg-gray-300" />
                        <div className="text-center flex-1">
                            <p className="text-xs text-gray-500">Time</p>
                            <p className="font-bold text-gray-900">{offer.duration} min</p>
                        </div>
                        <div className="w-px h-8 bg-gray-300" />
                        <div className="text-center flex-1">
                            <p className="text-xs text-gray-500">Type</p>
                            <p className="font-bold text-gray-900">{offer.rideType}</p>
                        </div>
                    </div>

                    {/* Earnings Comparison - THE KEY FEATURE */}
                    <EarningsComparison
                        nycRideEarnings={offer.fareNYCRide}
                        uberEarnings={offer.fareUber}
                        lyftEarnings={offer.fareLyft}
                        showDetailed={false}
                    />

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-6">
                        <button
                            onClick={onDecline}
                            className="flex-1 py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                        >
                            Decline
                        </button>
                        <button
                            onClick={onAccept}
                            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                            Accept Ride
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
