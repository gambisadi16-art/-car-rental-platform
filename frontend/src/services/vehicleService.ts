import api from "./api";
import type { Car } from "../types/car";

export interface VehicleFilters {
    search?: string;
    category?: string;
    transmission?: string;
    location?: string;
    maxPrice?: number;
    sort?: string;
    page?: number;
    limit?: number;
}

export interface PaginatedVehicles {
    vehicles: Car[];
    total: number;
    page: number;
    totalPages: number;
}

function mapVehicle(v: Record<string, unknown>): Car {
    return {
        id: (v._id as string) ?? (v.id as string),
        name: v.name as string,
        brand: v.brand as string,
        category: v.category as Car["category"],
        pricePerDay: v.pricePerDay as number,
        imageUrl: v.imageUrl as string,
        seats: v.seats as number,
        transmission: v.transmission as Car["transmission"],
        fuelType: v.fuelType as Car["fuelType"],
        year: v.year as number,
        rating: v.rating as number,
        description: v.description as string,
        features: v.features as string[],
        locations: (v.locations as string[]) ?? [],
    };
}

export async function fetchVehicles(
    filters: VehicleFilters = {}
): Promise<PaginatedVehicles> {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.category) params.append("category", filters.category);
    if (filters.transmission) params.append("transmission", filters.transmission);
    if (filters.location) params.append("location", filters.location);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
    if (filters.sort) params.append("sort", filters.sort);
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    const response = await api.get<{
        data: {
            vehicles: Record<string, unknown>[];
            total: number;
            page: number;
            totalPages: number;
        };
    }>(`/vehicles?${params.toString()}`);

    const { vehicles, total, page, totalPages } = response.data.data;
    return { vehicles: vehicles.map(mapVehicle), total, page, totalPages };
}

export async function fetchVehicleById(id: string): Promise<Car> {
    const response = await api.get<{ data: Record<string, unknown> }>(
        `/vehicles/${id}`
    );
    return mapVehicle(response.data.data);
}

export async function fetchRelatedVehicles(id: string): Promise<Car[]> {
    const response = await api.get<{ data: Record<string, unknown>[] }>(
        `/vehicles/${id}/related`
    );
    return response.data.data.map(mapVehicle);
}