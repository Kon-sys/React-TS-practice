import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import type { PropsWithChildren } from 'react';

import {
    clearStoredCurrentUser,
    getStoredCurrentUser,
    getStoredUsers,
    saveStoredCurrentUser,
    saveStoredUsers,
} from './auth-storage';
import {
    createUserId,
    toAuthUser,
    validateLoginPayload,
    validateRegisterPayload,
} from './auth-utils';

import type {
    AuthUser,
    LoginPayload,
    RegisterPayload,
    StoredUser,
} from './types';

type AuthContextValue = {
    user: AuthUser | null;
    isAuthenticated: boolean;
    login: (payload: LoginPayload) => string | null;
    register: (payload: RegisterPayload) => string | null;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<AuthUser | null>(() =>
        getStoredCurrentUser(),
    );

    const login = useCallback((payload: LoginPayload) => {
        const { email, password, error } = validateLoginPayload(payload);

        if (error) {
            return error;
        }

        const users = getStoredUsers();
        const foundUser = users.find((item) => item.email === email);

        if (!foundUser || foundUser.password !== password) {
            return 'Invalid email or password';
        }

        const currentUser = toAuthUser(foundUser);

        setUser(currentUser);
        saveStoredCurrentUser(currentUser);

        return null;
    }, []);

    const register = useCallback((payload: RegisterPayload) => {
        const { name, email, password, error } = validateRegisterPayload(payload);

        if (error) {
            return error;
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

        const currentUser = toAuthUser(newUser);

        setUser(currentUser);
        saveStoredCurrentUser(currentUser);

        return null;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        clearStoredCurrentUser();
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