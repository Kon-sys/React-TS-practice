export type SummaryItem = {
    id: number;
    title: string;
    subtitle: string;
    value: string;
    variant: 'success' | 'warning' | 'danger';
};

export type ChartPoint = {
    name: string;
    received: number;
    completed: number;
};

export type SmallChartPoint = {
    name: string;
    value: number;
};

export type TestingProcessPart = {
    name: string;
    value: number;
};

export type MedicineRow = {
    id: number;
    name: string;
    location: string;
    startDate: string;
    endDate: string;
    successReaction: boolean;
    processCurrent: number;
    processTotal: number;
    status: {
        blue: number;
        red: number;
        orange: number;
        green: number;
    };
};

export type EventDetails = {
    title: string;
    place: string;
    address: string;
    city: string;
    date: string;
    time: string;
    calendarStart: string;
    calendarEnd: string;
    latitude: number;
    longitude: number;
    manufacturer: string;
    mapImageUrl: string;
    tags: string[];
    description: string;
};

export type DashboardData = {
    summary: SummaryItem[];
    totalTests: ChartPoint[];
    testedDrugs: SmallChartPoint[];
    approvalRates: SmallChartPoint[];
    testingProcess: TestingProcessPart[];
};

export type MedicinesQueryParams = {
    page: number;
    pageSize: number;
};

export type PaginatedResponse<TItem> = {
    items: TItem[];
    total: number;
    skip: number;
    limit: number;
    page: number;
    pageSize: number;
};