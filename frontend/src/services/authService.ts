import api from "./api";
import type { User, UpdateProfileData } from "../types/auth";

interface AuthResponse {
    user: User;
    token: string;
}

export async function loginRequest(
    email: string,
    password: string
): Promise<AuthResponse> {
    const response = await api.post<{ data: AuthResponse }>("/auth/login", {
        email,
        password,
    });
    return response.data.data;
}

export async function registerRequest(
    name: string,
    email: string,
    password: string
): Promise<AuthResponse> {
    const response = await api.post<{ data: AuthResponse }>("/auth/register", {
        name,
        email,
        password,
    });
    return response.data.data;
}

export async function getMeRequest(): Promise<User> {
    const response = await api.get<{ data: User }>("/auth/me");
    return response.data.data;
}

export async function updateProfileRequest(
    data: UpdateProfileData
): Promise<User> {
    const response = await api.patch<{ data: User }>("/users/me", data);
    return response.data.data;
}