import Booking from "../models/Booking";
import Vehicle from "../models/Vehicle";
import type { IBooking } from "../models/Booking";

export interface CreateBookingData {
    userId: string;
    vehicleId: string;
    pickupLocation: string;
    returnLocation: string;
    pickupDate: string;
    returnDate: string;
}

export async function checkAvailability(
    vehicleId: string,
    pickupDate: string,
    returnDate: string,
    excludeBookingId?: string
): Promise<boolean> {
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);

    const query: Record<string, unknown> = {
        vehicle: vehicleId,
        status: { $ne: "cancelled" },
        $or: [
            { pickupDate: { $lt: returnD }, returnDate: { $gt: pickup } },
        ],
    };

    if (excludeBookingId) {
        query._id = { $ne: excludeBookingId };
    }

    const conflict = await Booking.findOne(query);
    return !conflict;
}

export async function createBooking(
    data: CreateBookingData
): Promise<IBooking> {
    const { userId, vehicleId, pickupLocation, returnLocation, pickupDate, returnDate } = data;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
        const error = new Error("Vehicle not found") as Error & { statusCode: number };
        error.statusCode = 404;
        throw error;
    }

    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);

    if (returnD <= pickup) {
        const error = new Error("Return date must be after pickup date") as Error & { statusCode: number };
        error.statusCode = 400;
        throw error;
    }

    const isAvailable = await checkAvailability(vehicleId, pickupDate, returnDate);
    if (!isAvailable) {
        const error = new Error(
            "This vehicle is not available for the selected dates"
        ) as Error & { statusCode: number };
        error.statusCode = 409;
        throw error;
    }

    const totalDays = Math.ceil(
        (returnD.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = totalDays * vehicle.pricePerDay;

    const booking = await Booking.create({
        user: userId,
        vehicle: vehicleId,
        pickupLocation,
        returnLocation,
        pickupDate: pickup,
        returnDate: returnD,
        totalDays,
        pricePerDay: vehicle.pricePerDay,
        totalPrice,
        status: "confirmed",
    });

    return booking.populate("vehicle");
}

export async function getUserBookings(userId: string): Promise<IBooking[]> {
    return Booking.find({ user: userId })
        .populate("vehicle")
        .sort({ createdAt: -1 });
}

export async function cancelBooking(
    bookingId: string,
    userId: string
): Promise<IBooking> {
    const booking = await Booking.findOne({ _id: bookingId, user: userId });

    if (!booking) {
        const error = new Error("Booking not found") as Error & { statusCode: number };
        error.statusCode = 404;
        throw error;
    }

    if (booking.status === "cancelled") {
        const error = new Error("Booking is already cancelled") as Error & { statusCode: number };
        error.statusCode = 400;
        throw error;
    }

    booking.status = "cancelled";
    await booking.save();
    return booking;
}