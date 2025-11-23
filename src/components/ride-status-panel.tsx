"use client";

import React from "react";

export type RideStatus = "IDLE" | "SEARCHING" | "MATCHED" | "ARRIVED" | "ON_TRIP" | "COMPLETED";

export interface DriverDetails {
    name: string;
    carModel: string;
    licensePlate: string;
    rating: number;
    trips: number;
}

interface RideStatusPanelProps {
    status: RideStatus;
    driverDetails: DriverDetails | null;
    onCancel: () => void;
}

export default function RideStatusPanel({
    status,
    driverDetails,
    onCancel,
}: RideStatusPanelProps) {
    if (status === "IDLE") return null;

    return (
        <div className="absolute bottom-0 left-0 w-full bg-white p-6 pb-24 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-[60] md:w-96 md:top-4 md:left-4 md:bottom-auto md:rounded-2xl md:shadow-xl md:pb-6 border border-gray-100">
            {status === "SEARCHING" && (
                <div className="flex flex-col items-center space-y-4 py-4">
                    <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin" />
                    <h3 className="text-xl font-bold text-gray-800">
                        Finding your ride...
                    </h3>
                    <button
                        onClick={onCancel}
                        className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-all"
                    >
                        Cancel Request
                    </button>
                </div>
            )}

            {status === "COMPLETED" && (
                <div className="flex flex-col items-center space-y-4 py-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
                        ✅
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Ride Completed!</h3>
                    <p className="text-gray-500">You arrived at your destination.</p>

                    <div className="w-full bg-gray-50 p-4 rounded-xl flex justify-between items-center">
                        <span className="font-medium text-gray-600">Total</span>
                        <span className="text-xl font-bold">$24.50</span>
                    </div>

                    <button
                        onClick={onCancel}
                        className="w-full py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-bold transition-all"
                    >
                        Done
                    </button>
                </div>
            )}

            {(status === "MATCHED" || status === "ARRIVED" || status === "ON_TRIP") && driverDetails && (
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">
                                {status === "MATCHED" && "Driver is on the way"}
                                {status === "ARRIVED" && "Driver has arrived!"}
                                {status === "ON_TRIP" && "Heading to destination"}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {status === "MATCHED" && "Arriving in 2 min"}
                                {status === "ARRIVED" && "Meet at pickup point"}
                                {status === "ON_TRIP" && "Enjoy your ride"}
                            </p>
                        </div>
                        <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-bold">
                            {driverDetails.licensePlate}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                            👤
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-800">{driverDetails.name}</h4>
                            <p className="text-sm text-gray-500">{driverDetails.carModel}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex items-center space-x-1">
                                <span className="text-yellow-500">★</span>
                                <span className="font-bold">{driverDetails.rating}</span>
                            </div>
                            <span className="text-xs text-gray-400">
                                {driverDetails.trips} trips
                            </span>
                        </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                        <button className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-all">
                            Message
                        </button>
                        <button className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-all">
                            Call
                        </button>
                    </div>

                    {status === "MATCHED" && (
                        <button
                            onClick={onCancel}
                            className="w-full py-3 text-red-500 font-semibold hover:bg-red-50 rounded-lg transition-all"
                        >
                            Cancel Ride
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
