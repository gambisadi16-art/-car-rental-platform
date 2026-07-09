import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import type { User, AuthContextType, UpdateProfileData } from "../types/auth";
import {
    loginRequest,
    registerRequest,
    getMeRequest,
    updateProfileRequest,
} from "../services/authService";

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = "drivelux_token";
const USER_KEY = "drivelux_user";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem(TOKEN_KEY);
            const storedUser = localStorage.getItem(USER_KEY);

            if (!token || !storedUser) {
                setIsLoading(false);
                return;
            }

            try {
                const freshUser = await getMeRequest();
                setUser(freshUser);
                localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
            } catch {
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(USER_KEY);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        const { user, token } = await loginRequest(email, password);
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        setUser(user);
    };

    const register = async (
        name: string,
        email: string,
        password: string
    ): Promise<void> => {
        const { user, token } = await registerRequest(name, email, password);
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        setUser(user);
    };

    const updateProfile = async (data: UpdateProfileData): Promise<void> => {
        const updatedUser = await updateProfileRequest(data);
        setUser(updatedUser);
        localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                updateProfile,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}