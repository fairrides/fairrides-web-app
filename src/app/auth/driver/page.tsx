"use client";

import { useState } from "react";
import AuthForm from "../../../components/auth/auth-form";
import { signUpDriver, signIn } from "../../../lib/auth";

export default function DriverAuthPage() {
    const [mode, setMode] = useState<"login" | "register">("login");

    const handleRegister = async (formData: FormData) => {
        const result = await signUpDriver({
            username: formData.get('username') as string,
            password: formData.get('password') as string,
        });
        return result;
    };

    const handleLogin = async (formData: FormData) => {
        const result = await signIn({
            username: formData.get('username') as string,
            password: formData.get('password') as string,
            role: 'DRIVER',
        });
        return result;
    };

    return (
        <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-800">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black mb-2 text-white">Driver Portal</h1>
                    <p className="text-gray-400">
                        {mode === "login" ? "Welcome back, partner!" : "Start earning with NYCRide"}
                    </p>
                </div>

                <div className="flex bg-gray-800 p-1 rounded-lg mb-6">
                    <button
                        onClick={() => setMode("login")}
                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${mode === "login" ? "bg-gray-700 text-white shadow-sm" : "text-gray-400 hover:text-gray-200"
                            }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setMode("register")}
                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${mode === "register" ? "bg-gray-700 text-white shadow-sm" : "text-gray-400 hover:text-gray-200"
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="[&_label]:text-gray-300 [&_input]:bg-gray-800 [&_input]:border-gray-700 [&_input]:text-white">
                    <AuthForm
                        type={mode}
                        role="DRIVER"
                        onSubmit={mode === "login" ? handleLogin : handleRegister}
                        redirectTo="/driver/onboarding"
                    />
                </div>
            </div>
        </main>
    );
}
