import jwt from "jsonwebtoken";
import User, { type IUser } from "../models/User";

interface AuthPayload {
    user: {
        id: string;
        name: string;
        email: string;
    };
    token: string;
}

function generateToken(userId: string): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");
    return jwt.sign({ id: userId }, secret, { expiresIn: "7d" });
}

export async function registerUser(
    name: string,
    email: string,
    password: string
): Promise<AuthPayload> {
    const existing = await User.findOne({ email });
    if (existing) {
        const error = new Error("An account with this email already exists") as Error & { statusCode: number };
        error.statusCode = 409;
        throw error;
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user.id);

    return {
        user: { id: user.id, name: user.name, email: user.email },
        token,
    };
}

export async function loginUser(
    email: string,
    password: string
): Promise<AuthPayload> {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        const error = new Error("Invalid email or password") as Error & { statusCode: number };
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        const error = new Error("Invalid email or password") as Error & { statusCode: number };
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken(user.id);

    return {
        user: { id: user.id, name: user.name, email: user.email },
        token,
    };
}

export async function getUserById(
    id: string
): Promise<IUser | null> {
    return User.findById(id);
}