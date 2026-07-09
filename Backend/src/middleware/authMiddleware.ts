import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sendError } from "../utils/apiResponse";

export interface AuthRequest extends Request {
    userId?: string;
}

interface JwtPayload {
    id: string;
}

export function protect(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        sendError(res, "Not authorized. No token provided.", 401);
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT_SECRET is not defined");

        const decoded = jwt.verify(token, secret) as JwtPayload;
        req.userId = decoded.id;
        next();
    } catch {
        sendError(res, "Not authorized. Invalid or expired token.", 401);
    }
}