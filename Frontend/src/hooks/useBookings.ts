import { useState, useEffect, useCallback } from "react";
import { fetchMyBookings } from "../services/bookingService";
import type { Booking } from "../types/booking";

interface UseBookingsResult {
    bookings: Booking[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useBookings(): UseBookingsResult {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchMyBookings();
            setBookings(data);
        } catch {
            setError("Failed to load bookings. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    return { bookings, isLoading, error, refetch: load };
}