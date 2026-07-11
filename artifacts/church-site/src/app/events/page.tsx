import { createClient } from '@/utils/supabase/server';
import PublicLayout from '@/components/PublicLayout';
import FadeUp from '@/components/FadeUp';
import { formatEventDateRange } from '@/lib/dates';

export const metadata = {
  title: 'Events — Ruach Dominion Embassy International',
};

export default async function EventsPage() {
  const supabase = createClient();

  const today = new Date().toISOString().split('T')[0];

  const { data: events, error } = await supabase
    .from('events')
    .select('id, title, event_date, end_date, event_time, location, description')
    .or(`end_date.gte.${today},and(end_date.is.null,event_date.gte.${today})`)
    .order('event_date', { ascending: true });

  if (error) {
    return (
      <PublicLayout>
        <div className="max-w-3xl mx-auto px-6 py-12">
          <p className="text-red-400 text-sm">Failed to load events: {error.message}</p>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-4">Calendar</p>
          <div className="h-px w-12 bg-accent-gold mb-6" />
          <h1 className="font-playfair text-4xl font-bold text-text-primary mb-10">
            Upcoming Events
          </h1>
        </FadeUp>

        {events && events.length > 0 ? (
          <ul className="space-y-4">
            {events.map((event, i) => (
              <FadeUp key={event.id} delay={Math.min(i * 60, 100)}>
                <li className="bg-surface border border-white/5 rounded-sm px-6 py-5 group">
                  {/* Gold left accent line */}
                  <div className="flex gap-5">
                    <div className="w-0.5 bg-accent-gold/40 rounded-full shrink-0 group-hover:bg-accent-gold transition-colors duration-300" />
                    <div className="min-w-0">
                      <p className="font-playfair text-lg text-text-primary">{event.title}</p>
                      <p className="text-sm text-text-primary/50 mt-1">
                        {formatEventDateRange(event.event_date, event.end_date)}
                        {event.event_time && <> &middot; {event.event_time}</>}
                        {' '}&middot; {event.location}
                      </p>
                      {event.description && (
                        <p className="text-sm text-text-primary/60 mt-3 leading-relaxed">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              </FadeUp>
            ))}
          </ul>
        ) : (
          <FadeUp delay={60}>
            <p className="text-text-primary/40 text-sm">No upcoming events at this time.</p>
          </FadeUp>
        )}
      </div>
    </PublicLayout>
  );
}
