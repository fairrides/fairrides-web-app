"use client";

import { useState } from "react";

interface GreenImpactToggleProps {
    onToggle: (enabled: boolean, amount: number) => void;
}

const OFFSET_AMOUNT = 0.50;

export default function GreenImpactToggle({ onToggle }: GreenImpactToggleProps) {
    const [isEnabled, setIsEnabled] = useState(false);

    const handleToggle = () => {
        const newState = !isEnabled;
        setIsEnabled(newState);
        onToggle(newState, OFFSET_AMOUNT);
    };

    return (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-5 mt-4">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                        <span className="text-2xl">🌱</span>
                        <h3 className="font-black text-gray-900">Offset Your Carbon</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                        Round up <span className="font-bold text-green-700">${OFFSET_AMOUNT.toFixed(2)}</span> to fund eco-projects
                    </p>
                </div>

                {/* Toggle Switch */}
                <button
                    onClick={handleToggle}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${isEnabled ? "bg-green-500" : "bg-gray-300"
                        }`}
                >
                    <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isEnabled ? "translate-x-7" : "translate-x-1"
                            }`}
                    />
                </button>
            </div>

            {/* Impact Info */}
            {isEnabled && (
                <div className="bg-white rounded-xl p-3 mt-3 animate-slideDown">
                    <div className="flex items-center space-x-2 mb-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-bold text-green-900">Impact Unlocked!</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                        Your contribution offsets ~2 miles of CO₂ emissions and supports renewable energy projects.
                    </p>

                    {/* Badge Preview */}
                    <div className="mt-3 flex items-center justify-center space-x-2 bg-green-100 rounded-lg py-2">
                        <span className="text-lg">🍃</span>
                        <span className="text-xs font-bold text-green-700">Green Starter Badge Earned!</span>
                    </div>
                </div>
            )}

            {/* Subtle CTA when disabled */}
            {!isEnabled && (
                <p className="text-xs text-gray-500 mt-2">
                    Join riders making every trip carbon-neutral 🌍
                </p>
            )}
        </div>
    );
}
