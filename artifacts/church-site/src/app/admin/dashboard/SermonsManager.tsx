'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type Sermon = {
  id: string;
  title: string;
  date: string;
  youtube_url: string;
  speaker: string;
  tag: string | null;
  created_at: string;
};

const SPEAKERS = ['Pastor Isaac David Patani', 'Pastor Gloria Isaac'] as const;

type FormData = {
  title: string;
  date: string;
  youtube_url: string;
  speaker: string;
  tag: string;
};

const emptyForm: FormData = {
  title: '',
  date: '',
  youtube_url: '',
  speaker: SPEAKERS[0],
  tag: '',
};

export default function SermonsManager() {
  const supabase = createClient();

  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function fetchSermons() {
    setLoading(true);
    const { data, error } = await supabase
      .from('sermons')
      .select('*')
      .order('date', { ascending: false });
    if (error) {
      setError(error.message);
    } else {
      setSermons(data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchSermons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
  }

  function startEdit(sermon: Sermon) {
    setError(null);
    setForm({
      title: sermon.title,
      date: sermon.date,
      youtube_url: sermon.youtube_url,
      speaker: sermon.speaker,
      tag: sermon.tag ?? '',
    });
    setEditingId(sermon.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title: form.title.trim(),
      date: form.date,
      youtube_url: form.youtube_url.trim(),
      speaker: form.speaker,
      tag: form.tag.trim() || null,
    };

    let err;
    if (editingId) {
      ({ error: err } = await supabase
        .from('sermons')
        .update(payload)
        .eq('id', editingId));
    } else {
      ({ error: err } = await supabase.from('sermons').insert(payload));
    }

    if (err) {
      setError(err.message);
    } else {
      resetForm();
      await fetchSermons();
    }
    setSaving(false);
  }

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete sermon "${title}"? This cannot be undone.`)) return;
    setError(null);
    setDeletingId(id);
    const { error: err } = await supabase.from('sermons').delete().eq('id', id);
    if (err) {
      setError(err.message);
    } else {
      await fetchSermons();
    }
    setDeletingId(null);
  }

  return (
    <div className="space-y-10">
      {/* Form */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          {editingId ? 'Edit Sermon' : 'Add New Sermon'}
        </h2>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
              {error}
            </p>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                YouTube URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.youtube_url}
                onChange={(e) => setForm({ ...form, youtube_url: e.target.value })}
                placeholder="https://youtu.be/..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Speaker <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={form.speaker}
                onChange={(e) => setForm({ ...form, speaker: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 bg-white"
              >
                {SPEAKERS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tag <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                placeholder="e.g. Faith, Prayer, Healing"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-gray-900 text-white text-sm px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
            >
              {saving ? 'Saving…' : editingId ? 'Update Sermon' : 'Add Sermon'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* List */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-4">All Sermons</h2>

        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : sermons.length === 0 ? (
          <p className="text-sm text-gray-500">No sermons yet.</p>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
            {sermons.map((sermon) => (
              <div key={sermon.id} className="px-5 py-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{sermon.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {sermon.date} &middot; {sermon.speaker}
                    {sermon.tag && <> &middot; <span className="italic">{sermon.tag}</span></>}
                  </p>
                  <a
                    href={sermon.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline truncate block mt-0.5"
                  >
                    {sermon.youtube_url}
                  </a>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => startEdit(sermon)}
                    disabled={deletingId === sermon.id}
                    className="text-xs px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sermon.id, sermon.title)}
                    disabled={deletingId === sermon.id}
                    className="text-xs px-3 py-1 border border-red-200 text-red-600 rounded hover:bg-red-50 disabled:opacity-40"
                  >
                    {deletingId === sermon.id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
