'use client';

import { useState, useMemo } from 'react';
import { getYoutubeEmbedUrl } from '@/lib/youtube';

type Sermon = {
  id: string;
  title: string;
  date: string;
  youtube_url: string;
  speaker: string;
  tag: string | null;
};

const SPEAKERS = ['Pastor Isaac David Patani', 'Pastor Gloria Isaac'] as const;

export default function SermonsClient({ sermons }: { sermons: Sermon[] }) {
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [speakerFilter, setSpeakerFilter] = useState<string>('All');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return sermons.filter((s) => {
      if (q && !s.title.toLowerCase().includes(q) && !(s.tag ?? '').toLowerCase().includes(q))
        return false;
      if (startDate && s.date < startDate) return false;
      if (endDate && s.date > endDate) return false;
      if (speakerFilter !== 'All' && s.speaker !== speakerFilter) return false;
      return true;
    });
  }, [sermons, search, startDate, endDate, speakerFilter]);

  const inputCls =
    'w-full bg-surface border border-white/10 rounded-sm px-3 py-2 text-sm text-text-primary placeholder-text-primary/30 focus:outline-none focus:border-accent-gold/50 transition-colors';

  return (
    <div>
      {/* ── Filters ── */}
      <div className="bg-surface border border-white/5 rounded-sm p-5 mb-8 space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs uppercase tracking-widest text-text-primary/40 mb-2">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Title or tag…"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-text-primary/40 mb-2">
              From date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-text-primary/40 mb-2">
              To date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-text-primary/40 mb-3">
            Speaker
          </label>
          <div className="flex flex-wrap gap-2">
            {(['All', ...SPEAKERS] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSpeakerFilter(s)}
                className={`text-xs px-4 py-1.5 rounded-sm border transition-colors duration-150 ${
                  speakerFilter === s
                    ? 'border-accent-gold bg-accent-gold/10 text-accent-gold'
                    : 'border-white/10 text-text-primary/50 hover:border-white/30 hover:text-text-primary/80'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Result count ── */}
      <p className="text-xs text-text-primary/35 mb-6 uppercase tracking-widest">
        {filtered.length} sermon{filtered.length !== 1 ? 's' : ''}
        {filtered.length !== sermons.length && ` of ${sermons.length}`}
      </p>

      {/* ── Cards ── */}
      {filtered.length === 0 ? (
        <p className="text-text-primary/40 text-sm">No sermons match your filters.</p>
      ) : (
        <div className="space-y-6">
          {filtered.map((sermon) => {
            const embedUrl = getYoutubeEmbedUrl(sermon.youtube_url);
            return (
              <div
                key={sermon.id}
                className="bg-surface border border-white/5 rounded-sm overflow-hidden"
              >
                <div className="px-6 py-5 border-b border-white/10">
                  <p className="font-playfair text-lg text-text-primary">{sermon.title}</p>
                  <p className="text-sm text-text-primary/45 mt-1">
                    {sermon.date} &middot; {sermon.speaker}
                    {sermon.tag && (
                      <> &middot; <span className="italic">{sermon.tag}</span></>
                    )}
                  </p>
                </div>
                {embedUrl ? (
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      src={embedUrl}
                      title={sermon.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="px-6 py-4">
                    <a
                      href={sermon.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-link text-sm text-accent-gold"
                    >
                      Watch on YouTube →
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
