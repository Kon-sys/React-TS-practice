import type { AuthUser, LoginPayload, RegisterPayload, StoredUser } from './types';

export function normalizeEmail(email: string) {
    return email.trim().toLowerCase();
}

export function createUserId() {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function toAuthUser(user: StoredUser): AuthUser {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
}

export function validateLoginPayload(payload: LoginPayload) {
    const email = normalizeEmail(payload.email);
    const password = payload.password;

    if (!email || !password) {
        return {
            email,
            password,
            error: 'Email and password are required',
        };
    }

    return {
        email,
        password,
        error: null,
    };
}

export function validateRegisterPayload(payload: RegisterPayload) {
    const name = payload.name.trim();
    const email = normalizeEmail(payload.email);
    const password = payload.password;

    if (name.length < 2) {
        return {
            name,
            email,
            password,
            error: 'Name must contain at least 2 characters',
        };
    }

    if (!email.includes('@') || !email.includes('.')) {
        return {
            name,
            email,
            password,
            error: 'Enter a valid email',
        };
    }

    if (password.length < 6) {
        return {
            name,
            email,
            password,
            error: 'Password must contain at least 6 characters',
        };
    }

    return {
        name,
        email,
        password,
        error: null,
    };
}