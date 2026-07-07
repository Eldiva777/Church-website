import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for an active session; redirect to login if none
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setLocation('/admin/login');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    // Keep state in sync if the session changes (e.g. token expiry)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setLocation('/admin/login');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [setLocation]);

  async function handleLogout() {
    await supabase.auth.signOut();
    setLocation('/admin/login');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-gray-900 text-white px-4 py-1.5 rounded hover:bg-gray-700"
        >
          Log out
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <p className="text-gray-700">
          Logged in as <span className="font-medium">{user?.email}</span>
        </p>
      </main>
    </div>
  );
}
