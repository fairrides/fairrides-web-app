"use client";

import { useEffect, useState } from "react";
import PassengerClient from "./passenger-client";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "../../lib/auth";

export default function PassengerPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            const currentUser = await getCurrentUser();
            if (!currentUser) {
                router.push("/auth/rider");
                return;
            }
            if (currentUser.role !== "RIDER") {
                // Allow but could add warning
            }
            setUser(currentUser);
            setLoading(false);
        }
        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return <PassengerClient user={user} />;
}
