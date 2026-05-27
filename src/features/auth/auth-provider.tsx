import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import type { PropsWithChildren } from 'react';

import type { AuthUser, LoginPayload } from './types';

const AUTH_STORAGE_KEY = 'testing-dashboard-user';

const TEST_USER: AuthUser = {
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
};

const TEST_CREDENTIALS = {
    email: 'admin@example.com',
    password: 'admin123',
};

type AuthContextValue = {
    user: AuthUser | null;
    isAuthenticated: boolean;
    login: (payload: LoginPayload) => boolean;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function isAuthUser(value: unknown): value is AuthUser {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const user = value as Record<string, unknown>;

    return (
        typeof user.email === 'string' &&
        typeof user.name === 'string' &&
        user.role === 'admin'
    );
}

function getStoredUser(): AuthUser | null {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedUser) {
        return null;
    }

    try {
        const parsedUser: unknown = JSON.parse(storedUser);

        if (isAuthUser(parsedUser)) {
            return parsedUser;
        }

        return null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

    const login = useCallback((payload: LoginPayload) => {
        const isValidCredentials =
            payload.email === TEST_CREDENTIALS.email &&
            payload.password === TEST_CREDENTIALS.password;

        if (!isValidCredentials) {
            return false;
        }

        setUser(TEST_USER);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(TEST_USER));

        return true;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            isAuthenticated: user !== null,
            login,
            logout,
        }),
        [login, logout, user],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return context;
}