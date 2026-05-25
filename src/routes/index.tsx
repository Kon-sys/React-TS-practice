import { createFileRoute } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/')({
    component: HomePage,
});

function HomePage() {
    return (
        <section className="space-y-6">
            <div className="space-y-2">
                <p className="text-sm font-medium text-slate-500">React + TypeScript + Vite</p>
                <h1 className="text-4xl font-bold tracking-tight text-slate-950">
                    Demo Dashboard
                </h1>
                <p className="max-w-2xl text-slate-600">
                    SPA-приложение с TanStack Router, TanStack Query, Tailwind CSS,
                    shadcn/ui и графиками.
                </p>
            </div>

            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Первый экран готов</CardTitle>
                    <CardDescription>
                        Сейчас мы проверяем, что роутинг, Tailwind и shadcn/ui работают.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Button>Проверка shadcn/ui</Button>
                </CardContent>
            </Card>
        </section>
    );
}