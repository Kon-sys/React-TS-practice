import { useQuery } from '@tanstack/react-query';

import { getDashboardData, getEventDetails, getMedicines } from './api';

export function useDashboardQuery() {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboardData,
    });
}

export function useMedicinesQuery() {
    return useQuery({
        queryKey: ['medicines'],
        queryFn: getMedicines,
    });
}

export function useEventDetailsQuery() {
    return useQuery({
        queryKey: ['event-details'],
        queryFn: getEventDetails,
    });
}