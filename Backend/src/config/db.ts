import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error(
                "MONGODB_URI is not defined. Please check your .env file."
            );
        }

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`MongoDB connection error: ${error.message}`);
        } else {
            console.error("MongoDB connection error: Unknown error");
        }
        process.exit(1);
    }
};