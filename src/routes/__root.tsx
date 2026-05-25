import { Link, Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
    component: RootLayout,
});

function RootLayout() {
    return (
        <div className="min-h-screen bg-slate-50">
            <header className="border-b bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link to="/" className="text-xl font-bold text-slate-950">
                        Demo Dashboard
                    </Link>

                    <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
                        <Link to="/" activeProps={{ className: 'text-slate-950' }}>
                            Home
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-8">
                <Outlet />
            </main>
        </div>
    );
}