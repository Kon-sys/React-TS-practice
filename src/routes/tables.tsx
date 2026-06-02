import { createFileRoute } from '@tanstack/react-router';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

import { useMedicinesQuery } from '@/entities/testing/queries';

import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/tables')({
  component: TablesPage,
});

const PAGE_SIZE = 6;

function TablesPage() {
  const [page, setPage] = useState(1);

  const {
    data: medicinesData,
    isLoading,
    isError,
    isFetching,
  } = useMedicinesQuery(page, PAGE_SIZE);

  if (isLoading) {
    return <div className="text-sm text-slate-500">Loading table...</div>;
  }

  if (isError || !medicinesData) {
    return <div className="text-sm text-red-500">Failed to load medicines</div>;
  }

  const medicines = medicinesData.items;
  const totalPages = Math.max(1, Math.ceil(medicinesData.total / PAGE_SIZE));
  const startItem = medicines.length > 0 ? medicinesData.skip + 1 : 0;
  const endItem = medicinesData.skip + medicines.length;
  const isFirstPage = page === 1;
  const isLastPage = page >= totalPages;

  return (
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            List of medications in development
          </h1>
          <p className="text-sm text-slate-500">
            Brief summary of testing processes
          </p>
        </div>

        <div className="overflow-x-auto border-y border-slate-200">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
            <tr className="border-b border-slate-200">
              <th className="px-3 py-3 text-xs uppercase text-slate-900">Name</th>
              <th className="px-3 py-3 text-xs uppercase text-slate-900">Location</th>
              <th className="px-3 py-3 text-xs uppercase text-slate-900">Start date</th>
              <th className="px-3 py-3 text-xs uppercase text-slate-900">End date</th>
              <th className="px-3 py-3 text-xs uppercase text-slate-900">
                Success reaction
              </th>
              <th className="px-3 py-3 text-xs uppercase text-slate-900">Process</th>
              <th className="px-3 py-3 text-xs uppercase text-slate-900">Status</th>
            </tr>
            </thead>

            <tbody>
            {medicines.map((medicine) => (
                <tr key={medicine.id} className="border-b border-slate-200">
                  <td className="px-3 py-4 text-sm font-medium text-blue-600">
                    {medicine.name}
                  </td>

                  <td className="px-3 py-4 text-xs text-slate-500">
                    {medicine.location}
                  </td>

                  <td className="px-3 py-4 text-xs text-slate-500">
                    {medicine.startDate}
                  </td>

                  <td className="px-3 py-4 text-xs text-slate-500">
                    {medicine.endDate}
                  </td>

                  <td className="px-3 py-4">
                    {medicine.successReaction ? (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <Check className="h-4 w-4" />
                        </div>
                    ) : (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-500">
                          <X className="h-4 w-4" />
                        </div>
                    )}
                  </td>

                  <td className="px-3 py-4">
                    <div className="w-28 space-y-1">
                      <p className="text-[11px] text-slate-500">
                        {medicine.processCurrent} / {medicine.processTotal}
                      </p>

                      <div className="h-1 rounded-full bg-slate-200">
                        <div
                            className="h-1 rounded-full bg-green-500"
                            style={{
                              width: `${Math.round(
                                  (medicine.processCurrent / medicine.processTotal) * 100,
                              )}%`,
                            }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-4">
                    <div className="flex h-1 w-28 overflow-hidden rounded-full bg-slate-200">
                      <div
                          className="bg-sky-500"
                          style={{ width: `${medicine.status.blue}%` }}
                      />
                      <div
                          className="bg-red-500"
                          style={{ width: `${medicine.status.red}%` }}
                      />
                      <div
                          className="bg-orange-400"
                          style={{ width: `${medicine.status.orange}%` }}
                      />
                      <div
                          className="bg-green-500"
                          style={{ width: `${medicine.status.green}%` }}
                      />
                    </div>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {startItem} to {endItem} items of {medicinesData.total}
            {isFetching ? <span className="ml-2 text-blue-600">Updating...</span> : null}
          </p>

          <div className="flex items-center gap-2">
            <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isFirstPage || isFetching}
                onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))}
            >
              Previous
            </Button>

            <span className="px-2">
            Page {page} of {totalPages}
          </span>

            <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isLastPage || isFetching}
                onClick={() =>
                    setPage((currentPage) => Math.min(currentPage + 1, totalPages))
                }
            >
              Next
            </Button>
          </div>
        </div>
      </div>
  );
}