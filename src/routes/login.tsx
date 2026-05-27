import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';

import { useAuth } from '@/features/auth/auth-provider';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const Route = createFileRoute('/login')({
    component: LoginPage,
});

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('admin123');
    const [errorMessage, setErrorMessage] = useState('');

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const isSuccess = login({
            email,
            password,
        });

        if (!isSuccess) {
            setErrorMessage('Invalid email or password');
            return;
        }

        void navigate({
            to: '/',
        });
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-3 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <LockKeyhole className="h-6 w-6" />
                    </div>

                    <div>
                        <CardTitle className="text-2xl">Testing Dashboard</CardTitle>
                        <CardDescription>
                            Sign in to manage medication testing processes.
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-slate-700">Email</p>
                            <Input
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="admin@example.com"
                                type="email"
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium text-slate-700">Password</p>
                            <Input
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="admin123"
                                type="password"
                            />
                        </div>

                        {errorMessage ? (
                            <p className="text-sm font-medium text-red-500">
                                {errorMessage}
                            </p>
                        ) : null}

                        <Button className="w-full" type="submit">
                            Sign in
                        </Button>

                        <div className="rounded bg-slate-50 p-3 text-xs text-slate-500">
                            <p>Test credentials:</p>
                            <p>Email: admin@example.com</p>
                            <p>Password: admin123</p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}