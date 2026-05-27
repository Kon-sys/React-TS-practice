import { Link, Navigate, Outlet, useLocation } from '@tanstack/react-router';
import {
    Bell,
    FileText,
    Grid3X3,
    Home,
    LogOut,
    Menu,
    Network,
    Sun,
    Table2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

import { useAuth } from '@/features/auth/auth-provider';

const navItems = [
    {
        to: '/',
        label: 'Home',
        icon: Home,
    },
    {
        to: '/tables',
        label: 'Tables',
        icon: Table2,
    },
    {
        to: '/process',
        label: 'Process',
        icon: Network,
    },
    {
        to: '/documentation',
        label: 'Documentation',
        icon: FileText,
    },
] as const;

export function AppLayout() {
    const location = useLocation();
    const { isAuthenticated, logout, user } = useAuth();

    const isLoginPage = location.pathname === '/login';

    if (!isAuthenticated && !isLoginPage) {
        return <Navigate to="/login" />;
    }

    if (isAuthenticated && isLoginPage) {
        return <Navigate to="/" />;
    }

    if (isLoginPage) {
        return <Outlet />;
    }

    return (
        <div className="min-h-screen bg-[#f4f7fb] text-slate-900">
            <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
                <div className="flex items-center gap-3">
                    <MobileNavigation />

                    <Link to="/" className="text-sm font-bold text-slate-950 md:text-base">
                        Testing Dashboard
                    </Link>
                </div>

                <nav className="hidden items-center gap-9 md:flex">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                activeProps={{ className: 'text-blue-600' }}
                                className="flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-slate-950"
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        type="button"
                        className="hidden h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-orange-400 sm:flex"
                        aria-label="Toggle theme"
                    >
                        <Sun className="h-4 w-4" />
                    </button>

                    <Bell className="hidden h-4 w-4 text-slate-500 sm:block" />
                    <Grid3X3 className="hidden h-4 w-4 text-slate-500 sm:block" />

                    <div className="hidden text-right lg:block">
                        <p className="text-xs font-semibold text-slate-900">{user?.name}</p>
                        <p className="text-[11px] text-slate-500">{user?.email}</p>
                    </div>

                    <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-200 md:h-9 md:w-9">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                            alt="User avatar"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <Button variant="ghost" size="icon" onClick={logout}>
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </header>

            <Separator />

            <main className="mx-auto max-w-[1440px] px-4 py-5 md:px-5 md:py-7">
                <Outlet />
            </main>
        </div>
    );
}

function MobileNavigation() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-72">
                <div className="space-y-6">
                    <SheetHeader>
                        <SheetTitle>Testing Dashboard</SheetTitle>
                        <SheetDescription>
                            Medication testing analytics
                        </SheetDescription>
                    </SheetHeader>

                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <SheetClose key={item.to} asChild>
                                    <Link
                                        to={item.to}
                                        activeProps={{ className: 'bg-blue-50 text-blue-600' }}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </SheetClose>
                            );
                        })}
                    </nav>
                </div>
            </SheetContent>
        </Sheet>
    );
}