"use client";

import { useState } from "react";
import AuthForm from "../../../components/auth/auth-form";
import { signUpRider, signIn } from "../../../lib/auth";

export default function RiderAuthPage() {
    const [mode, setMode] = useState<"login" | "register">("login");

    const handleRegister = async (formData: FormData) => {
        const result = await signUpRider({
            username: formData.get('username') as string,
            password: formData.get('password') as string,
            dob: formData.get('dob') as string,
            gender: formData.get('gender') as string,
            aboutMe: formData.get('aboutMe') as string,
        });
        return result;
    };

    const handleLogin = async (formData: FormData) => {
        const result = await signIn({
            username: formData.get('username') as string,
            password: formData.get('password') as string,
            role: 'RIDER',
        });
        return result;
    };

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
                    onSubmit={mode === "login" ? handleLogin : handleRegister}
                    redirectTo="/passenger"
                />
            </div>
        </main>
    );
}
