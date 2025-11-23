"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, PiggyBank } from "lucide-react";

export default function PassengerNav() {
    const pathname = usePathname();

    // Don't show nav on home page
    if (pathname === '/passenger') {
        return null;
    }

    // Check if we're on savings page
    const isSavingsPage = pathname === '/passenger/savings';

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
            <div className="flex justify-around items-center px-6 py-3">
                {/* Home Icon - Always visible */}
                <Link
                    href="/passenger"
                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <Home className="w-6 h-6 text-blue-600" />
                    <span className="text-xs font-medium text-gray-700">Home</span>
                </Link>

                {/* Savings Icon - Hidden on savings page */}
                {!isSavingsPage && (
                    <Link
                        href="/passenger/savings"
                        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <PiggyBank className="w-6 h-6 text-green-600" />
                        <span className="text-xs font-medium text-gray-700">Savings</span>
                    </Link>
                )}
            </div>
        </nav>
    );
}
