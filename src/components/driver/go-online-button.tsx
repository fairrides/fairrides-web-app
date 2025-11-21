"use client";

import React, { useState, useEffect } from "react";

interface GoOnlineButtonProps {
    isOnline: boolean;
    onToggle: () => void;
}

export default function GoOnlineButton({ isOnline, onToggle }: GoOnlineButtonProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        setIsAnimating(true);
        setTimeout(() => {
            onToggle();
            setIsAnimating(false);
        }, 300);
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleClick}
                className={`relative w-48 h-48 rounded-full transition-all duration-300 ${isAnimating ? "scale-95" : "scale-100"
                    } ${isOnline
                        ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-2xl shadow-green-500/50"
                        : "bg-gradient-to-br from-gray-400 to-gray-600 shadow-xl"
                    }`}
            >
                <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-white" style={{
                    animationDuration: "2s",
                    display: isOnline ? "block" : "none"
                }} />

                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <svg
                        className="w-20 h-20 text-white mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isOnline ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        )}
                    </svg>
                    <span className="text-white font-black text-2xl">
                        {isOnline ? "ONLINE" : "OFFLINE"}
                    </span>
                </div>
            </button>

            <div className="mt-4 text-center">
                <p className="text-lg font-bold text-gray-700">
                    {isOnline ? "You're accepting rides" : "Tap to go online"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    {isOnline ? "Rides will be sent to you" : "Start earning today"}
                </p>
            </div>
        </div>
    );
}
