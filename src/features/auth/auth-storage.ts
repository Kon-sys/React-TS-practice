import { isAuthUser, isStoredUser } from './auth-guards';

import type { AuthUser, StoredUser } from './types';

const AUTH_USER_KEY = 'testing-dashboard-current-user';
const AUTH_USERS_KEY = 'testing-dashboard-users';

export function getStoredUsers(): StoredUser[] {
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

export function saveStoredUsers(users: StoredUser[]) {
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

export function getStoredCurrentUser(): AuthUser | null {
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

export function saveStoredCurrentUser(user: AuthUser) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearStoredCurrentUser() {
    localStorage.removeItem(AUTH_USER_KEY);
}