export const testingProcessLegendColors = [
    'bg-blue-600',
    'bg-blue-100',
    'bg-sky-400',
];

type DashboardMetricsSource = {
    totalTests: {
        received: number;
        completed: number;
    }[];
    testedDrugs: {
        value: number;
    }[];
    approvalRates: {
        value: number;
    }[];
    testingProcess: {
        name: string;
        value: number;
    }[];
};

export function buildDashboardMetrics(data: DashboardMetricsSource) {
    const totalTestedDrugs = getTotalValue(data.testedDrugs);
    const totalApprovals = getTotalValue(data.approvalRates);

    const receivedTests = data.totalTests.reduce(
        (sum, item) => sum + item.received,
        0,
    );
    const completedTests = data.totalTests.reduce(
        (sum, item) => sum + item.completed,
        0,
    );

    const testsTotal = receivedTests + completedTests;
    const completedTestsPercent = getPercent(completedTests, testsTotal);
    const awaitingTestsPercent = Math.max(0, 100 - completedTestsPercent);

    const testingProcessTotal = getTotalValue(data.testingProcess);
    const testingProcessPercentages = data.testingProcess.map((item) => ({
        name: item.name,
        percent: getPercent(item.value, testingProcessTotal),
    }));

    return {
        totalTestedDrugs,
        testedDrugsTrend: getTrendPercent(data.testedDrugs),
        totalApprovals,
        approvalTrend: getTrendPercent(data.approvalRates),
        completedTestsPercent,
        awaitingTestsPercent,
        peopleTestedPercent: completedTestsPercent,
        peopleNotTestedPercent: awaitingTestsPercent,
        testingProcessPercentages,
    };
}

function getTotalValue(items: { value: number }[]) {
    return items.reduce((sum, item) => sum + item.value, 0);
}

function getPercent(value: number, total: number) {
    if (total <= 0) {
        return 0;
    }

    return Math.round((value / total) * 100);
}

function getTrendPercent(items: { value: number }[]) {
    if (items.length < 2) {
        return 0;
    }

    const firstValue = items[0].value;
    const lastValue = items[items.length - 1].value;

    if (firstValue === 0) {
        return 0;
    }

    return ((lastValue - firstValue) / firstValue) * 100;
}

export function formatTrend(value: number) {
    const roundedValue = Math.abs(value).toFixed(1);

    return `${value >= 0 ? '+' : '-'}${roundedValue}%`;
}

export function formatNumber(value: number) {
    return new Intl.NumberFormat('en').format(value);
}

export function getTrendClassName(value: number) {
    if (value >= 0) {
        return 'bg-green-100 text-green-600';
    }

    return 'bg-orange-100 text-orange-500';
}