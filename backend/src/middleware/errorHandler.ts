import type { Request, Response, NextFunction } from "express";

interface AppError extends Error {
    statusCode?: number;
    errors?: unknown;
}

export function errorHandler(
    err: AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    const statusCode = err.statusCode ?? 500;
    const message = err.message ?? "Internal Server Error";

    console.error(`[Error] ${statusCode} — ${message}`);

    res.status(statusCode).json({
        success: false,
        message,
        ...(err.errors !== undefined && { errors: err.errors }),
    });
}