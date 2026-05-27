import { createFileRoute } from '@tanstack/react-router';
import { Check, X } from 'lucide-react';

import { useMedicinesQuery } from '@/entities/testing/queries';

import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export const Route = createFileRoute('/tables')({
    component: TablesPage,
});

function TablesPage() {
    const { data: medicines, isLoading } = useMedicinesQuery();

    if (isLoading || !medicines) {
        return <Skeleton className="h-96 w-full" />;
    }

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                    List of medications in development
                </h1>
                <p className="text-sm text-slate-500">Brief summary of testing processes</p>
            </div>

            <div className="overflow-hidden border-y border-slate-200">
                <Table>
                    <TableHeader>
                        <TableRow className="border-slate-200">
                            <TableHead className="text-xs uppercase text-slate-900">Name</TableHead>
                            <TableHead className="text-xs uppercase text-slate-900">Location</TableHead>
                            <TableHead className="text-xs uppercase text-slate-900">Start date</TableHead>
                            <TableHead className="text-xs uppercase text-slate-900">End date</TableHead>
                            <TableHead className="text-xs uppercase text-slate-900">Success reaction</TableHead>
                            <TableHead className="text-xs uppercase text-slate-900">Process</TableHead>
                            <TableHead className="text-xs uppercase text-slate-900">Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {medicines.map((medicine) => (
                            <TableRow key={medicine.id} className="h-[58px] border-slate-200">
                                <TableCell className="font-medium text-blue-600">{medicine.name}</TableCell>
                                <TableCell className="text-xs text-slate-500">{medicine.location}</TableCell>
                                <TableCell className="text-xs text-slate-500">{medicine.startDate}</TableCell>
                                <TableCell className="text-xs text-slate-500">{medicine.endDate}</TableCell>
                                <TableCell>
                                    <ReactionIcon success={medicine.successReaction} />
                                </TableCell>
                                <TableCell>
                                    <ProcessBar current={medicine.processCurrent} total={medicine.processTotal} />
                                </TableCell>
                                <TableCell>
                                    <StatusBar status={medicine.status} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <p className="text-xs text-slate-500">
                1 to 6 items of 6 <span className="ml-3 text-blue-600">View all ›</span>
            </p>
        </div>
    );
}

type ReactionIconProps = {
    success: boolean;
};

function ReactionIcon({ success }: ReactionIconProps) {
    if (success) {
        return (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Check className="h-4 w-4" />
            </div>
        );
    }

    return (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-500">
            <X className="h-4 w-4" />
        </div>
    );
}

type ProcessBarProps = {
    current: number;
    total: number;
};

function ProcessBar({ current, total }: ProcessBarProps) {
    const percent = Math.round((current / total) * 100);

    return (
        <div className="w-28 space-y-1">
            <p className="text-[11px] text-slate-500">
                {current} / {total}
            </p>
            <div className="h-1 rounded-full bg-slate-200">
                <div className="h-1 rounded-full bg-green-500" style={{ width: `${percent}%` }} />
            </div>
        </div>
    );
}

type StatusBarProps = {
    status: {
        blue: number;
        red: number;
        orange: number;
        green: number;
    };
};

function StatusBar({ status }: StatusBarProps) {
    return (
        <div className="flex h-1 w-28 overflow-hidden rounded-full bg-slate-200">
            <div className="bg-sky-500" style={{ width: `${status.blue}%` }} />
            <div className="bg-red-500" style={{ width: `${status.red}%` }} />
            <div className="bg-orange-400" style={{ width: `${status.orange}%` }} />
            <div className="bg-green-500" style={{ width: `${status.green}%` }} />
        </div>
    );
}