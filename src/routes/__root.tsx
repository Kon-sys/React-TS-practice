import { createRootRoute } from '@tanstack/react-router';

import { AppLayout } from '@/widgets/layout/app-layout';

export const Route = createRootRoute({
    component: AppLayout,
});