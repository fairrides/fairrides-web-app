"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import GoOnlineButton from "../../../components/driver/go-online-button";
import RideOfferModal from "../../../components/driver/ride-offer-modal";

const MapComponent = dynamic(() => import("../../../components/map"), {
    ssr: false,
});

// Simulated ride offer data
const SAMPLE_OFFERS = [
    {
        id: "1",
        pickupLocation: "Times Square, Manhattan",
        dropoffLocation: "Central Park West",
        distance: 2.3,
        duration: 12,
        fareNYCRide: 14.50, // 90% of $16.11 (assuming Pro plan - 10% commission)
        fareUber: 11.25,    // 75% of $15 base fare (25% Uber commission)
        fareLyft: 11.55,    // 77% of $15 base fare (23% Lyft commission)
        rideType: "Standard" as const,
    },
    {
        id: "2",
        pickupLocation: "Brooklyn Bridge",
        dropoffLocation: "JFK Airport",
        distance: 15.8,
        duration: 38,
        fareNYCRide: 54.00, // 90% of $60
        fareUber: 42.00,    // 70% of $60
        fareLyft: 43.20,    // 72% of $60
        rideType: "SUV" as const,
    },
];

export default function DriverDashboard() {
    const router = useRouter();
    const [isOnline, setIsOnline] = useState(false);
    const [currentOffer, setCurrentOffer] = useState<typeof SAMPLE_OFFERS[0] | null>(null);
    const [todayEarnings, setTodayEarnings] = useState(87.50);
    const [tripsToday, setTripsToday] = useState(4);

    // Simulate ride offers when online
    useEffect(() => {
        if (!isOnline) return;

        // Send a ride offer 3 seconds after going online
        const timer = setTimeout(() => {
            setCurrentOffer(SAMPLE_OFFERS[Math.floor(Math.random() * SAMPLE_OFFERS.length)]);
        }, 3000);

        return () => clearTimeout(timer);
    }, [isOnline]);

    const handleAcceptRide = () => {
        if (currentOffer) {
            setTodayEarnings(prev => prev + currentOffer.fareNYCRide);
            setTripsToday(prev => prev + 1);
        }
        setCurrentOffer(null);

        // Simulate another offer after 5 seconds
        setTimeout(() => {
            setCurrentOffer(SAMPLE_OFFERS[Math.floor(Math.random() * SAMPLE_OFFERS.length)]);
        }, 5000);
    };

    const handleDeclineRide = () => {
        setCurrentOffer(null);

        // Simulate another offer after 8 seconds
        setTimeout(() => {
            setCurrentOffer(SAMPLE_OFFERS[Math.floor(Math.random() * SAMPLE_OFFERS.length)]);
        }, 8000);
    };

    return (
        <main className="relative w-full h-screen overflow-hidden bg-gray-900">
            {/* Map Background */}
            <div className="absolute inset-0">
                <MapComponent
                    pickupCoordinates={[-73.9857, 40.7580]} // NYC coords
                    onMapClick={() => { }}
                />
            </div>

            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-20">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <span className="text-2xl font-black">
                            NYC<span className="text-yellow-500">Ride</span>
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-sm text-gray-600 font-medium">Driver</span>
                    </div>

                    {/* Earnings Summary */}
                    <div className="flex items-center space-x-6">
                        <div className="text-right">
                            <p className="text-xs text-gray-500">Today's Earnings</p>
                            <p className="text-xl font-black text-green-600">${todayEarnings.toFixed(2)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500">Trips</p>
                            <p className="text-xl font-black text-blue-600">{tripsToday}</p>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Center Go Online Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="pointer-events-auto">
                    <GoOnlineButton
                        isOnline={isOnline}
                        onToggle={() => setIsOnline(!isOnline)}
                    />
                </div>
            </div>

            {/* Status Indicator */}
            {isOnline && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 animate-pulse">
                        <div className="w-3 h-3 bg-white rounded-full" />
                        <span className="font-bold">Searching for riders...</span>
                    </div>
                </div>
            )}

            {/* Ride Offer Modal */}
            {currentOffer && (
                <RideOfferModal
                    offer={currentOffer}
                    onAccept={handleAcceptRide}
                    onDecline={handleDeclineRide}
                />
            )}
        </main>
    );
}
