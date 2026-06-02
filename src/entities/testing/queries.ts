import { useQuery } from '@tanstack/react-query';

import { getDashboardData, getEventDetails, getMedicines } from './api';

export function useDashboardQuery() {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboardData,
    });
}

export function useMedicinesQuery(page: number, pageSize: number) {
    return useQuery({
        queryKey: ['medicines', page, pageSize],
        queryFn: () =>
            getMedicines({
                page,
                pageSize,
            }),
    });
}

export function useEventDetailsQuery() {
    return useQuery({
        queryKey: ['event-details'],
        queryFn: getEventDetails,
    });
}