"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SubscriptionPlan {
    id: string;
    name: string;
    priceDaily?: number;
    priceWeekly?: number;
    priceMonthly?: number;
    recommended?: boolean;
    features: string[];
    color: string;
    gradient: string;
    badge?: string;
}

const PLANS: SubscriptionPlan[] = [
    {
        id: "daily",
        name: "Daily Pass",
        priceDaily: 20,
        features: [
            "Keep 100% of your earnings",
            "No commission, ever",
            "Standard support",
            "Weekly payouts",
            "Basic insurance",
        ],
        color: "gray",
        gradient: "from-gray-400 to-gray-600",
    },
    {
        id: "weekly",
        name: "Weekly",
        priceWeekly: 65,
        recommended: true,
        badge: "BEST VALUE",
        features: [
            "Keep 100% of your earnings",
            "No commission, ever",
            "Priority support 24/7",
            "Daily payouts",
            "Premium insurance",
            "Driver rewards program",
            "Advanced analytics",
        ],
        color: "blue",
        gradient: "from-blue-500 to-blue-700",
    },
    {
        id: "monthly",
        name: "Monthly",
        priceMonthly: 200,
        features: [
            "Keep 100% of your earnings",
            "No commission, ever",
            "VIP support line",
            "Instant payouts",
            "Premium+ insurance",
            "Priority dispatch",
            "Top driver badge",
            "Exclusive bonuses",
            "Free car washes",
        ],
        color: "orange",
        gradient: "from-orange-500 to-orange-700",
    },
];

export default function DriverPage() {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(PLANS[1]);

    const handleContinue = () => {
        router.push("/driver/onboarding");
    };

    const displayPrice = (plan: SubscriptionPlan) => {
        if (plan.priceDaily) return `$${plan.priceDaily}/day`;
        if (plan.priceWeekly) return `$${plan.priceWeekly}/week`;
        if (plan.priceMonthly) return `$${plan.priceMonthly}/month`;
        return "$0";
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 bg-black/50 backdrop-blur-sm z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-black">
                            NYC<span className="text-yellow-500">Ride</span>
                        </span>
                    </Link>
                </div>
            </div>

            <div className="pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl md:text-6xl font-black mb-4">
                            Drive. Earn. <span className="text-yellow-500">Keep 100%.</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Choose a subscription plan that works for you. <br />
                            <span className="text-yellow-400 font-bold">Keep 100% of your earnings.</span> No commission on any ride.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {PLANS.map((plan) => (
                            <div
                                key={plan.id}
                                onClick={() => setSelectedPlan(plan)}
                                className={`relative cursor-pointer rounded-3xl p-6 transition-all duration-300 ${selectedPlan.id === plan.id
                                        ? "scale-105 shadow-2xl ring-4 ring-yellow-400"
                                        : "hover:scale-102 shadow-xl"
                                    } ${plan.recommended
                                        ? `bg-gradient-to-br ${plan.gradient}`
                                        : "bg-gray-800"
                                    }`}
                            >
                                {/* Recommended Badge */}
                                {plan.badge && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-yellow-500 text-gray-900 text-xs font-black px-4 py-1 rounded-full">
                                            {plan.badge}
                                        </span>
                                    </div>
                                )}

                                {/* Plan Name */}
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                                    <div className="text-4xl font-black">
                                        {displayPrice(plan)}
                                    </div>
                                    <div className="mt-2 bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full inline-block">
                                        0% Commission
                                    </div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start space-x-2">
                                            <svg
                                                className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Select Button */}
                                <button
                                    className={`w-full py-3 rounded-xl font-bold transition-all ${selectedPlan.id === plan.id
                                            ? "bg-yellow-500 text-gray-900"
                                            : "bg-white/10 hover:bg-white/20"
                                        }`}
                                >
                                    {selectedPlan.id === plan.id ? "Selected" : "Select Plan"}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Value Proposition */}
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-2xl p-8 mb-8">
                        <div className="flex items-start space-x-4">
                            <div className="text-5xl">💰</div>
                            <div>
                                <h3 className="text-2xl font-black text-green-400 mb-2">
                                    Why NYCRide is Different
                                </h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    <strong>Uber</strong> takes 25% commission. <strong>Lyft</strong> takes 23%.{" "}
                                    <strong className="text-yellow-400">NYCRide takes 0%.</strong>
                                    <br />
                                    On a $100 ride: Uber driver gets $75, Lyft driver gets $77,{" "}
                                    <strong className="text-green-400">NYCRide driver gets $100.</strong>
                                    <br />
                                    <span className="text-sm text-gray-400 mt-2 inline-block">
                                        Just pay your daily/weekly/monthly subscription and keep every dollar you earn.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Continue Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleContinue}
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-12 py-4 rounded-2xl text-xl font-black shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 transition-all"
                        >
                            Continue with {selectedPlan.name} →
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
