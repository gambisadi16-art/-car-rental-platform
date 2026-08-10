import type { Booking } from "../types/booking";

export const mockBookings: Booking[] = [
    {
        id: "BK-001",
        carId: "1",
        carName: "Model S",
        carBrand: "Tesla",
        carImageUrl:
            "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=800&q=80",
        pickupLocation: "New York JFK Airport",
        returnLocation: "New York JFK Airport",
        pickupDate: "2026-07-10",
        returnDate: "2026-07-15",
        pricePerDay: 129,
        totalDays: 5,
        totalPrice: 645,
        status: "confirmed",
    },
    {
        id: "BK-002",
        carId: "5",
        carName: "3 Series",
        carBrand: "BMW",
        carImageUrl:
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
        pickupLocation: "Los Angeles LAX",
        returnLocation: "Los Angeles LAX",
        pickupDate: "2026-06-01",
        returnDate: "2026-06-04",
        pricePerDay: 109,
        totalDays: 3,
        totalPrice: 327,
        status: "confirmed",
    },
    {
        id: "BK-003",
        carId: "3",
        carName: "Mustang GT",
        carBrand: "Ford",
        carImageUrl:
            "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=800&q=80",
        pickupLocation: "Miami International Airport",
        returnLocation: "Miami International Airport",
        pickupDate: "2026-05-20",
        returnDate: "2026-05-22",
        pricePerDay: 99,
        totalDays: 2,
        totalPrice: 198,
        status: "cancelled",
    },
];