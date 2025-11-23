"use client";

import { useState } from "react";
import SparklineChart from "../../../components/shared/sparkline-chart";
import DriverNav from "../../../components/navigation/driver-nav";

type TimePeriod = "today" | "week" | "month";

interface EarningsData {
    today: number;
    week: number;
    month: number;
    tripCount: {
        today: number;
        week: number;
        month: number;
    };
    extraVsCompetitors: {
        today: number;
        week: number;
        month: number;
    };
    chartData: {
        today: number[];
        week: number[];
        month: number[];
    };
}

// Mock data
const MOCK_EARNINGS_DATA: EarningsData = {
    today: 142.50,
    week: 687.30,
    month: 2834.75,
    tripCount: {
        today: 8,
        week: 42,
        month: 178,
    },
    extraVsCompetitors: {
        today: 35.60,
        week: 171.80,
        month: 708.70,
    },
    chartData: {
        today: [18, 35, 52, 68, 88, 105, 122, 142.50],
        week: [98, 185, 287, 396, 492, 589, 687.30],
        month: [287, 612, 945, 1289, 1678, 2045, 2412, 2834.75],
    },
};

const TOP_ROUTES = [
    { from: "Times Square", to: "JFK Airport", avgEarnings: "$68.50", trips: 12 },
    { from: "Brooklyn Bridge", to: "LaGuardia", avgEarnings: "$52.30", trips: 18 },
    { from: "Central Park", to: "Penn Station", avgEarnings: "$24.80", trips: 35 },
];

const TIME_ZONES = [
    { period: "5-7 AM", earnings: "$285", avgPerTrip: "$28.50" },
    { period: "5-7 PM", earnings: "$542", avgPerTrip: "$31.80" },
    { period: "10 PM-2 AM", earnings: "$398", avgPerTrip: "$33.20" },
];

const DRIVER_BADGES = [
    { id: "high-earner", name: "High Earner", icon: "🔥", description: "Top 10% earnings", earned: true },
    { id: "five-star", name: "5-Star Service", icon: "⭐", description: "4.9+ rating", earned: true },
    { id: "pro-driver", name: "Pro Driver", icon: "💼", description: "500+ trips", earned: false },
    { id: "top-zone", name: "Top in Zone", icon: "🌟", description: "Highest in area", earned: true },
    { id: "quick-accept", name: "Quick Accept", icon: "⚡", description: "95%+ acceptance", earned: false },
];

