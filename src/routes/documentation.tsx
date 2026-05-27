import { createFileRoute } from '@tanstack/react-router';
import { BookOpen, ClipboardList, Database } from 'lucide-react';

export const Route = createFileRoute('/documentation')({
  component: DocumentationPage,
});

function DocumentationPage() {
  return (
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Documentation
          </h1>
          <p className="text-sm text-slate-500">
            Project documentation, testing rules and clinical process notes.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <DocumentationCard
              icon={ClipboardList}
              title="Testing rules"
              description="Basic rules for starting, tracking and completing medication testing processes."
          />

          <DocumentationCard
              icon={BookOpen}
              title="Reports"
              description="Summary of reports, success reactions and current testing statuses."
          />

          <DocumentationCard
              icon={Database}
              title="API notes"
              description="Data is loaded through TanStack Query. Current medical data is mocked where DummyJSON does not fit the domain."
          />
        </div>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-950">
            Implementation notes
          </h2>

          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <p>
              The project is built with React, TypeScript, Vite, TanStack Router,
              TanStack Query, Tailwind CSS and shadcn/ui.
            </p>

            <p>
              Dashboard and table data are loaded through a typed API layer.
              Some medical-domain information is mocked because DummyJSON does
              not contain clinical testing data.
            </p>

            <p>
              Authentication is implemented as a simple local demo flow with
              protected routes and localStorage.
            </p>
          </div>
        </section>
      </div>
  );
}

type DocumentationCardProps = {
  icon: typeof ClipboardList;
  title: string;
  description: string;
};

function DocumentationCard({
                             icon: Icon,
                             title,
                             description,
                           }: DocumentationCardProps) {
  return (
      <article className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" />
        </div>

        <h2 className="mt-4 text-base font-bold text-slate-950">{title}</h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
      </article>
  );
}