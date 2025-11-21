"use client";

import PostRideEarnings from "../../components/driver/post-ride-earnings";

export default function DriverEarningsDemo() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black py-12 px-4">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-white mb-2">
                        Trip Completed! 🎊
                    </h1>
                    <p className="text-gray-400">
                        Great job on another successful ride
                    </p>
                </div>

                {/* Earnings Display */}
                <PostRideEarnings
                    earnedAmount={22.05}
                    distance={2.3}
                    duration={12}
                    rideType="Standard"
                    tips={3.50}
                />

                {/* Navigate Back */}
                <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-gray-900 font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                    Back to Dashboard
                </button>
            </div>
        </main>
    );
}
