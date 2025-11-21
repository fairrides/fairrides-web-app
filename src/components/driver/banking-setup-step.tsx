"use client";

import { useState } from "react";

interface BankingSetupStepProps {
    onValidChange: (isValid: boolean) => void;
}

export default function BankingSetupStep({ onValidChange }: BankingSetupStepProps) {
    const [accountHolderName, setAccountHolderName] = useState("");
    const [routingNumber, setRoutingNumber] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
    const [accountType, setAccountType] = useState<"checking" | "savings">("checking");
    const [instantPayoutConsent, setInstantPayoutConsent] = useState(false);

    const validateForm = () => {
        const isValid =
            accountHolderName.length > 0 &&
            routingNumber.length === 9 &&
            accountNumber.length >= 4 &&
            accountNumber === confirmAccountNumber &&
            instantPayoutConsent;
        setTimeout(() => onValidChange(isValid), 100);
    };

    return (
        <div className="space-y-6">
            {/* Account Holder Name */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Account Holder Name
                </label>
                <input
                    type="text"
                    placeholder="Full name as it appears on your bank account"
                    value={accountHolderName}
                    onChange={(e) => {
                        setAccountHolderName(e.target.value);
                        validateForm();
                    }}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                />
            </div>

            {/* Account Type */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Account Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => {
                            setAccountType("checking");
                            validateForm();
                        }}
                        className={`p-4 rounded-xl border-2 transition-all ${accountType === "checking"
                                ? "border-blue-500 bg-blue-50 text-blue-900"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                    >
                        <div className="flex items-center justify-center mb-2">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                        <p className="font-semibold">Checking</p>
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setAccountType("savings");
                            validateForm();
                        }}
                        className={`p-4 rounded-xl border-2 transition-all ${accountType === "savings"
                                ? "border-blue-500 bg-blue-50 text-blue-900"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                    >
                        <div className="flex items-center justify-center mb-2">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <p className="font-semibold">Savings</p>
                    </button>
                </div>
            </div>

            {/* Routing Number */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Routing Number
                </label>
                <input
                    type="text"
                    placeholder="9-digit routing number"
                    value={routingNumber}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 9);
                        setRoutingNumber(value);
                        validateForm();
                    }}
                    maxLength={9}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors font-mono"
                />
                <p className="text-xs text-gray-500 mt-1">
                    Found on the bottom left of your check
                </p>
            </div>

            {/* Account Number */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Account Number
                </label>
                <input
                    type="text"
                    placeholder="Account number"
                    value={accountNumber}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setAccountNumber(value);
                        validateForm();
                    }}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors font-mono"
                />
            </div>

            {/* Confirm Account Number */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Account Number
                </label>
                <input
                    type="text"
                    placeholder="Re-enter account number"
                    value={confirmAccountNumber}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setConfirmAccountNumber(value);
                        validateForm();
                    }}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors font-mono"
                />
                {confirmAccountNumber && accountNumber !== confirmAccountNumber && (
                    <p className="text-sm text-red-600 mt-1">Account numbers do not match</p>
                )}
            </div>

            {/* Payout Schedule Info */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2">
                            Flexible Payout Options
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                                <svg className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span><strong>Weekly Direct Deposit:</strong> Free automatic transfers every Monday</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span><strong>Instant Cash Out:</strong> Transfer money anytime for a small fee ($0.50)</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Consent Checkbox */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <label className="flex items-start cursor-pointer">
                    <input
                        type="checkbox"
                        checked={instantPayoutConsent}
                        onChange={(e) => {
                            setInstantPayoutConsent(e.target.checked);
                            validateForm();
                        }}
                        className="w-5 h-5 text-blue-600 rounded mt-1"
                    />
                    <div className="ml-3">
                        <p className="font-semibold text-gray-900">Banking Authorization</p>
                        <p className="text-sm text-gray-600 mt-1">
                            I authorize NYCRide to deposit earnings into the account provided above and to debit
                            the account for any adjustments, refunds, or fees in accordance with the Terms of Service.
                        </p>
                    </div>
                </label>
            </div>
        </div>
    );
}
