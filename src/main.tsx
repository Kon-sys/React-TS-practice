import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Providers } from '@/app/providers';
import { router } from '@/app/router';
import '@/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element was not found');
}

createRoot(rootElement).render(
    <StrictMode>
        <Providers>
            <RouterProvider router={router} />
        </Providers>
    </StrictMode>,
);