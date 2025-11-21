"use client";

import React, { useState, useEffect } from "react";
import RideOptions, { RideOption } from "./ride-options";
import { searchPlaces, Place } from "../lib/mapbox";

interface RideRequestPanelProps {
    onPickupSelect: (place: Place) => void;
    onDropoffSelect: (place: Place) => void;
    onRequestRide: () => void;
    distance?: number;
    duration?: number;
    pickup?: Place | null;
    dropoff?: Place | null;
    error?: string | null;
    surgeMultiplier?: number;
}

export default function RideRequestPanel({
    onPickupSelect,
    onDropoffSelect,
    onRequestRide,
    distance,
    duration,
    pickup,
    dropoff,
    error,
    surgeMultiplier,
}: RideRequestPanelProps) {
    const [pickupQuery, setPickupQuery] = useState("");
    const [dropoffQuery, setDropoffQuery] = useState("");
    const [pickupSuggestions, setPickupSuggestions] = useState<Place[]>([]);
    const [dropoffSuggestions, setDropoffSuggestions] = useState<Place[]>([]);
    const [selectedOption, setSelectedOption] = useState<RideOption | null>(null);
    const [activeField, setActiveField] = useState<"pickup" | "dropoff" | null>(
        null
    );

    // Sync local state with props
    useEffect(() => {
        if (pickup) setPickupQuery(pickup.name);
    }, [pickup]);

    useEffect(() => {
        if (dropoff) setDropoffQuery(dropoff.name);
    }, [dropoff]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (activeField === "pickup" && pickupQuery.length > 2) {
                const results = await searchPlaces(pickupQuery);
                setPickupSuggestions(results);
            } else if (activeField === "dropoff" && dropoffQuery.length > 2) {
                const results = await searchPlaces(dropoffQuery);
                setDropoffSuggestions(results);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [pickupQuery, dropoffQuery, activeField]);

    const handleSelect = (place: Place, type: "pickup" | "dropoff") => {
        if (type === "pickup") {
            setPickupQuery(place.name);
            setPickupSuggestions([]);
            onPickupSelect(place);
        } else {
            setDropoffQuery(place.name);
            setDropoffSuggestions([]);
            onDropoffSelect(place);
        }
        setActiveField(null);
    };

    return (
        <div className="absolute top-4 left-4 z-10 w-96 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Where to?</h2>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="flex flex-col gap-3 relative">
                {/* Pickup Input */}
                <div className="relative">
                    <div className="absolute left-3 top-3 w-2 h-2 rounded-full bg-gray-300" />
                    <input
                        type="text"
                        placeholder="Add a pickup location"
                        className="w-full p-3 pl-8 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
                        value={pickupQuery}
                        onChange={(e) => {
                            setPickupQuery(e.target.value);
                            setActiveField("pickup");
                        }}
                        onFocus={() => setActiveField("pickup")}
                    />
                    {activeField === "pickup" && pickupSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-1 z-20 max-h-48 overflow-y-auto">
                            {pickupSuggestions.map((place) => (
                                <button
                                    key={place.id}
                                    className="w-full text-left p-3 hover:bg-gray-100 text-sm"
                                    onClick={() => handleSelect(place, "pickup")}
                                >
                                    {place.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Dropoff Input */}
                <div className="relative">
                    <div className="absolute left-3 top-3 w-2 h-2 rounded-full bg-black" />
                    <input
                        type="text"
                        placeholder="Enter destination"
                        className="w-full p-3 pl-8 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
                        value={dropoffQuery}
                        onChange={(e) => {
                            setDropoffQuery(e.target.value);
                            setActiveField("dropoff");
                        }}
                        onFocus={() => setActiveField("dropoff")}
                    />
                    {activeField === "dropoff" && dropoffSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-1 z-20 max-h-48 overflow-y-auto">
                            {dropoffSuggestions.map((place) => (
                                <button
                                    key={place.id}
                                    className="w-full text-left p-3 hover:bg-gray-100 text-sm"
                                    onClick={() => handleSelect(place, "dropoff")}
                                >
                                    {place.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <RideOptions
                selectedOption={selectedOption}
                onSelect={setSelectedOption}
                distance={distance}
                duration={duration}
                pickup={pickup ? { latitude: pickup.latitude, longitude: pickup.longitude } : undefined}
                dropoff={dropoff ? { latitude: dropoff.latitude, longitude: dropoff.longitude } : undefined}
            />

            <button
                onClick={onRequestRide}
                disabled={!selectedOption || !pickupQuery || !dropoffQuery || !!error}
                className={`
          w-full py-3 rounded-lg font-bold text-white transition-all mt-2
          ${selectedOption && pickupQuery && dropoffQuery && !error
                        ? "bg-black hover:bg-gray-800 shadow-lg"
                        : "bg-gray-300 cursor-not-allowed"
                    }
        `}
            >
                Request {selectedOption?.name || "Ride"}
            </button>
        </div>
    );
}
