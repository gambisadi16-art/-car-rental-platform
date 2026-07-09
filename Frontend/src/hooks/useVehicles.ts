import { useState, useEffect, useCallback } from "react";
import { fetchVehicles, type VehicleFilters, type PaginatedVehicles } from "../services/vehicleService";

interface UseVehiclesResult {
    data: PaginatedVehicles | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useVehicles(filters: VehicleFilters): UseVehiclesResult {
    const [data, setData] = useState<PaginatedVehicles | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const filterKey = JSON.stringify(filters);

    const load = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await fetchVehicles(filters);
            setData(result);
        } catch {
            setError("Failed to load vehicles. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [filterKey]);

    useEffect(() => {
        load();
    }, [load]);

    return { data, isLoading, error, refetch: load };
}