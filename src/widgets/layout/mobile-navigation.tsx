import { Link } from '@tanstack/react-router';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

import { navItems } from './nav-items';

export function MobileNavigation() {
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