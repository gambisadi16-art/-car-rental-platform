import Vehicle from "../models/Vehicle";
import type { IVehicle } from "../models/Vehicle";

export interface VehicleQuery {
    search?: string;
    category?: string;
    transmission?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    page?: number;
    limit?: number;
}

export interface PaginatedVehicles {
    vehicles: IVehicle[];
    total: number;
    page: number;
    totalPages: number;
}

export async function getVehicles(
    query: VehicleQuery
): Promise<PaginatedVehicles> {
    const {
        search,
        category,
        transmission,
        location,
        minPrice,
        maxPrice,
        sort = "recommended",
        page = 1,
        limit = 6,
    } = query;

    const filter: Record<string, unknown> = { isAvailable: true };

    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { brand: { $regex: search, $options: "i" } },
        ];
    }

    if (category) filter.category = category;
    if (transmission) filter.transmission = transmission;
    if (location) filter.locations = { $in: [location] };

    if (minPrice !== undefined || maxPrice !== undefined) {
        filter.pricePerDay = {};
        if (minPrice !== undefined)
            (filter.pricePerDay as Record<string, number>).$gte = minPrice;
        if (maxPrice !== undefined)
            (filter.pricePerDay as Record<string, number>).$lte = maxPrice;
    }

    let sortOption: Record<string, 1 | -1> = {};
    switch (sort) {
        case "price-asc": sortOption = { pricePerDay: 1 }; break;
        case "price-desc": sortOption = { pricePerDay: -1 }; break;
        case "rating-desc": sortOption = { rating: -1 }; break;
        default: sortOption = { createdAt: -1 };
    }

    const skip = (page - 1) * limit;
    const total = await Vehicle.countDocuments(filter);
    const vehicles = await Vehicle.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

    return { vehicles, total, page, totalPages: Math.ceil(total / limit) };
}

export async function getVehicleById(id: string): Promise<IVehicle | null> {
    return Vehicle.findById(id);
}

export async function getRelatedVehicles(
    id: string,
    category: string
): Promise<IVehicle[]> {
    return Vehicle.find({ _id: { $ne: id }, category, isAvailable: true }).limit(3);
}