import mongoose from "mongoose";

export interface IBooking extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    vehicle: mongoose.Types.ObjectId;
    pickupLocation: string;
    returnLocation: string;
    pickupDate: Date;
    returnDate: Date;
    totalDays: number;
    pricePerDay: number;
    totalPrice: number;
    status: "confirmed" | "pending" | "cancelled";
}

const bookingSchema = new mongoose.Schema<IBooking>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },
        pickupLocation: {
            type: String,
            required: [true, "Pickup location is required"],
            trim: true,
        },
        returnLocation: {
            type: String,
            required: [true, "Return location is required"],
            trim: true,
        },
        pickupDate: {
            type: Date,
            required: [true, "Pickup date is required"],
        },
        returnDate: {
            type: Date,
            required: [true, "Return date is required"],
        },
        totalDays: {
            type: Number,
            required: true,
            min: [1, "Booking must be at least 1 day"],
        },
        pricePerDay: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["confirmed", "pending", "cancelled"],
            default: "confirmed",
        },
    },
    { timestamps: true }
);

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;