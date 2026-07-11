'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

type View = 'login' | 'forgot' | 'forgot-sent';

export default function LoginPage() {
  const router = useRouter();

  // --- login state ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // --- forgot-password state ---
  const [view, setView] = useState<View>('login');
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetLoading, setResetLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoginError(error.message);
      setLoginLoading(false);
      return;
    }

    router.push('/admin/dashboard');
    router.refresh();
  }

  async function handleForgotSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResetError(null);
    setResetLoading(true);

    const supabase = createClient();
    // Build redirect URL dynamically so it works in any environment
    const redirectTo =
      window.location.origin +
      window.location.pathname.replace(/\/login$/, '/reset-password');

    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo,
    });

    if (error) {
      setResetError(error.message);
      setResetLoading(false);
      return;
    }

    setView('forgot-sent');
    setResetLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded shadow">

        {/* ── Sign-in form ── */}
        {view === 'login' && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              {loginError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded text-sm font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginLoading ? 'Signing in…' : 'Sign in'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(email); // pre-fill if user typed their email
                    setResetError(null);
                    setView('forgot');
                  }}
                  className="text-sm text-gray-500 hover:text-gray-800 underline-offset-2 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </form>
          </>
        )}

        {/* ── Forgot-password form ── */}
        {view === 'forgot' && (
          <>
            <h1 className="text-2xl font-bold mb-2 text-center">Reset Password</h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              Enter your email and we'll send you a reset link.
            </p>

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="reset-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="reset-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              {resetError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                  {resetError}
                </p>
              )}

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded text-sm font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resetLoading ? 'Sending…' : 'Send reset link'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="text-sm text-gray-500 hover:text-gray-800 underline-offset-2 hover:underline"
                >
                  ← Back to sign in
                </button>
              </div>
            </form>
          </>
        )}

        {/* ── Confirmation ── */}
        {view === 'forgot-sent' && (
          <>
            <div className="text-center space-y-4">
              <div className="text-4xl">✉️</div>
              <h1 className="text-xl font-bold">Check your inbox</h1>
              <p className="text-sm text-gray-600">
                If an account exists with that email, a reset link has been sent.
              </p>
              <button
                type="button"
                onClick={() => setView('login')}
                className="text-sm text-gray-500 hover:text-gray-800 underline-offset-2 hover:underline"
              >
                ← Back to sign in
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
