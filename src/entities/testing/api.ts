import { apiGet } from '@/shared/api/client';

import { buildDashboardData, mapProductToMedicine } from './mappers';
import { eventDetails } from './mock';

import type { DummyJsonProductsResponse } from './dto';
import type {
    DashboardData,
    EventDetails,
    MedicineRow,
    MedicinesQueryParams,
    PaginatedResponse,
} from './types';

function delay<TData>(data: TData): Promise<TData> {
    return new Promise((resolve) => {
        window.setTimeout(() => resolve(data), 300);
    });
}

async function getProducts(
    limit = 30,
    skip = 0,
): Promise<DummyJsonProductsResponse> {
    return await apiGet<DummyJsonProductsResponse>(
        `/products?limit=${limit}&skip=${skip}`,
    );
}

export async function getDashboardData(): Promise<DashboardData> {
    const data = await getProducts();

    return buildDashboardData(data.products);
}

export async function getMedicines({
                                       page,
                                       pageSize,
                                   }: MedicinesQueryParams): Promise<PaginatedResponse<MedicineRow>> {
    const safePage = Math.max(page, 1);
    const safePageSize = Math.max(pageSize, 1);
    const skip = (safePage - 1) * safePageSize;

    const data = await getProducts(safePageSize, skip);

    return {
        items: data.products.map((product, index) =>
            mapProductToMedicine(product, data.skip + index),
        ),
        total: data.total,
        skip: data.skip,
        limit: data.limit,
        page: safePage,
        pageSize: safePageSize,
    };
}

export function getEventDetails(): Promise<EventDetails> {
    return delay(eventDetails);
}