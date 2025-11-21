"use client";

import { useState } from "react";

interface IdentityVerificationStepProps {
    onValidChange: (isValid: boolean) => void;
}

export default function IdentityVerificationStep({ onValidChange }: IdentityVerificationStepProps) {
    const [license, setLicense] = useState<File | null>(null);
    const [idPhoto, setIdPhoto] = useState<File | null>(null);
    const [selfie, setSelfie] = useState<File | null>(null);
    const [backgroundCheckConsent, setBackgroundCheckConsent] = useState(false);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setter: (file: File | null) => void
    ) => {
        const file = e.target.files?.[0] || null;
        setter(file);
        validateForm();
    };

    const validateForm = () => {
        const isValid = license !== null && idPhoto !== null && selfie !== null && backgroundCheckConsent;
        setTimeout(() => onValidChange(isValid), 100);
    };

    return (
        <div className="space-y-6">
            {/* Driver License */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Driver's License
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition-all">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setLicense)}
                        className="hidden"
                        id="license-upload"
                    />
                    <label
                        htmlFor="license-upload"
                        className="cursor-pointer flex flex-col items-center"
                    >
                        {license ? (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-gray-900">{license.name}</p>
                                <p className="text-sm text-gray-500 mt-1">Click to change</p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-gray-900">Upload Driver's License</p>
                                <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                            </div>
                        )}
                    </label>
                </div>
            </div>

            {/* ID Photo */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Government-Issued ID
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition-all">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setIdPhoto)}
                        className="hidden"
                        id="id-upload"
                    />
                    <label htmlFor="id-upload" className="cursor-pointer flex flex-col items-center">
                        {idPhoto ? (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-gray-900">{idPhoto.name}</p>
                                <p className="text-sm text-gray-500 mt-1">Click to change</p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-gray-900">Upload Government ID</p>
                                <p className="text-sm text-gray-500 mt-1">Passport or State ID</p>
                            </div>
                        )}
                    </label>
                </div>
            </div>

            {/* Selfie */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Selfie Photo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition-all">
                    <input
                        type="file"
                        accept="image/*"
                        capture="user"
                        onChange={(e) => handleFileChange(e, setSelfie)}
                        className="hidden"
                        id="selfie-upload"
                    />
                    <label htmlFor="selfie-upload" className="cursor-pointer flex flex-col items-center">
                        {selfie ? (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-gray-900">{selfie.name}</p>
                                <p className="text-sm text-gray-500 mt-1">Click to retake</p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-gray-900">Take a Selfie</p>
                                <p className="text-sm text-gray-500 mt-1">For identity verification</p>
                            </div>
                        )}
                    </label>
                </div>
            </div>

            {/* Background Check Consent */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <label className="flex items-start cursor-pointer">
                    <input
                        type="checkbox"
                        checked={backgroundCheckConsent}
                        onChange={(e) => {
                            setBackgroundCheckConsent(e.target.checked);
                            validateForm();
                        }}
                        className="w-5 h-5 text-blue-600 rounded mt-1"
                    />
                    <div className="ml-3">
                        <p className="font-semibold text-gray-900">Background Check Consent</p>
                        <p className="text-sm text-gray-600 mt-1">
                            I authorize NYCRide to conduct a background check including criminal history, driving record,
                            and employment verification. This helps ensure safety for all riders.
                        </p>
                    </div>
                </label>
            </div>
        </div>
    );
}
