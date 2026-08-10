import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { registerUser, loginUser, getUserById } from "../services/authService";
import { sendSuccess, sendError } from "../utils/apiResponse";
import type { AuthRequest } from "../middleware/authMiddleware";

export async function register(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            sendError(res, "Validation failed", 400, errors.array());
            return;
        }

        const { name, email, password } = req.body;
        const result = await registerUser(name, email, password);
        sendSuccess(res, result, "Account created successfully", 201);
    } catch (error) {
        next(error);
    }
}

export async function login(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            sendError(res, "Validation failed", 400, errors.array());
            return;
        }

        const { email, password } = req.body;
        const result = await loginUser(email, password);
        sendSuccess(res, result, "Login successful");
    } catch (error) {
        next(error);
    }
}

export async function getMe(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        if (!req.userId) {
            sendError(res, "Not authorized", 401);
            return;
        }

        const user = await getUserById(req.userId);
        if (!user) {
            sendError(res, "User not found", 404);
            return;
        }

        sendSuccess(res, {
            id: user.id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        next(error);
    }
}