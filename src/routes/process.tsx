import { createFileRoute } from '@tanstack/react-router';
import { Calendar, MapPin, Navigation } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { useEventDetailsQuery } from '@/entities/testing/queries';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/process')({
  component: ProcessPage,
});

const eventPosition: [number, number] = [40.6638, -73.9235];

function ProcessPage() {
  const { data: event, isLoading, isError } = useEventDetailsQuery();

  if (isLoading) {
    return <div className="text-sm text-slate-500">Loading process...</div>;
  }

  if (isError || !event) {
    return <div className="text-sm text-red-500">Failed to load process</div>;
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

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <Button className="h-11 rounded bg-blue-600 text-white hover:bg-blue-700">
                Start Process
              </Button>

              <Button variant="outline" className="h-11 rounded">
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
              <MapContainer
                  center={eventPosition}
                  zoom={14}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  dragging={false}
                  className="h-full w-full grayscale"
              >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <CircleMarker
                    center={eventPosition}
                    radius={8}
                    pathOptions={{
                      color: '#2563eb',
                      fillColor: '#2563eb',
                      fillOpacity: 0.9,
                    }}
                >
                  <Popup>{event.address}</Popup>
                </CircleMarker>
              </MapContainer>
            </div>

            <div className="flex items-start justify-between gap-4 text-xs text-slate-500">
              <span>{event.address}</span>
              <span className="shrink-0">Brooklyn New York</span>
            </div>

            <Button asChild variant="outline" className="w-full">
              <a
                  href="https://www.openstreetmap.org/?mlat=40.6638&mlon=-73.9235#map=15/40.6638/-73.9235"
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