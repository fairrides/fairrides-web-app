import { getCurrentUser } from "../actions/auth";
import PassengerClient from "./passenger-client";
import { redirect } from "next/navigation";

export default async function PassengerPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/auth/rider");
    }

    if (user.role !== "RIDER") {
        // If a driver tries to access passenger page, maybe redirect or just show it?
        // For now, let's allow it but maybe warn or just pass the user data
    }

    return <PassengerClient user={user} />;
}
