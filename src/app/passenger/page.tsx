"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import RideRequestPanel from "../../components/ride-request-panel";
import RideStatusPanel, {
    RideStatus,
    DriverDetails,
} from "../../components/ride-status-panel";
import { Place, getRoute, reverseGeocode } from "../../lib/mapbox";
import AdBanner from "../../components/ad-banner";

const MapComponent = dynamic(() => import("../../components/map"), {
    ssr: false,
});

export default function PassengerPage() {
    const [pickup, setPickup] = useState<Place | null>(null);
    const [dropoff, setDropoff] = useState<Place | null>(null);
    const [routeGeoJSON, setRouteGeoJSON] = useState<any>(null);
    const [routeDistance, setRouteDistance] = useState<number | undefined>(undefined);
    const [routeDuration, setRouteDuration] = useState<number | undefined>(undefined);
    const [rideStatus, setRideStatus] = useState<RideStatus>("IDLE");
    const [driverDetails, setDriverDetails] = useState<DriverDetails | null>(null);
    const [driverLocation, setDriverLocation] = useState<[number, number] | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [surgeMultiplier, setSurgeMultiplier] = useState<number>(1);

    // Simulate dynamic pricing updates
    useEffect(() => {
        const updateSurge = () => {
            // Simulate surge based on time or random demand
            // For demo: 30% chance of surge, max 2.0x
            const isSurge = Math.random() > 0.7;
            const newSurge = isSurge ? 1 + Math.random() : 1;
            setSurgeMultiplier(newSurge);
        };

        updateSurge(); // Initial
        const interval = setInterval(updateSurge, 30000); // Update every 30s
        return () => clearInterval(interval);
    }, []);

    const handlePickupSelect = async (place: Place) => {
        setPickup(place);
        if (dropoff) {
            await calculateRoute(place, dropoff);
        }
    };

    const handleDropoffSelect = async (place: Place) => {
        setDropoff(place);
        if (pickup) {
            await calculateRoute(pickup, place);
        }
    };

    const handleMapClick = async (lng: number, lat: number) => {
        if (rideStatus !== "IDLE") return; // Disable during ride

        const place = await reverseGeocode(lng, lat);
        if (!place) return;

        if (!pickup) {
            handlePickupSelect(place);
        } else if (!dropoff) {
            handleDropoffSelect(place);
        } else {
            // If both set, update dropoff
            handleDropoffSelect(place);
        }
    };

    const calculateRoute = async (start: Place, end: Place) => {
        setError(null); // Clear previous errors
        try {
            const routeData = await getRoute(
                [start.longitude, start.latitude],
                [end.longitude, end.latitude]
            );

            if (routeData) {
                setRouteGeoJSON(routeData.geometry);
                setRouteDistance(routeData.distance);
                setRouteDuration(routeData.duration);
            } else {
                console.error("No route found");
                setError("No route found. Try moving the pins to a valid road.");
                setRouteGeoJSON(null);
                setRouteDistance(undefined);
                setRouteDuration(undefined);
            }
        } catch (err) {
            console.error("Route calculation error:", err);
            setError("Could not calculate route. Please check your connection.");
            setRouteGeoJSON(null);
            setRouteDistance(undefined);
            setRouteDuration(undefined);
        }
    };

    const simulateMovement = (
        path: [number, number][],
        duration: number,
        onComplete: () => void
    ) => {
        const startTime = performance.now();

        // Pre-calculate cumulative distances
        const cumulativeDistances = [0];
        let totalDistance = 0;
        for (let i = 0; i < path.length - 1; i++) {
            const dx = path[i + 1][0] - path[i][0];
            const dy = path[i + 1][1] - path[i][1];
            const dist = Math.sqrt(dx * dx + dy * dy);
            totalDistance += dist;
            cumulativeDistances.push(totalDistance);
        }

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentDist = progress * totalDistance;

            // Find current segment
            let segmentIndex = 0;
            for (let i = 0; i < cumulativeDistances.length - 1; i++) {
                if (currentDist >= cumulativeDistances[i] && currentDist <= cumulativeDistances[i + 1]) {
                    segmentIndex = i;
                    break;
                }
            }

            // Safety check
            if (segmentIndex >= path.length - 1) segmentIndex = path.length - 2;

            const start = path[segmentIndex];
            const end = path[segmentIndex + 1];
            const segmentDist = cumulativeDistances[segmentIndex + 1] - cumulativeDistances[segmentIndex];
            const segmentProgress = segmentDist === 0 ? 0 : (currentDist - cumulativeDistances[segmentIndex]) / segmentDist;

            const lng = start[0] + (end[0] - start[0]) * segmentProgress;
            const lat = start[1] + (end[1] - start[1]) * segmentProgress;

            setDriverLocation([lng, lat]);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                onComplete();
            }
        };

        requestAnimationFrame(animate);
    };

    const handleRequestRide = () => {
        if (!pickup || !dropoff) return;

        setRideStatus("SEARCHING");

        // 1. Match Driver
        setTimeout(() => {
            setRideStatus("MATCHED");
            setDriverDetails({
                name: "Michael Knight",
                carModel: "Pontiac Firebird",
                licensePlate: "KITT 2000",
                rating: 4.9,
                trips: 1240,
            });

            const startLng = pickup.longitude - 0.005;
            const startLat = pickup.latitude - 0.005;
            setDriverLocation([startLng, startLat]);

            // 2. Driver moves to pickup
            setTimeout(() => {
                simulateMovement(
                    [[startLng, startLat], [pickup.longitude, pickup.latitude]],
                    3000,
                    () => {
                        setRideStatus("ARRIVED");

                        // 3. Start trip
                        setTimeout(() => {
                            setRideStatus("ON_TRIP");

                            const tripPath = routeGeoJSON?.coordinates || [
                                [pickup.longitude, pickup.latitude],
                                [dropoff.longitude, dropoff.latitude]
                            ];

                            simulateMovement(
                                tripPath,
                                10000,
                                () => {
                                    setRideStatus("COMPLETED");
                                }
                            );
                        }, 2000);
                    }
                );
            }, 1000);
        }, 2000);
    };

    const handleCancelRide = () => {
        setRideStatus("IDLE");
        setDriverDetails(null);
        setDriverLocation(undefined);
    };

    return (
        <main className="relative w-full h-screen overflow-hidden">
            {/* Ad Banner - Top of page */}
            {rideStatus === "IDLE" && (
                <div className="absolute top-0 left-0 right-0 z-20">
                    <AdBanner size="banner" />
                </div>
            )}

            {rideStatus === "IDLE" && (
                <RideRequestPanel
                    onPickupSelect={handlePickupSelect}
                    onDropoffSelect={handleDropoffSelect}
                    onRequestRide={handleRequestRide}
                    distance={routeDistance}
                    duration={routeDuration}
                    pickup={pickup}
                    dropoff={dropoff}
                    error={error}
                    surgeMultiplier={surgeMultiplier}
                />
            )}

            <RideStatusPanel
                status={rideStatus}
                driverDetails={driverDetails}
                onCancel={handleCancelRide}
            />

            {/* Ad after ride completion */}
            {rideStatus === "COMPLETED" && (
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-md px-4">
                    <AdBanner size="interstitial" />
                </div>
            )}

            <div className="w-full h-full">
                <MapComponent
                    pickupCoordinates={
                        pickup ? [pickup.longitude, pickup.latitude] : undefined
                    }
                    dropoffCoordinates={
                        dropoff ? [dropoff.longitude, dropoff.latitude] : undefined
                    }
                    driverCoordinates={driverLocation}
                    routeGeoJSON={routeGeoJSON}
                    onMapClick={handleMapClick}
                />
            </div>
        </main>
    );
}
