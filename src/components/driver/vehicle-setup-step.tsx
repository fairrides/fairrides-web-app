"use client";

import { useState } from "react";

interface VehicleSetupStepProps {
    onValidChange: (isValid: boolean) => void;
}

export default function VehicleSetupStep({ onValidChange }: VehicleSetupStepProps) {
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [plate, setPlate] = useState("");
    const [color, setColor] = useState("");
    const [insurance, setInsurance] = useState<File | null>(null);
    const [registration, setRegistration] = useState<File | null>(null);

    const validateForm = () => {
        const isValid =
            make.length > 0 &&
            model.length > 0 &&
            year.length === 4 &&
            plate.length > 0 &&
            color.length > 0 &&
            insurance !== null &&
            registration !== null;
        setTimeout(() => onValidChange(isValid), 100);
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setter: (file: File | null) => void
    ) => {
        const file = e.target.files?.[0] || null;
        setter(file);
        validateForm();
    };

    return (
        <div className="space-y-6">
            {/* Car Details Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Make
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., Toyota"
                        value={make}
                        onChange={(e) => {
                            setMake(e.target.value);
                            validateForm();
                        }}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Model
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., Camry"
                        value={model}
                        onChange={(e) => {
                            setModel(e.target.value);
                            validateForm();
                        }}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Year
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., 2020"
                        value={year}
                        onChange={(e) => {
                            setYear(e.target.value);
                            validateForm();
                        }}
                        maxLength={4}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Color
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., Black"
                        value={color}
                        onChange={(e) => {
                            setColor(e.target.value);
                            validateForm();
                        }}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    License Plate
                </label>
                <input
                    type="text"
                    placeholder="e.g., ABC1234"
                    value={plate}
                    onChange={(e) => {
                        setPlate(e.target.value.toUpperCase());
                        validateForm();
                    }}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors uppercase font-mono"
                />
            </div>

            {/* Insurance Upload */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Insurance Card
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition-all">
                    <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => handleFileChange(e, setInsurance)}
                        className="hidden"
                        id="insurance-upload"
                    />
                    <label htmlFor="insurance-upload" className="cursor-pointer flex flex-col items-center">
                        {insurance ? (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-gray-900">{insurance.name}</p>
                                <p className="text-sm text-gray-500 mt-1">Click to change</p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-gray-900">Upload Insurance Card</p>
                                <p className="text-sm text-gray-500 mt-1">PDF or image file</p>
                            </div>
                        )}
                    </label>
                </div>
            </div>

            {/* Registration Upload */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vehicle Registration
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition-all">
                    <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => handleFileChange(e, setRegistration)}
                        className="hidden"
                        id="registration-upload"
                    />
                    <label htmlFor="registration-upload" className="cursor-pointer flex flex-col items-center">
                        {registration ? (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-gray-900">{registration.name}</p>
                                <p className="text-sm text-gray-500 mt-1">Click to change</p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-gray-900">Upload Registration</p>
                                <p className="text-sm text-gray-500 mt-1">PDF or image file</p>
                            </div>
                        )}
                    </label>
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start">
                <svg className="w-6 h-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <p className="font-semibold text-gray-900">Vehicle Requirements</p>
                    <p className="text-sm text-gray-600 mt-1">
                        Your vehicle must be 2010 or newer, have 4 doors, and pass a vehicle inspection.
                        Insurance must be current and valid in New York State.
                    </p>
                </div>
            </div>
        </div>
    );
}
