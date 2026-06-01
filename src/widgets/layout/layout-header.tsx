import { Link } from '@tanstack/react-router';
import {
    Bell,
    CircleUserRound,
    Grid3X3,
    LogOut,
    Sun,
} from 'lucide-react';

import type { AuthUser } from '@/features/auth/types';

import { Button } from '@/components/ui/button';

import { MobileNavigation } from './mobile-navigation';
import { navItems } from './nav-items';

type LayoutHeaderProps = {
    user: AuthUser | null;
    onLogout: () => void;
};

export function LayoutHeader({ user, onLogout }: LayoutHeaderProps) {
    return (
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

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 ring-1 ring-slate-200 md:h-9 md:w-9">
                    <CircleUserRound className="h-5 w-5" />
                </div>

                <Button variant="ghost" size="icon" onClick={onLogout}>
                    <LogOut className="h-4 w-4" />
                </Button>
            </div>
        </header>
    );
}