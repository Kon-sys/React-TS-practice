import { createFileRoute } from '@tanstack/react-router';
import { Calendar, CheckCircle2, Clock, MapPin, Navigation } from 'lucide-react';
import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';

import { useEventDetailsQuery } from '@/entities/testing/queries';
import type { EventDetails } from '@/entities/testing/types';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/process')({
  component: ProcessPage,
});

type ProcessStatus = 'not-started' | 'in-progress';

function ProcessPage() {
  const { data: event, isLoading, isError } = useEventDetailsQuery();
  const [processStatus, setProcessStatus] = useState<ProcessStatus>('not-started');

  if (isLoading) {
    return <div className="text-sm text-slate-500">Loading process...</div>;
  }

  if (isError || !event) {
    return <div className="text-sm text-red-500">Failed to load process</div>;
  }

  const isProcessStarted = processStatus === 'in-progress';

  function handleStartProcess() {
    setProcessStatus('in-progress');
  }

  function handleAddToCalendar() {
    downloadCalendarFile(event);
  }

  return (
      <div className="flex flex-col gap-7 xl:flex-row">
        <div className="min-w-0 flex-1 space-y-8">
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {event.title}
              </h1>
              <p className="mt-1 text-sm text-slate-500">{event.place}</p>
            </div>

            <div className="mt-6 grid border border-slate-200 md:grid-cols-2">
              <InfoBlock icon={MapPin} title="Location" value={event.address} />

              <InfoBlock
                  icon={Calendar}
                  title="Date & Time"
                  value={`${event.date}\n${event.time}`}
              />
            </div>

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
                    <p className="text-sm font-bold text-slate-950">
                      Process status
                    </p>
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

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <Button
                  className="h-11 rounded bg-blue-600 text-white hover:bg-blue-700"
                  disabled={isProcessStarted}
                  onClick={handleStartProcess}
              >
                {isProcessStarted ? 'Process Started' : 'Start Process'}
              </Button>

              <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded"
                  onClick={handleAddToCalendar}
              >
                <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                Add to Calendar
              </Button>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              About this event
            </h2>

            <p className="max-w-4xl text-sm leading-7 text-slate-600">
              {event.description}
            </p>
          </section>
        </div>

        <aside className="w-full shrink-0 space-y-7 border-slate-200 xl:w-[390px] xl:border-l xl:pl-6">
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
              <a
                  href={getDirectionsUrl(event)}
                  target="_blank"
                  rel="noreferrer"
              >
                <Navigation className="mr-2 h-4 w-4 text-blue-600" />
                Get directions
              </a>
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
  icon: LucideIcon;
  title: string;
  value: string;
};

function InfoBlock({ icon: Icon, title, value }: InfoBlockProps) {
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

function getMapEmbedUrl(event: EventDetails) {
  const latitudeOffset = 0.005;
  const longitudeOffset = 0.0074;

  const minLongitude = event.longitude - longitudeOffset;
  const minLatitude = event.latitude - latitudeOffset;
  const maxLongitude = event.longitude + longitudeOffset;
  const maxLatitude = event.latitude + latitudeOffset;

  return `https://www.openstreetmap.org/export/embed.html?bbox=${minLongitude}%2C${minLatitude}%2C${maxLongitude}%2C${maxLatitude}&layer=mapnik&marker=${event.latitude}%2C${event.longitude}`;
}

function getDirectionsUrl(event: EventDetails) {
  return `https://www.openstreetmap.org/?mlat=${event.latitude}&mlon=${event.longitude}#map=15/${event.latitude}/${event.longitude}`;
}

function downloadCalendarFile(event: EventDetails) {
  const calendarContent = buildCalendarContent(event);
  const blob = new Blob([calendarContent], {
    type: 'text/calendar;charset=utf-8',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `${createFileSafeName(event.title)}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

function buildCalendarContent(event: EventDetails) {
  const createdAt = formatDateForCalendar(new Date());
  const startDate = formatDateForCalendar(new Date(event.calendarStart));
  const endDate = formatDateForCalendar(new Date(event.calendarEnd));

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Testing Dashboard//Clinical Process//EN',
    'BEGIN:VEVENT',
    `UID:${createCalendarUid(event)}`,
    `DTSTAMP:${createdAt}`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${escapeCalendarText(event.title)}`,
    `LOCATION:${escapeCalendarText(event.address)}`,
    `DESCRIPTION:${escapeCalendarText(event.description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

function formatDateForCalendar(date: Date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function escapeCalendarText(value: string) {
  return value
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
}

function createCalendarUid(event: EventDetails) {
  return `${createFileSafeName(event.title)}-${event.calendarStart}@testing-dashboard`;
}

function createFileSafeName(value: string) {
  return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
}