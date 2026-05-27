import { createFileRoute } from '@tanstack/react-router';
import { Calendar, MapPin, Navigation } from 'lucide-react';

import { useEventDetailsQuery } from '@/entities/testing/queries';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const Route = createFileRoute('/process')({
    component: ProcessPage,
});

function ProcessPage() {
    const { data: event, isLoading } = useEventDetailsQuery();

    if (isLoading || !event) {
        return <Skeleton className="h-[500px] w-full" />;
    }

    return (
        <div className="grid gap-7 xl:grid-cols-[1fr_390px]">
            <div className="space-y-8">
                <Card>
                    <CardContent className="space-y-6 p-5">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-950">{event.title}</h1>
                            <p className="mt-1 text-sm text-slate-500">{event.place}</p>
                        </div>

                        <div className="grid border border-slate-200 md:grid-cols-2">
                            <InfoBlock
                                icon={MapPin}
                                title="Location"
                                value={event.address}
                            />

                            <InfoBlock
                                icon={Calendar}
                                title="Date & Time"
                                value={`${event.date}\n${event.time}`}
                            />
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            <Button className="h-11 rounded bg-blue-600 text-white hover:bg-blue-700">
                                Start Process
                            </Button>

                            <Button variant="outline" className="h-11 rounded">
                                <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                                Add to Calendar
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <section className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-950">About this event</h2>
                    <p className="max-w-4xl text-sm leading-7 text-slate-600">{event.description}</p>
                </section>
            </div>

            <aside className="space-y-7 border-l border-slate-200 pl-6">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-950">Manufacturer</h2>

                    <div className="flex items-center gap-4">
                        <div className="h-9 w-9 rounded bg-indigo-950" />
                        <p className="text-sm text-slate-500">{event.manufacturer}</p>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-950">Location</h2>

                    <div className="h-40 overflow-hidden rounded bg-slate-200">
                        <img
                            src={event.mapImageUrl}
                            alt="Map"
                            className="h-full w-full object-cover grayscale"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-4 text-xs text-slate-500">
                        <span>{event.address}</span>
                        <span>Brooklyn New York</span>
                    </div>

                    <Button variant="outline" className="w-full">
                        <Navigation className="mr-2 h-4 w-4 text-blue-600" />
                        Get directions
                    </Button>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-950">Tags</h2>

                    <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </section>
            </aside>
        </div>
    );
}

type InfoBlockProps = {
    icon: typeof MapPin;
    title: string;
    value: string;
};

function InfoBlock({ icon: Icon, title, value }: InfoBlockProps) {
    return (
        <div className="flex gap-4 border-slate-200 p-5 first:border-r">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-sky-100 text-sky-500">
                <Icon className="h-4 w-4" />
            </div>

            <div>
                <h3 className="font-bold text-slate-950">{title}</h3>
                <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-500">{value}</p>
            </div>
        </div>
    );
}