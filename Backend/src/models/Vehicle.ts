import mongoose from "mongoose";

export interface IVehicle extends mongoose.Document {
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
    isAvailable: boolean;
    locations: string[];
}

const vehicleSchema = new mongoose.Schema<IVehicle>(
    {
        name: {
            type: String,
            required: [true, "Vehicle name is required"],
            trim: true,
        },
        brand: {
            type: String,
            required: [true, "Brand is required"],
            trim: true,
        },
        category: {
            type: String,
            enum: ["Economy", "SUV", "Luxury", "Sedan", "Convertible"],
            required: [true, "Category is required"],
        },
        pricePerDay: {
            type: Number,
            required: [true, "Price per day is required"],
            min: [0, "Price cannot be negative"],
        },
        imageUrl: {
            type: String,
            required: [true, "Image URL is required"],
        },
        seats: {
            type: Number,
            required: [true, "Number of seats is required"],
            min: [1, "Must have at least 1 seat"],
        },
        transmission: {
            type: String,
            enum: ["Automatic", "Manual"],
            required: [true, "Transmission type is required"],
        },
        fuelType: {
            type: String,
            enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
            required: [true, "Fuel type is required"],
        },
        year: {
            type: Number,
            required: [true, "Year is required"],
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        features: {
            type: [String],
            default: [],
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        locations: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

vehicleSchema.index({ brand: "text", name: "text" });

const Vehicle = mongoose.model<IVehicle>("Vehicle", vehicleSchema);

export default Vehicle;