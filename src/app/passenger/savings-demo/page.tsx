"use client";

import RideSavingsCelebration from "../../components/rider/ride-savings-celebration";
import GreenImpactToggle from "../../components/rider/green-impact-toggle";

export default function RiderSavingsDemo() {
    const handleCarbonOffset = (enabled: boolean, amount: number) => {
        console.log("Carbon offset:", enabled, amount);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-12 px-4">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-gray-900 mb-2">
                        Ride Complete! 🎉
                    </h1>
                    <p className="text-gray-600">
                        Thank you for riding with NYCRide
                    </p>
                </div>

                {/* Savings Celebration */}
                <RideSavingsCelebration
                    actualFare={24.50}
                    distance={2.3}
                    duration={12}
                    rideType="Standard"
                />

                {/* Carbon Offset Toggle */}
                <GreenImpactToggle onToggle={handleCarbonOffset} />

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                    View Savings Dashboard
                </button>
            </div>
        </main>
    );
}
