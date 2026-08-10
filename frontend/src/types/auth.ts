export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    updateProfile: (data: UpdateProfileData) => Promise<void>;
    logout: () => void;
}

export interface UpdateProfileData {
    name: string;
    email: string;
    phone?: string;
}