"use client";

import React, { useState, useEffect } from "react";

interface AdBannerProps {
    size: "banner" | "interstitial";
}

// Simulated ads data
const ADS_DATA = [
    {
        id: 1,
        title: "Save 20% on Coffee",
        subtitle: "Starbucks",
        cta: "Get Offer",
        color: "from-green-500 to-green-700",
        icon: "☕",
    },
    {
        id: 2,
        title: "Book Your Next Flight",
        subtitle: "JetBlue Airways",
        cta: "Explore Deals",
        color: "from-blue-500 to-blue-700",
        icon: "✈️",
    },
    {
        id: 3,
        title: "Order Food & Get $10 Off",
        subtitle: "DoorDash",
        cta: "Order Now",
        color: "from-red-500 to-red-700",
        icon: "🍔",
    },
    {
        id: 4,
        title: "Stream Ad-Free Music",
        subtitle: "Spotify Premium",
        cta: "Try Free",
        color: "from-purple-500 to-purple-700",
        icon: "🎵",
    },
];

export default function AdBanner({ size }: AdBannerProps) {
    const [currentAd, setCurrentAd] = useState(ADS_DATA[0]);

    useEffect(() => {
        // Rotate ads every 10 seconds
        const interval = setInterval(() => {
            setCurrentAd(ADS_DATA[Math.floor(Math.random() * ADS_DATA.length)]);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    if (size === "banner") {
        return (
            <div className="w-full bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-2">
                    <div className={`flex items-center justify-between bg-gradient-to-r ${currentAd.color} rounded-lg px-4 py-2 text-white`}>
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">{currentAd.icon}</span>
                            <div>
                                <div className="font-bold text-sm">{currentAd.title}</div>
                                <div className="text-xs opacity-90">{currentAd.subtitle}</div>
                            </div>
                        </div>
                        <button className="bg-white text-gray-800 px-4 py-1 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
                            {currentAd.cta}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Interstitial ad
    return (
        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500 font-medium">Sponsored</span>
                <button className="text-gray-400 hover:text-gray-600 text-xs">
                    Dismiss
                </button>
            </div>

            <div className={`bg-gradient-to-br ${currentAd.color} rounded-xl p-6 text-white text-center`}>
                <div className="text-5xl mb-3">{currentAd.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{currentAd.title}</h3>
                <p className="text-sm opacity-90 mb-4">{currentAd.subtitle}</p>
                <button className="bg-white text-gray-800 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
                    {currentAd.cta}
                </button>
            </div>

            <div className="text-center mt-4">
                <p className="text-xs text-gray-500">
                    Thanks for riding with NYCRide! 🚗
                </p>
            </div>
        </div>
    );
}
