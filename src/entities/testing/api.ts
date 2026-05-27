import { dashboardData, eventDetails, medicines } from './mock';

import type { DashboardData, EventDetails, MedicineRow } from './types';

function delay<TData>(data: TData): Promise<TData> {
    return new Promise((resolve) => {
        window.setTimeout(() => resolve(data), 300);
    });
}

export function getDashboardData(): Promise<DashboardData> {
    return delay(dashboardData);
}

export function getMedicines(): Promise<MedicineRow[]> {
    return delay(medicines);
}

export function getEventDetails(): Promise<EventDetails> {
    return delay(eventDetails);
}