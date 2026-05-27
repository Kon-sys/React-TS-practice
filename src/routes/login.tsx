import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useAuth } from '@/features/auth/auth-provider';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const error = login({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error);
      return;
    }

    void navigate({
      to: '/',
    });
  }

  return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-4">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <LockKeyhole className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-950">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Sign in to continue to Testing Dashboard.
              </p>
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Email</p>
              <Input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  type="email"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Password</p>
              <Input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Your password"
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
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-medium text-blue-600">
              Create account
            </Link>
          </p>
        </div>
      </div>
  );
}