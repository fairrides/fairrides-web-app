"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Wallet } from "lucide-react";

export default function DriverNav() {
    const pathname = usePathname();

    // Don't show nav on home page (dashboard)
    if (pathname === '/driver/dashboard') {
        return null;
    }

    // Check if we're on earnings page
    const isEarningsPage = pathname === '/driver/earnings';

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
            <div className="flex justify-around items-center px-6 py-3">
                {/* Home Icon - Always visible */}
                <Link
                    href="/driver/dashboard"
                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <Home className="w-6 h-6 text-blue-600" />
                    <span className="text-xs font-medium text-gray-700">Home</span>
                </Link>

                {/* Earnings Icon - Hidden on earnings page */}
                {!isEarningsPage && (
                    <Link
                        href="/driver/earnings"
                        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <Wallet className="w-6 h-6 text-yellow-600" />
                        <span className="text-xs font-medium text-gray-700">Earnings</span>
                    </Link>
                )}
            </div>
        </nav>
    );
}
