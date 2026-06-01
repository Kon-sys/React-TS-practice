import { Calendar, CheckCircle2, Clock, Navigation } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { EventDetails } from '@/entities/testing/types';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { getDirectionsUrl, getMapEmbedUrl } from './process-map';

type InfoBlockProps = {
    icon: LucideIcon;
    title: string;
    value: string;
};

export function InfoBlock({ icon: Icon, title, value }: InfoBlockProps) {
    return (
        <div className="flex gap-4 border-slate-200 p-5 first:border-b md:first:border-b-0 md:first:border-r">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-sky-100 text-sky-500">
                <Icon className="h-4 w-4" />
            </div>

            <div>
                <h3 className="font-bold text-slate-950">{title}</h3>
                <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-500">
                    {value}
                </p>
            </div>
        </div>
    );
}

type ProcessStatusCardProps = {
    isProcessStarted: boolean;
};

export function ProcessStatusCard({
                                      isProcessStarted,
                                  }: ProcessStatusCardProps) {
    return (
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        {isProcessStarted ? (
                            <CheckCircle2 className="h-4 w-4" />
                        ) : (
                            <Clock className="h-4 w-4" />
                        )}
                    </div>

                    <div>
                        <p className="text-sm font-bold text-slate-950">Process status</p>
                        <p className="mt-1 text-sm text-slate-500">
                            {isProcessStarted
                                ? 'Clinical testing process is now in progress.'
                                : 'Process is ready to be started.'}
                        </p>
                    </div>
                </div>

                <Badge variant="secondary">
                    {isProcessStarted ? 'In progress' : 'Not started'}
                </Badge>
            </div>
        </div>
    );
}

type EventActionsProps = {
    isProcessStarted: boolean;
    onStartProcess: () => void;
    onAddToCalendar: () => void;
};

export function EventActions({
                                 isProcessStarted,
                                 onStartProcess,
                                 onAddToCalendar,
                             }: EventActionsProps) {
    return (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
            <Button
                className="h-11 rounded bg-blue-600 text-white hover:bg-blue-700"
                disabled={isProcessStarted}
                onClick={onStartProcess}
            >
                {isProcessStarted ? 'Process Started' : 'Start Process'}
            </Button>

            <Button
                type="button"
                variant="outline"
                className="h-11 rounded"
                onClick={onAddToCalendar}
            >
                <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                Add to Calendar
            </Button>
        </div>
    );
}

type EventDescriptionProps = {
    description: string;
};

export function EventDescription({ description }: EventDescriptionProps) {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                About this event
            </h2>

            <p className="max-w-4xl text-sm leading-7 text-slate-600">
                {description}
            </p>
        </section>
    );
}

type ManufacturerInfoProps = {
    manufacturer: string;
};

export function ManufacturerInfo({ manufacturer }: ManufacturerInfoProps) {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-950">Manufacturer</h2>

            <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded bg-indigo-950" />
                <p className="text-sm text-slate-500">{manufacturer}</p>
            </div>
        </section>
    );
}

type EventLocationProps = {
    event: EventDetails;
};

export function EventLocation({ event }: EventLocationProps) {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-950">Location</h2>

            <div className="h-40 overflow-hidden rounded bg-slate-200">
                <iframe
                    title="Event location map"
                    src={getMapEmbedUrl(event)}
                    className="h-full w-full border-0 grayscale"
                    loading="lazy"
                />
            </div>

            <div className="flex items-start justify-between gap-4 text-xs text-slate-500">
                <span>{event.address}</span>
                <span className="shrink-0">{event.city}</span>
            </div>

            <Button asChild variant="outline" className="w-full">
                <a href={getDirectionsUrl(event)} target="_blank" rel="noreferrer">
                    <Navigation className="mr-2 h-4 w-4 text-blue-600" />
                    Get directions
                </a>
            </Button>
        </section>
    );
}

type EventTagsProps = {
    tags: string[];
};

export function EventTags({ tags }: EventTagsProps) {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-950">Tags</h2>

            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                        {tag}
                    </Badge>
                ))}
            </div>
        </section>
    );
}