import { createFileRoute } from '@tanstack/react-router';
import { SummaryCard, LegendRow } from '@/features/dashboard/dashboard-components';

import {
    buildDashboardMetrics,
    formatNumber,
    formatTrend,
    getTrendClassName,
    testingProcessLegendColors,
} from '@/features/dashboard/dashboard-metrics';

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

    const dashboardMetrics = buildDashboardMetrics(data);

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
                        <LegendRow
                            label="Received tests"
                            value="Current period"
                            color="bg-blue-600"
                        />
                        <LegendRow
                            label="Completed tests"
                            value="Previous period"
                            color="bg-blue-200"
                        />
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
                                <span
                                    className={`rounded-full px-2 py-1 text-[10px] font-bold ${getTrendClassName(
                                        dashboardMetrics.testedDrugsTrend,
                                    )}`}
                                >
                                    {formatTrend(dashboardMetrics.testedDrugsTrend)}
                                </span>
                                <p className="mt-1 text-sm font-bold text-slate-950">
                                    {formatNumber(dashboardMetrics.totalTestedDrugs)}
                                </p>
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
                            <LegendRow
                                label="Completed"
                                value={`${dashboardMetrics.completedTestsPercent}%`}
                                color="bg-blue-600"
                            />
                            <LegendRow
                                label="Awaiting results"
                                value={`${dashboardMetrics.awaitingTestsPercent}%`}
                                color="bg-blue-100"
                            />
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
                                <span
                                    className={`rounded-full px-2 py-1 text-[10px] font-bold ${getTrendClassName(
                                        dashboardMetrics.approvalTrend,
                                    )}`}
                                >
                                    {formatTrend(dashboardMetrics.approvalTrend)}
                                </span>
                                <p className="mt-1 text-sm font-bold text-slate-950">
                                    {formatNumber(dashboardMetrics.totalApprovals)}
                                </p>
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
                            {dashboardMetrics.testingProcessPercentages.map((item, index) => (
                                <LegendRow
                                    key={item.name}
                                    label={item.name}
                                    value={`${item.percent}%`}
                                    color={
                                        testingProcessLegendColors[
                                        index % testingProcessLegendColors.length
                                            ]
                                    }
                                />
                            ))}
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
                            <LegendRow
                                label="Tested"
                                value={`${dashboardMetrics.peopleTestedPercent}%`}
                                color="bg-blue-600"
                            />
                            <LegendRow
                                label="Non-tested"
                                value={`${dashboardMetrics.peopleNotTestedPercent}%`}
                                color="bg-blue-100"
                            />
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    );
}