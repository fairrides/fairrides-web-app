"use client";

import { useState } from "react";
import AuthForm from "../../../components/auth/auth-form";
import { registerRider, login } from "../../actions/auth";

export default function RiderAuthPage() {
    const [mode, setMode] = useState<"login" | "register">("login");

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black mb-2">Passenger Access</h1>
                    <p className="text-gray-500">
                        {mode === "login" ? "Welcome back! Ready to ride?" : "Join NYCRide today!"}
                    </p>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
                    <button
                        onClick={() => setMode("login")}
                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${mode === "login" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setMode("register")}
                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${mode === "register" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                <AuthForm
                    type={mode}
                    role="RIDER"
                    action={mode === "login" ? login : registerRider}
                />
            </div>
        </main>
    );
}
