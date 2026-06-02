import { Navigate, Outlet, useLocation } from '@tanstack/react-router';

import { Separator } from '@/components/ui/separator';

import { useAuth } from '@/features/auth/auth-provider';

import { LayoutHeader } from './layout-header';

export function AppLayout() {
    const location = useLocation();
    const { isAuthenticated, logout, user } = useAuth();

    const isAuthPage =
        location.pathname === '/login' || location.pathname === '/register';

    if (!isAuthenticated && !isAuthPage) {
        return <Navigate to="/login" />;
    }

    if (isAuthenticated && isAuthPage) {
        return <Navigate to="/" />;
    }

    if (isAuthPage) {
        return <Outlet />;
    }

    return (
        <div className="min-h-screen bg-[#f4f7fb] text-slate-900">
            <LayoutHeader user={user} onLogout={logout} />

            <Separator />

            <main className="mx-auto max-w-[1440px] px-4 py-5 md:px-5 md:py-7">
                <Outlet />
            </main>
        </div>
    );
}