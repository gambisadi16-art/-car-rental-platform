import type { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import type { AuthRequest } from "../middleware/authMiddleware";
import {
    createBooking,
    getUserBookings,
    cancelBooking,
    checkAvailability,
} from "../services/bookingService";
import { sendSuccess, sendError } from "../utils/apiResponse";

export async function create(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            sendError(res, "Validation failed", 400, errors.array());
            return;
        }

        if (!req.userId) {
            sendError(res, "Not authorized", 401);
            return;
        }

        const booking = await createBooking({
            userId: req.userId,
            ...req.body,
        });

        sendSuccess(res, booking, "Booking created successfully", 201);
    } catch (error) {
        next(error);
    }
}

export async function getMyBookings(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        if (!req.userId) {
            sendError(res, "Not authorized", 401);
            return;
        }

        const bookings = await getUserBookings(req.userId);
        sendSuccess(res, bookings);
    } catch (error) {
        next(error);
    }
}

export async function cancel(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        if (!req.userId) {
            sendError(res, "Not authorized", 401);
            return;
        }

        const booking = await cancelBooking(req.params.id, req.userId);
        sendSuccess(res, booking, "Booking cancelled successfully");
    } catch (error) {
        next(error);
    }
}

export async function getAvailability(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { pickupDate, returnDate } = req.query;

        if (!pickupDate || !returnDate) {
            sendError(res, "pickupDate and returnDate are required", 400);
            return;
        }

        const available = await checkAvailability(
            req.params.vehicleId,
            pickupDate as string,
            returnDate as string
        );

        sendSuccess(res, { available });
    } catch (error) {
        next(error);
    }
}