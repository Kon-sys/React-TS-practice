import { createFileRoute } from '@tanstack/react-router';
import { Calendar, MapPin } from 'lucide-react';
import { useState } from 'react';

import { useEventDetailsQuery } from '@/entities/testing/queries';

import {
  EventActions,
  EventDescription,
  EventLocation,
  EventTags,
  InfoBlock,
  ManufacturerInfo,
  ProcessStatusCard,
} from '@/features/process/process-components';
import { downloadCalendarFile } from '@/features/process/process-calendar';

export const Route = createFileRoute('/process')({
  component: ProcessPage,
});

type ProcessStatus = 'not-started' | 'in-progress';

function ProcessPage() {
  const { data: event, isLoading, isError } = useEventDetailsQuery();
  const [processStatus, setProcessStatus] =
      useState<ProcessStatus>('not-started');

  if (isLoading) {
    return <div className="text-sm text-slate-500">Loading process...</div>;
  }

  if (isError || !event) {
    return <div className="text-sm text-red-500">Failed to load process</div>;
  }

  const currentEvent = event;
  const isProcessStarted = processStatus === 'in-progress';

  function handleStartProcess() {
    setProcessStatus('in-progress');
  }

  function handleAddToCalendar() {
    downloadCalendarFile(currentEvent);
  }

  return (
      <div className="flex flex-col gap-7 xl:flex-row">
        <div className="min-w-0 flex-1 space-y-8">
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {currentEvent.title}
              </h1>
              <p className="mt-1 text-sm text-slate-500">{currentEvent.place}</p>
            </div>

            <div className="mt-6 grid border border-slate-200 md:grid-cols-2">
              <InfoBlock icon={MapPin} title="Location" value={currentEvent.address} />

              <InfoBlock
                  icon={Calendar}
                  title="Date & Time"
                  value={`${currentEvent.date}\n${currentEvent.time}`}
              />
            </div>

            <ProcessStatusCard isProcessStarted={isProcessStarted} />

            <EventActions
                isProcessStarted={isProcessStarted}
                onStartProcess={handleStartProcess}
                onAddToCalendar={handleAddToCalendar}
            />
          </section>

          <EventDescription description={currentEvent.description} />
        </div>

        <aside className="w-full shrink-0 space-y-7 border-slate-200 xl:w-[390px] xl:border-l xl:pl-6">
          <ManufacturerInfo manufacturer={currentEvent.manufacturer} />
          <EventLocation event={currentEvent} />
          <EventTags tags={currentEvent.tags} />
        </aside>
      </div>
  );
}