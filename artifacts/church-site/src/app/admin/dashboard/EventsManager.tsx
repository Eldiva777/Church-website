'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { formatEventDateRange } from '@/lib/dates';

type Event = {
  id: string;
  title: string;
  event_date: string;
  end_date: string | null;
  event_time: string;
  location: string;
  description: string | null;
  created_at: string;
};

type FormData = {
  title: string;
  event_date: string;
  end_date: string;
  event_time: string;
  location: string;
  description: string;
};

const emptyForm: FormData = {
  title: '',
  event_date: '',
  end_date: '',
  event_time: '',
  location: '',
  description: '',
};

export default function EventsManager() {
  const supabase = createClient();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function fetchEvents() {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });
    if (error) {
      setError(error.message);
    } else {
      setEvents(data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
  }

  function startEdit(event: Event) {
    setError(null);
    setForm({
      title: event.title,
      event_date: event.event_date,
      end_date: event.end_date ?? '',
      event_time: event.event_time,
      location: event.location,
      description: event.description ?? '',
    });
    setEditingId(event.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title: form.title.trim(),
      event_date: form.event_date,
      end_date: form.end_date || null,
      event_time: form.event_time.trim(),
      location: form.location.trim(),
      description: form.description.trim() || null,
    };

    let err;
    if (editingId) {
      ({ error: err } = await supabase
        .from('events')
        .update(payload)
        .eq('id', editingId));
    } else {
      ({ error: err } = await supabase.from('events').insert(payload));
    }

    if (err) {
      setError(err.message);
    } else {
      resetForm();
      await fetchEvents();
    }
    setSaving(false);
  }

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete event "${title}"? This cannot be undone.`)) return;
    setError(null);
    setDeletingId(id);
    const { error: err } = await supabase.from('events').delete().eq('id', id);
    if (err) {
      setError(err.message);
    } else {
      await fetchEvents();
    }
    setDeletingId(null);
  }

  return (
    <div className="space-y-10">
      {/* Form */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          {editingId ? 'Edit Event' : 'Add New Event'}
        </h2>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
              {error}
            </p>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
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
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={form.event_date}
                onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date <span className="text-gray-400">(optional — for multi-day events)</span>
              </label>
              <input
                type="date"
                value={form.end_date}
                min={form.event_date || undefined}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Time <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.event_time}
                onChange={(e) => setForm({ ...form, event_time: e.target.value })}
                placeholder="e.g. 10:00 AM"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Main Sanctuary"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 resize-y"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-gray-900 text-white text-sm px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
            >
              {saving ? 'Saving…' : editingId ? 'Update Event' : 'Add Event'}
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
        <h2 className="text-base font-semibold text-gray-900 mb-4">All Events</h2>

        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : events.length === 0 ? (
          <p className="text-sm text-gray-500">No events yet.</p>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
            {events.map((event) => (
              <div key={event.id} className="px-5 py-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatEventDateRange(event.event_date, event.end_date)} &middot;{' '}
                    {event.event_time} &middot; {event.location}
                  </p>
                  {event.description && (
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{event.description}</p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => startEdit(event)}
                    disabled={deletingId === event.id}
                    className="text-xs px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id, event.title)}
                    disabled={deletingId === event.id}
                    className="text-xs px-3 py-1 border border-red-200 text-red-600 rounded hover:bg-red-50 disabled:opacity-40"
                  >
                    {deletingId === event.id ? 'Deleting…' : 'Delete'}
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
