import api from "./api";
import type { Booking } from "../types/booking";

export interface CreateBookingPayload {
    vehicleId: string;
    pickupLocation: string;
    returnLocation: string;
    pickupDate: string;
    returnDate: string;
}

function mapBooking(b: Record<string, unknown>): Booking {
    const vehicle = b.vehicle as Record<string, unknown> | null;
    return {
        id: (b._id as string) ?? (b.id as string),
        carId: vehicle
            ? ((vehicle._id as string) ?? (vehicle.id as string))
            : (b.vehicle as string),
        carName: vehicle ? (vehicle.name as string) : "",
        carBrand: vehicle ? (vehicle.brand as string) : "",
        carImageUrl: vehicle ? (vehicle.imageUrl as string) : "",
        pickupLocation: b.pickupLocation as string,
        returnLocation: b.returnLocation as string,
        pickupDate: new Date(b.pickupDate as string).toISOString().split("T")[0],
        returnDate: new Date(b.returnDate as string).toISOString().split("T")[0],
        pricePerDay: b.pricePerDay as number,
        totalDays: b.totalDays as number,
        totalPrice: b.totalPrice as number,
        status: b.status as Booking["status"],
    };
}

export async function createBookingRequest(
    payload: CreateBookingPayload
): Promise<Booking> {
    const response = await api.post<{ data: Record<string, unknown> }>(
        "/bookings",
        payload
    );
    return mapBooking(response.data.data);
}

export async function fetchMyBookings(): Promise<Booking[]> {
    const response = await api.get<{ data: Record<string, unknown>[] }>(
        "/bookings/my"
    );
    return response.data.data.map(mapBooking);
}

export async function cancelBookingRequest(id: string): Promise<Booking> {
    const response = await api.patch<{ data: Record<string, unknown> }>(
        `/bookings/${id}/cancel`
    );
    return mapBooking(response.data.data);
}