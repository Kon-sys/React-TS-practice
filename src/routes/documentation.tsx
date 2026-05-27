import { createFileRoute } from '@tanstack/react-router';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/documentation')({
    component: DocumentationPage,
});

function DocumentationPage() {
    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950">Documentation</h1>
                <p className="text-sm text-slate-500">
                    Project documentation, testing rules and clinical process notes.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Testing rules</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-500">
                        Basic rules for starting, tracking and completing medication testing processes.
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Reports</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-500">
                        Summary of reports, success reactions and current testing statuses.
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">API notes</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-500">
                        Data is loaded through TanStack Query. Current medical data is mocked because DummyJSON
                        does not contain this domain.
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}