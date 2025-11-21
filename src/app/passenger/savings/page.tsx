"use client";

import { useState } from "react";
import SparklineChart from "../../../components/shared/sparkline-chart";

type TimePeriod = "today" | "week" | "month" | "year" | "lifetime";

interface SavingsData {
    today: number;
    week: number;
    month: number;
    year: number;
    lifetime: number;
    rideCount: {
        today: number;
        week: number;
        month: number;
        year: number;
        lifetime: number;
    };
    chartData: {
        today: number[];
        week: number[];
        month: number[];
        year: number[];
        lifetime: number[];
    };
}

// Mock data - in production, this would come from API/database
const MOCK_SAVINGS_DATA: SavingsData = {
    today: 8.50,
    week: 47.20,
    month: 187.30,
    year: 892.45,
    lifetime: 1274.80,
    rideCount: {
        today: 1,
        week: 6,
        month: 23,
        year: 127,
        lifetime: 186,
    },
    chartData: {
        today: [8.50],
        week: [5.20, 7.80, 9.10, 6.50, 8.20, 10.40],
        month: [42, 38, 51, 47],
        year: [187, 203, 178, 195, 210, 188, 201, 215, 198, 205, 212, 187],
        lifetime: [187, 374, 561, 748, 935, 1122, 1274],
    },
};

const BADGES = [
    { id: "smart-saver", name: "Smart Saver", icon: "💵", description: "Saved $100+", earned: true },
    { id: "consistent", name: "Consistent Rider", icon: "🔄", description: "10+ rides this month", earned: true },
    { id: "carbon-hero", name: "Carbon Offset Hero", icon: "🌱", description: "10+ offsets", earned: true },
    { id: "commuter", name: "Daily Commuter", icon: "🚕", description: "Use for work", earned: false },
    { id: "champion", name: "Savings Champion", icon: "🎯", description: "Save 50%+ avg", earned: false },
];

export default function SavingsPortfolio() {
    const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("month");

    const periods: { id: TimePeriod; label: string }[] = [
        { id: "today", label: "Today" },
        { id: "week", label: "Week" },
        { id: "month", label: "Month" },
        { id: "year", label: "Year" },
        { id: "lifetime", label: "All Time" },
    ];

    const currentSavings = MOCK_SAVINGS_DATA[selectedPeriod];
    const currentRides = MOCK_SAVINGS_DATA.rideCount[selectedPeriod];
    const avgPerRide = currentRides > 0 ? currentSavings / currentRides : 0;
    const chartData = MOCK_SAVINGS_DATA.chartData[selectedPeriod];

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-gray-900 mb-2">
                        Your Savings Portfolio
                    </h1>
                    <p className="text-gray-600">Track how much you've saved with NYCRide</p>
                </div>

                {/* Period Selector */}
                <div className="bg-white rounded-2xl p-2 shadow-lg mb-6 flex space-x-2">
                    {periods.map((period) => (
                        <button
                            key={period.id}
                            onClick={() => setSelectedPeriod(period.id)}
                            className={`flex-1 py-2 rounded-xl font-semibold transition-all ${selectedPeriod === period.id
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {period.label}
                        </button>
                    ))}
                </div>

                {/* Total Savings Card */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-2xl p-8 mb-6 text-white">
                    <div className="text-center mb-6">
                        <p className="text-green-100 text-sm font-semibold mb-2">Total Saved</p>
                        <h2 className="text-6xl font-black mb-4">${currentSavings.toFixed(2)}</h2>
                        <p className="text-green-100">
                            vs Uber/Lyft comparable trips
                        </p>
                    </div>

                    {/* Sparkline */}
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                        <SparklineChart
                            data={chartData}
                            width={Math.min(window.innerWidth - 100, 400)}
                            height={80}
                            color="#ffffff"
                            showArea={true}
                        />
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <p className="text-gray-500 text-sm mb-1">Rides Taken</p>
                        <p className="text-3xl font-black text-gray-900">{currentRides}</p>
                        <p className="text-xs text-gray-400 mt-1">
                            {selectedPeriod === "today" ? "ride" : "rides"} this {selectedPeriod}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <p className="text-gray-500 text-sm mb-1">Avg Savings</p>
                        <p className="text-3xl font-black text-green-600">${avgPerRide.toFixed(2)}</p>
                        <p className="text-xs text-gray-400 mt-1">per ride</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <p className="text-gray-500 text-sm mb-1">Saved This Month</p>
                        <p className="text-3xl font-black text-blue-600">
                            ${MOCK_SAVINGS_DATA.month.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            {MOCK_SAVINGS_DATA.rideCount.month} rides
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <p className="text-gray-500 text-sm mb-1">Lifetime Total</p>
                        <p className="text-3xl font-black text-purple-600">
                            ${MOCK_SAVINGS_DATA.lifetime.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            {MOCK_SAVINGS_DATA.rideCount.lifetime} rides
                        </p>
                    </div>
                </div>

                {/* Achievement Badges */}
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                    <h3 className="text-xl font-black text-gray-900 mb-4">🎖 Achievements</h3>
                    <div className="space-y-3">
                        {BADGES.map((badge) => (
                            <div
                                key={badge.id}
                                className={`flex items-center justify-between p-4 rounded-xl transition-all ${badge.earned
                                    ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400"
                                    : "bg-gray-50 border-2 border-gray-200 opacity-60"
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className={`text-3xl ${badge.earned ? "animate-bounce" : "grayscale"}`}>
                                        {badge.icon}
                                    </span>
                                    <div>
                                        <p className="font-bold text-gray-900">{badge.name}</p>
                                        <p className="text-xs text-gray-600">{badge.description}</p>
                                    </div>
                                </div>
                                {badge.earned && (
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Motivation Card */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white text-center shadow-lg">
                    <p className="text-2xl font-black mb-2">🎉 You're a Smart Saver!</p>
                    <p className="text-blue-100">
                        You've saved enough for {Math.floor(currentSavings / 10)} free coffee runs
                        or {Math.floor(currentSavings / 50)} nice dinners!
                    </p>
                </div>
            </div>
        </main>
    );
}
