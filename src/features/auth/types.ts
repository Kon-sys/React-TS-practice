export type AuthUser = {
    email: string;
    name: string;
    role: 'admin';
};

export type LoginPayload = {
    email: string;
    password: string;
};