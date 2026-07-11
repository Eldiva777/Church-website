'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type Testimony = {
  id: string;
  name: string;
  country: string | null;
  testimony: string;
  approved: boolean;
  created_at: string;
};

export default function TestimoniesManager() {
  const supabase = createClient();

  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  async function fetchTestimonies() {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setTestimonies(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchTestimonies();
  }, []);

  async function toggleApproved(id: string, current: boolean) {
    setUpdatingId(id);
    const { error } = await supabase
      .from('testimonies')
      .update({ approved: !current })
      .eq('id', id);

    if (!error) {
      setTestimonies((prev) =>
        prev.map((t) => (t.id === id ? { ...t, approved: !current } : t))
      );
    }
    setUpdatingId(null);
  }

  async function deleteTestimony(id: string) {
    setDeletingId(id);
    const { error } = await supabase.from('testimonies').delete().eq('id', id);

    if (!error) {
      setTestimonies((prev) => prev.filter((t) => t.id !== id));
    }
    setDeletingId(null);
  } 
  if (loading) {
    return <p className="text-text-primary/60">Loading testimonies...</p>;
  }

  if (error) {
    return <p className="text-red-400">Error: {error}</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="font-playfair text-2xl font-bold text-text-primary">
        Testimonies ({testimonies.length})
      </h2>

      {testimonies.length === 0 && (
        <p className="text-text-primary/50">No testimonies yet.</p>
      )}

      {testimonies.map((t) => (
        <div
          key={t.id}
          className="bg-surface border border-white/10 rounded-sm p-5 space-y-3"
        >
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-semibold text-text-primary">{t.name}</p>
              {t.country && (
                <p className="text-xs text-text-primary/50 uppercase tracking-wide">
                  {t.country}
                </p>
              )}
            </div>
            <span
              className={`text-xs uppercase tracking-widest px-3 py-1 rounded-sm ${
                t.approved
                  ? 'bg-accent-gold/20 text-accent-gold'
                  : 'bg-white/5 text-text-primary/50'
              }`}
            >
              {t.approved ? 'Approved' : 'Pending'}
            </span>
          </div>

          <p className="text-text-primary/80 text-sm leading-relaxed">
            {t.testimony}
          </p>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => toggleApproved(t.id, t.approved)}
              disabled={updatingId === t.id}
              className="text-xs uppercase tracking-widest border border-accent-gold text-accent-gold px-4 py-2 hover:bg-accent-gold hover:text-background-base transition-colors duration-200"
            >
              {updatingId === t.id
                ? 'Updating...'
                : t.approved
                ? 'Unapprove'
                : 'Approve'}
            </button>
            <button
              onClick={() => deleteTestimony(t.id)}
              disabled={deletingId === t.id}
              className="text-xs uppercase tracking-widest border border-red-400/50 text-red-400 px-4 py-2 hover:bg-red-400 hover:text-background-base transition-colors duration-200"
            >
              {deletingId === t.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div> 
    );
    }