export default function DriverEarningsPortfolio() {
    const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("week");

    const periods: { id: TimePeriod; label: string }[] = [
        { id: "today", label: "Today" },
        { id: "week", label: "This Week" },
        { id: "month", label: "This Month" },
    ];

    const currentEarnings = MOCK_EARNINGS_DATA[selectedPeriod];
    const currentTrips = MOCK_EARNINGS_DATA.tripCount[selectedPeriod];
    const extraEarned = MOCK_EARNINGS_DATA.extraVsCompetitors[selectedPeriod];
    const avgPerTrip = currentTrips > 0 ? currentEarnings / currentTrips : 0;
    const chartData = MOCK_EARNINGS_DATA.chartData[selectedPeriod];

    // Calculate earnings per mile (mock)
    const earningsPerMile = 0.92;
    const competitorAvgPerMile = 0.58;

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black mb-2">
                        Earnings Dashboard
                    </h1>
                    <p className="text-gray-400">Track your income and performance</p>
                </div>

                {/* Period Selector */}
                <div className="bg-gray-800 rounded-2xl p-2 shadow-lg mb-6 flex space-x-2">
                    {periods.map((period) => (
                        <button
                            key={period.id}
                            onClick={() => setSelectedPeriod(period.id)}
                            className={`flex-1 py-2 rounded-xl font-semibold transition-all ${selectedPeriod === period.id
                                ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-md"
                                : "text-gray-400 hover:bg-gray-700"
                                }`}
                        >
                            {period.label}
                        </button>
                    ))}
                </div>

                {/* Total Earnings Card */}
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl p-8 mb-6 text-gray-900">
                    <div className="text-center mb-6">
                        <p className="text-gray-800 text-sm font-semibold mb-2">Total Earned</p>
                        <h2 className="text-6xl font-black mb-2">${currentEarnings.toFixed(2)}</h2>
                        <p className="text-green-900 font-bold text-lg">
                            +${extraEarned.toFixed(2)} vs Uber/Lyft drivers
                        </p>
                    </div>

                    {/* Sparkline */}
                    <div className="bg-black/20 backdrop-blur rounded-xl p-4">
                        <SparklineChart
                            data={chartData}
                            width={Math.min(typeof window !== 'undefined' ? window.innerWidth - 100 : 400, 400)}
                            height={80}
                            color="#1f2937"
                            showArea={true}
                        />
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
                        <p className="text-gray-400 text-sm mb-1">Trips Completed</p>
                        <p className="text-3xl font-black">{currentTrips}</p>
                        <p className="text-xs text-gray-500 mt-1">this {selectedPeriod}</p>
                    </div>

                    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
                        <p className="text-gray-400 text-sm mb-1">Avg per Trip</p>
                        <p className="text-3xl font-black text-green-400">${avgPerTrip.toFixed(2)}</p>
                        <p className="text-xs text-gray-500 mt-1">average earnings</p>
                    </div>

                    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
                        <p className="text-gray-400 text-sm mb-1">Earnings/Mile</p>
                        <p className="text-3xl font-black text-yellow-400">${earningsPerMile.toFixed(2)}</p>
                        <p className="text-xs text-green-400 mt-1">
                            vs ${competitorAvgPerMile} competitors
                        </p>
                    </div>

                    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
                        <p className="text-gray-400 text-sm mb-1">This Month</p>
                        <p className="text-3xl font-black text-blue-400">
                            ${MOCK_EARNINGS_DATA.month.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {MOCK_EARNINGS_DATA.tripCount.month} trips
                        </p>
                    </div>
                </div>

                {/* Top Routes */}
                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
                    <h3 className="text-xl font-black mb-4">💎 Top Earning Routes</h3>
                    <div className="space-y-3">
                        {TOP_ROUTES.map((route, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-4 bg-gray-700 rounded-xl"
                            >
                                <div className="flex-1">
                                    <p className="font-bold text-white">
                                        {route.from} → {route.to}
                                    </p>
                                    <p className="text-xs text-gray-400">{route.trips} trips</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-black text-green-400">{route.avgEarnings}</p>
                                    <p className="text-xs text-gray-400">avg</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Best Time Windows */}
                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
                    <h3 className="text-xl font-black mb-4">⏱ Peak Earning Times</h3>
                    <div className="space-y-3">
                        {TIME_ZONES.map((zone, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-4 bg-gray-700 rounded-xl"
                            >
                                <div>
                                    <p className="font-bold text-white">{zone.period}</p>
                                    <p className="text-xs text-gray-400">{zone.avgPerTrip}/trip</p>
                                </div>
                                <p className="text-xl font-black text-yellow-400">{zone.earnings}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Achievement Badges */}
                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
                    <h3 className="text-xl font-black mb-4">🏆 Achievements</h3>
                    <div className="space-y-3">
                        {DRIVER_BADGES.map((badge) => (
                            <div
                                key={badge.id}
                                className={`flex items-center justify-between p-4 rounded-xl transition-all ${badge.earned
                                    ? "bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-2 border-yellow-500"
                                    : "bg-gray-700 border-2 border-gray-600 opacity-60"
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className={`text-3xl ${badge.earned ? "animate-bounce" : "grayscale"}`}>
                                        {badge.icon}
                                    </span>
                                    <div>
                                        <p className="font-bold">{badge.name}</p>
                                        <p className="text-xs text-gray-400">{badge.description}</p>
                                    </div>
                                </div>
                                {badge.earned && (
                                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Motivation Card */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-6 text-center shadow-lg">
                    <p className="text-2xl font-black mb-2">💪 You're Crushing It!</p>
                    <p className="text-green-100">
                        You've earned ${extraEarned.toFixed(2)} MORE than Uber/Lyft drivers would on the same rides.
                        That's {((extraEarned / (currentEarnings - extraEarned)) * 100).toFixed(0)}% extra in your pocket!
                    </p>
                </div>
            </div>

            {/* Bottom Navigation */}
            <DriverNav />
        </main>
    );
}
