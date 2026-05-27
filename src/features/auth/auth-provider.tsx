import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import type { PropsWithChildren } from 'react';

import type {
    AuthUser,
    LoginPayload,
    RegisterPayload,
    StoredUser,
} from './types';

const AUTH_USER_KEY = 'testing-dashboard-current-user';
const AUTH_USERS_KEY = 'testing-dashboard-users';

type AuthContextValue = {
    user: AuthUser | null;
    isAuthenticated: boolean;
    login: (payload: LoginPayload) => string | null;
    register: (payload: RegisterPayload) => string | null;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function normalizeEmail(email: string) {
    return email.trim().toLowerCase();
}

function createUserId() {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function isAuthUser(value: unknown): value is AuthUser {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const user = value as Record<string, unknown>;

    return (
        typeof user.id === 'string' &&
        typeof user.name === 'string' &&
        typeof user.email === 'string' &&
        user.role === 'user'
    );
}

function isStoredUser(value: unknown): value is StoredUser {
    if (!isAuthUser(value)) {
        return false;
    }

    const user = value as Record<string, unknown>;

    return typeof user.password === 'string';
}

function getStoredUsers(): StoredUser[] {
    const storedUsers = localStorage.getItem(AUTH_USERS_KEY);

    if (!storedUsers) {
        return [];
    }

    try {
        const parsedUsers: unknown = JSON.parse(storedUsers);

        if (!Array.isArray(parsedUsers)) {
            return [];
        }

        return parsedUsers.filter(isStoredUser);
    } catch {
        return [];
    }
}

function saveStoredUsers(users: StoredUser[]) {
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function getStoredCurrentUser(): AuthUser | null {
    const storedUser = localStorage.getItem(AUTH_USER_KEY);

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
    const [user, setUser] = useState<AuthUser | null>(() =>
        getStoredCurrentUser(),
    );

    const login = useCallback((payload: LoginPayload) => {
        const email = normalizeEmail(payload.email);
        const password = payload.password;

        if (!email || !password) {
            return 'Email and password are required';
        }

        const users = getStoredUsers();
        const foundUser = users.find((item) => item.email === email);

        if (!foundUser || foundUser.password !== password) {
            return 'Invalid email or password';
        }

        const currentUser: AuthUser = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
        };

        setUser(currentUser);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(currentUser));

        return null;
    }, []);

    const register = useCallback((payload: RegisterPayload) => {
        const name = payload.name.trim();
        const email = normalizeEmail(payload.email);
        const password = payload.password;

        if (name.length < 2) {
            return 'Name must contain at least 2 characters';
        }

        if (!email.includes('@') || !email.includes('.')) {
            return 'Enter a valid email';
        }

        if (password.length < 6) {
            return 'Password must contain at least 6 characters';
        }

        const users = getStoredUsers();
        const isEmailTaken = users.some((item) => item.email === email);

        if (isEmailTaken) {
            return 'User with this email already exists';
        }

        const newUser: StoredUser = {
            id: createUserId(),
            name,
            email,
            password,
            role: 'user',
        };

        saveStoredUsers([...users, newUser]);

        const currentUser: AuthUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        };

        setUser(currentUser);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(currentUser));

        return null;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem(AUTH_USER_KEY);
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            isAuthenticated: user !== null,
            login,
            register,
            logout,
        }),
        [login, logout, register, user],
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