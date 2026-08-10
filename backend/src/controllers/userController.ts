import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
import User from "../models/User";
import { sendSuccess, sendError } from "../utils/apiResponse";

export async function getProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        if (!req.userId) {
            sendError(res, "Not authorized", 401);
            return;
        }

        const user = await User.findById(req.userId);
        if (!user) {
            sendError(res, "User not found", 404);
            return;
        }

        sendSuccess(res, {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone ?? "",
        });
    } catch (error) {
        next(error);
    }
}

export async function updateProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        if (!req.userId) {
            sendError(res, "Not authorized", 401);
            return;
        }

        const { name, email, phone } = req.body;

        if (email) {
            const existing = await User.findOne({
                email,
                _id: { $ne: req.userId },
            });
            if (existing) {
                sendError(res, "Email is already in use by another account", 409);
                return;
            }
        }

        const user = await User.findByIdAndUpdate(
            req.userId,
            { name, email, phone },
            { new: true, runValidators: true }
        );

        if (!user) {
            sendError(res, "User not found", 404);
            return;
        }

        sendSuccess(res, {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone ?? "",
        });
    } catch (error) {
        next(error);
    }
}