import type { AuthUser, StoredUser } from './types';

export function isAuthUser(value: unknown): value is AuthUser {
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

export function isStoredUser(value: unknown): value is StoredUser {
    if (!isAuthUser(value)) {
        return false;
    }

    const user = value as Record<string, unknown>;

    return typeof user.password === 'string';
}