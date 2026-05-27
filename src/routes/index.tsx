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

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const Route = createFileRoute('/')({
    component: DashboardPage,
});

function DashboardPage() {
    const { data, isLoading } = useDashboardQuery();

    if (isLoading || !data) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-72 w-full" />
            </div>
        );
    }

    return (
        <div className="space-y-7">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                    Testing Dashboard
                </h1>
                <p className="text-sm text-slate-500">Uncover insights on your testing processes.</p>
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
                <Card className="border-slate-200 bg-transparent shadow-none">
                    <CardHeader className="flex flex-row items-start justify-between px-0">
                        <div>
                            <CardTitle className="text-base font-bold">Total tests</CardTitle>
                            <p className="text-xs text-slate-500">Testing results received in all areas</p>
                        </div>

                        <div className="rounded border bg-white px-3 py-2 text-xs text-slate-500">
                            Mar 1 - 31, 2022
                        </div>
                    </CardHeader>

                    <CardContent className="h-[320px] px-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.totalTests}>
                                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                                <YAxis hide />
                                <Line
                                    type="linear"
                                    dataKey="received"
                                    stroke="#3b73ff"
                                    strokeWidth={2}
                                    dot={false}
                                />
                                <Line
                                    type="linear"
                                    dataKey="completed"
                                    stroke="#8ec5ff"
                                    strokeWidth={1}
                                    strokeDasharray="3 3"
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
                    <Card>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-base font-bold">Total tested drugs</CardTitle>
                                    <p className="text-xs text-slate-500">Last 7 days</p>
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold">
                  <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] text-orange-500">
                    -6.8%
                  </span>
                                    16,247
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="h-[120px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data.testedDrugs}>
                                        <XAxis dataKey="name" hide />
                                        <YAxis hide />
                                        <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#3b73ff" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <LegendRow label="Completed" value="52%" color="bg-blue-500" />
                            <LegendRow label="Awaiting results" value="48%" color="bg-blue-100" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-base font-bold">Drug approval rates</CardTitle>
                                    <p className="text-xs text-slate-500">Last 7 days</p>
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold">
                  <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] text-orange-500">
                    +26.5%
                  </span>
                                    356
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="h-[150px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.approvalRates}>
                                    <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                                    <YAxis hide />
                                    <Line
                                        type="linear"
                                        dataKey="value"
                                        stroke="#3b73ff"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-bold">Testing process</CardTitle>
                            <p className="text-xs text-slate-500">Last 7 days</p>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="mx-auto h-[120px] w-[120px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data.testingProcess}
                                            dataKey="value"
                                            innerRadius={45}
                                            outerRadius={58}
                                            paddingAngle={2}
                                        >
                                            <Cell fill="#3b73ff" />
                                            <Cell fill="#dbeafe" />
                                            <Cell fill="#38bdf8" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <LegendRow label="Preclinical testing" value="72%" color="bg-blue-500" />
                            <LegendRow label="Clinical trials" value="18%" color="bg-blue-100" />
                            <LegendRow label="Regulatory approval" value="10%" color="bg-sky-400" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-bold">Number of people tested</CardTitle>
                            <p className="text-xs text-slate-500">Last 7 days</p>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            <div className="mx-auto h-20 w-32 rounded-t-full border-[10px] border-b-0 border-blue-500 border-r-blue-100" />

                            <LegendRow label="Tested" value="70%" color="bg-blue-500" />
                            <LegendRow label="Non-tested" value="30%" color="bg-blue-100" />
                        </CardContent>
                    </Card>
                </div>
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
            bg: 'bg-green-100',
            color: 'text-green-600',
            shape: 'bg-green-300',
        },
        warning: {
            icon: Pause,
            bg: 'bg-orange-100',
            color: 'text-orange-500',
            shape: 'bg-orange-300',
        },
        danger: {
            icon: AlertCircle,
            bg: 'bg-red-100',
            color: 'text-red-500',
            shape: 'bg-red-300',
        },
    }[variant];

    const Icon = config.icon;

    return (
        <div className="flex items-center gap-4">
            <div className={`relative h-10 w-12 rounded-md ${config.shape}`}>
                <div
                    className={`absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full ${config.bg} ${config.color}`}
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
        <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
                <span className={`h-2 w-4 rounded-sm ${color}`} />
                {label}
            </div>
            <span>{value}</span>
        </div>
    );
}