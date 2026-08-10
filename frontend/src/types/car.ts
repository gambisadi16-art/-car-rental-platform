export interface Car {
    id: string;
    name: string;
    brand: string;
    category: "Economy" | "SUV" | "Luxury" | "Sedan" | "Convertible";
    pricePerDay: number;
    imageUrl: string;
    seats: number;
    transmission: "Automatic" | "Manual";
    fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
    year: number;
    rating: number;
    description: string;
    features: string[];
    locations: string[];
}