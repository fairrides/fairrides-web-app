"use client";

import React from "react";

interface Step {
    id: number;
    title: string;
    description: string;
}

const STEPS: Step[] = [
    { id: 1, title: "Identity", description: "Verify your identity" },
    { id: 2, title: "Vehicle", description: "Add your car details" },
    { id: 3, title: "Banking", description: "Set up payouts" },
    { id: 4, title: "Review", description: "Review and submit" },
];

interface OnboardingWizardProps {
    currentStep: number;
    children: React.ReactNode;
    onNext: () => void;
    onBack: () => void;
    onSubmit: () => void;
    isValid: boolean;
}

export default function OnboardingWizard({
    currentStep,
    children,
    onNext,
    onBack,
    onSubmit,
    isValid,
}: OnboardingWizardProps) {
    const isLastStep = currentStep === STEPS.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        {STEPS.map((step, idx) => (
                            <React.Fragment key={step.id}>
                                <div className="flex flex-col items-center relative">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${currentStep >= step.id
                                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110"
                                                : "bg-gray-300 text-gray-600"
                                            }`}
                                    >
                                        {currentStep > step.id ? (
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            step.id
                                        )}
                                    </div>
                                    <div className="mt-2 text-center">
                                        <div className={`text-sm font-semibold ${currentStep >= step.id ? "text-blue-600" : "text-gray-500"}`}>
                                            {step.title}
                                        </div>
                                        <div className="text-xs text-gray-400 hidden sm:block">{step.description}</div>
                                    </div>
                                </div>
                                {idx < STEPS.length - 1 && (
                                    <div className="flex-1 h-1 mx-4 mt-[-40px]">
                                        <div
                                            className={`h-full rounded transition-all ${currentStep > step.id ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gray-300"
                                                }`}
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                    <h2 className="text-3xl font-black text-gray-900 mb-2">
                        {STEPS[currentStep - 1]?.title}
                    </h2>
                    <p className="text-gray-600 mb-8">{STEPS[currentStep - 1]?.description}</p>

                    {children}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    {currentStep > 1 ? (
                        <button
                            onClick={onBack}
                            className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 transition-all"
                        >
                            ← Back
                        </button>
                    ) : (
                        <div />
                    )}

                    {isLastStep ? (
                        <button
                            onClick={onSubmit}
                            disabled={!isValid}
                            className={`px-8 py-3 rounded-xl font-bold text-white transition-all ${isValid
                                    ? "bg-gradient-to-r from-green-600 to-green-700 hover:shadow-lg hover:scale-105"
                                    : "bg-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Submit Application →
                        </button>
                    ) : (
                        <button
                            onClick={onNext}
                            disabled={!isValid}
                            className={`px-8 py-3 rounded-xl font-bold text-white transition-all ${isValid
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:scale-105"
                                    : "bg-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Next →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
