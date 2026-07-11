import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import LogoutButton from './LogoutButton';
import DashboardTabs from './DashboardTabs';

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user.email}</span>
          <LogoutButton />
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-8">
        <DashboardTabs />
      </main>
    </div>
  );
}
