"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";

export default function HomeButton() {
    const pathname = usePathname();

    // Don't show on landing page
    if (pathname === "/") return null;

    return (
        <Link
            href="/"
            className="fixed top-4 left-4 z-50 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all border border-gray-200 group"
            aria-label="Go to Home"
        >
            <Home className="w-6 h-6 text-gray-700 group-hover:text-black" />
        </Link>
    );
}
