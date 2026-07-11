'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

type Mode = 'loading' | 'ready' | 'invalid' | 'success';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('loading');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Ref so the setTimeout can read the latest value without a stale closure
  const recoveredRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();

    // PASSWORD_RECOVERY fires when the user arrives from a Supabase reset email.
    // createBrowserClient automatically exchanges the code/token in the URL.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        recoveredRef.current = true;
        setMode('ready');
      }
    });

    // If nothing fires within 8 seconds the link is invalid or expired.
    const timeout = setTimeout(() => {
      if (!recoveredRef.current) {
        setMode('invalid');
      }
    }, 8000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    await supabase.auth.signOut();
    setMode('success');
    setTimeout(() => router.push('/admin/login'), 2500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded shadow">

        {/* ── Waiting for token exchange ── */}
        {mode === 'loading' && (
          <div className="text-center space-y-3">
            <div className="text-3xl animate-pulse">🔐</div>
            <p className="text-sm text-gray-500">Verifying your reset link…</p>
          </div>
        )}

        {/* ── Invalid / expired link ── */}
        {mode === 'invalid' && (
          <div className="text-center space-y-4">
            <div className="text-4xl">⚠️</div>
            <h1 className="text-xl font-bold">Link invalid or expired</h1>
            <p className="text-sm text-gray-600">
              Password reset links expire after a short time. Please request a
              new one.
            </p>
            <a
              href="/admin/login"
              className="inline-block text-sm text-gray-500 hover:text-gray-800 underline-offset-2 hover:underline"
            >
              ← Back to sign in
            </a>
          </div>
        )}

        {/* ── New-password form ── */}
        {mode === 'ready' && (
          <>
            <h1 className="text-2xl font-bold mb-2 text-center">Set New Password</h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              Choose a new password for your account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New password
                </label>
                <input
                  id="new-password"
                  type="password"
                  required
                  autoComplete="new-password"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  autoComplete="new-password"
                  minLength={6}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded text-sm font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving…' : 'Update password'}
              </button>
            </form>
          </>
        )}

        {/* ── Success ── */}
        {mode === 'success' && (
          <div className="text-center space-y-4">
            <div className="text-4xl">✅</div>
            <h1 className="text-xl font-bold">Password updated</h1>
            <p className="text-sm text-gray-600">
              Your password has been changed. Redirecting you to sign in…
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
