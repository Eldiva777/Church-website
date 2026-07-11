import { createClient } from '@/utils/supabase/server';
import PublicLayout from '@/components/PublicLayout';
import FadeUp from '@/components/FadeUp';
import SermonsClient from './SermonsClient';

export const metadata = {
  title: 'Sermons — Ruach Dominion Embassy International',
};

export default async function SermonsPage() {
  const supabase = createClient();

  const { data: sermons, error } = await supabase
    .from('sermons')
    .select('id, title, date, youtube_url, speaker, tag')
    .order('date', { ascending: false });

  if (error) {
    return (
      <PublicLayout>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-red-400 text-sm">Failed to load sermons: {error.message}</p>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-4">Library</p>
          <div className="h-px w-12 bg-accent-gold mb-6" />
          <h1 className="font-playfair text-4xl font-bold text-text-primary mb-10">Sermons</h1>
        </FadeUp>
        <FadeUp delay={60}>
          <SermonsClient sermons={sermons ?? []} />
        </FadeUp>
      </div>
    </PublicLayout>
  );
}
