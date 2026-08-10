import type { Request, Response, NextFunction } from "express";
import {
    getVehicles,
    getVehicleById,
    getRelatedVehicles,
} from "../services/vehicleService";
import { sendSuccess, sendError } from "../utils/apiResponse";

export async function listVehicles(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const {
            search, category, transmission, location,
            minPrice, maxPrice, sort, page, limit,
        } = req.query;

        const result = await getVehicles({
            search: search as string,
            category: category as string,
            transmission: transmission as string,
            location: location as string,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            sort: sort as string,
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 6,
        });

        sendSuccess(res, result);
    } catch (error) {
        next(error);
    }
}

export async function getVehicle(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const vehicle = await getVehicleById(req.params.id);
        if (!vehicle) { sendError(res, "Vehicle not found", 404); return; }
        sendSuccess(res, vehicle);
    } catch (error) {
        next(error);
    }
}

export async function getRelated(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const vehicle = await getVehicleById(req.params.id);
        if (!vehicle) { sendError(res, "Vehicle not found", 404); return; }
        const related = await getRelatedVehicles(req.params.id, vehicle.category);
        sendSuccess(res, related);
    } catch (error) {
        next(error);
    }
}