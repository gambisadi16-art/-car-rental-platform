import { useState, useEffect } from "react";
import { fetchVehicleById, fetchRelatedVehicles } from "../services/vehicleService";
import type { Car } from "../types/car";

interface UseVehicleResult {
    vehicle: Car | null;
    related: Car[];
    isLoading: boolean;
    error: string | null;
}

export function useVehicle(id: string): UseVehicleResult {
    const [vehicle, setVehicle] = useState<Car | null>(null);
    const [related, setRelated] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const load = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [vehicleData, relatedData] = await Promise.all([
                    fetchVehicleById(id),
                    fetchRelatedVehicles(id),
                ]);
                setVehicle(vehicleData);
                setRelated(relatedData);
            } catch {
                setError("Vehicle not found.");
            } finally {
                setIsLoading(false);
            }
        };

        load();
    }, [id]);

    return { vehicle, related, isLoading, error };
}