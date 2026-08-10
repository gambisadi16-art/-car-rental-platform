export interface Booking {
    id: string;
    carId: string;
    carName: string;
    carBrand: string;
    carImageUrl: string;
    pickupLocation: string;
    returnLocation: string;
    pickupDate: string;
    returnDate: string;
    pricePerDay: number;
    totalDays: number;
    totalPrice: number;
    status: "confirmed" | "pending" | "cancelled";
}

export interface BookingFormData {
    pickupLocation: string;
    returnLocation: string;
    pickupDate: string;
    returnDate: string;
}