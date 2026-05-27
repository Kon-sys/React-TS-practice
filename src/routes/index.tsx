import { createFileRoute } from '@tanstack/react-router';
import { AlertCircle, Check, Pause } from 'lucide-react';
import {
    Bar,
    BarChart,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';

import { useDashboardQuery } from '@/entities/testing/queries';

export const Route = createFileRoute('/')({
    component: DashboardPage,
});

function DashboardPage() {
    const { data, isLoading, isError } = useDashboardQuery();

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="h-20 animate-pulse rounded-xl bg-slate-200" />
                <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
                    <div className="h-[420px] animate-pulse rounded-xl bg-slate-200" />
                    <div className="h-[420px] animate-pulse rounded-xl bg-slate-200" />
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
                Failed to load dashboard data
            </div>
        );
    }

    return (
        <div className="space-y-7">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                    Testing Dashboard
                </h1>
                <p className="text-sm text-slate-500">
                    Uncover insights on your testing processes.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {data.summary.map((item) => (
                    <SummaryCard
                        key={item.id}
                        title={item.title}
                        subtitle={item.subtitle}
                        variant={item.variant}
                    />
                ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
                <section className="rounded-xl border border-slate-200 bg-white p-5">
                    <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                        <div>
                            <h2 className="text-base font-bold text-slate-950">
                                Total tests
                            </h2>
                            <p className="text-xs text-slate-500">
                                Testing results received in all areas
                            </p>
                        </div>

                        <div className="w-fit rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
                            Mar 1 - 31, 2022
                        </div>
                    </div>

                    <div className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.totalTests}>
                                <XAxis
                                    dataKey="name"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fontSize: 11 }}
                                />
                                <YAxis hide />
                                <Line
                                    type="linear"
                                    dataKey="received"
                                    stroke="#2563eb"
                                    strokeWidth={2}
                                    dot={false}
                                />
                                <Line
                                    type="linear"
                                    dataKey="completed"
                                    stroke="#93c5fd"
                                    strokeWidth={2}
                                    strokeDasharray="4 4"
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-5">
                        <LegendRow label="Received tests" value="Current period" color="bg-blue-600" />
                        <LegendRow label="Completed tests" value="Previous period" color="bg-blue-200" />
                    </div>
                </section>

                <aside className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
                    <section className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-base font-bold text-slate-950">
                                    Total tested drugs
                                </h2>
                                <p className="text-xs text-slate-500">Last 7 days</p>
                            </div>

                            <div className="text-right">
                <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] font-bold text-orange-500">
                  -6.8%
                </span>
                                <p className="mt-1 text-sm font-bold text-slate-950">16,247</p>
                            </div>
                        </div>

                        <div className="h-[120px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.testedDrugs}>
                                    <XAxis dataKey="name" hide />
                                    <YAxis hide />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#2563eb" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-4 space-y-3">
                            <LegendRow label="Completed" value="52%" color="bg-blue-600" />
                            <LegendRow label="Awaiting results" value="48%" color="bg-blue-100" />
                        </div>
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-base font-bold text-slate-950">
                                    Drug approval rates
                                </h2>
                                <p className="text-xs text-slate-500">Last 7 days</p>
                            </div>

                            <div className="text-right">
                <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] font-bold text-orange-500">
                  +26.5%
                </span>
                                <p className="mt-1 text-sm font-bold text-slate-950">356</p>
                            </div>
                        </div>

                        <div className="h-[150px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.approvalRates}>
                                    <XAxis
                                        dataKey="name"
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fontSize: 11 }}
                                    />
                                    <YAxis hide />
                                    <Line
                                        type="linear"
                                        dataKey="value"
                                        stroke="#2563eb"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="mb-4">
                            <h2 className="text-base font-bold text-slate-950">
                                Testing process
                            </h2>
                            <p className="text-xs text-slate-500">Last 7 days</p>
                        </div>

                        <div className="mx-auto h-[130px] w-[130px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.testingProcess}
                                        dataKey="value"
                                        innerRadius={46}
                                        outerRadius={62}
                                        paddingAngle={2}
                                    >
                                        <Cell fill="#2563eb" />
                                        <Cell fill="#dbeafe" />
                                        <Cell fill="#38bdf8" />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-4 space-y-3">
                            <LegendRow label="Preclinical testing" value="72%" color="bg-blue-600" />
                            <LegendRow label="Clinical trials" value="18%" color="bg-blue-100" />
                            <LegendRow label="Regulatory approval" value="10%" color="bg-sky-400" />
                        </div>
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="mb-5">
                            <h2 className="text-base font-bold text-slate-950">
                                Number of people tested
                            </h2>
                            <p className="text-xs text-slate-500">Last 7 days</p>
                        </div>

                        <div className="mx-auto h-20 w-36 rounded-t-full border-[12px] border-b-0 border-blue-600 border-r-blue-100" />

                        <div className="mt-5 space-y-3">
                            <LegendRow label="Tested" value="70%" color="bg-blue-600" />
                            <LegendRow label="Non-tested" value="30%" color="bg-blue-100" />
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    );
}

type SummaryCardProps = {
    title: string;
    subtitle: string;
    variant: 'success' | 'warning' | 'danger';
};

function SummaryCard({ title, subtitle, variant }: SummaryCardProps) {
    const config = {
        success: {
            icon: Check,
            iconWrapper: 'bg-green-100 text-green-600',
            shape: 'bg-green-300',
        },
        warning: {
            icon: Pause,
            iconWrapper: 'bg-orange-100 text-orange-500',
            shape: 'bg-orange-300',
        },
        danger: {
            icon: AlertCircle,
            iconWrapper: 'bg-red-100 text-red-500',
            shape: 'bg-red-300',
        },
    }[variant];

    const Icon = config.icon;

    return (
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
            <div className={`relative h-10 w-12 rounded-md ${config.shape}`}>
                <div
                    className={`absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full ${config.iconWrapper}`}
                >
                    <Icon className="h-3.5 w-3.5" />
                </div>
            </div>

            <div>
                <h3 className="text-sm font-bold text-slate-950">{title}</h3>
                <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
        </div>
    );
}

type LegendRowProps = {
    label: string;
    value: string;
    color: string;
};

function LegendRow({ label, value, color }: LegendRowProps) {
    return (
        <div className="flex items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
                <span className={`h-2 w-4 rounded-sm ${color}`} />
                <span>{label}</span>
            </div>

            <span>{value}</span>
        </div>
    );
}