/**
 * Parse a YYYY-MM-DD date string safely (avoids UTC-vs-local timezone shift).
 */
function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Format a single YYYY-MM-DD string as "July 13, 2026".
 */
export function formatDate(dateStr: string): string {
  return parseDate(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format an event's date or date range.
 * Single day  → "July 13, 2026"
 * Multi-day   → "July 13 – July 15, 2026"
 */
export function formatEventDateRange(eventDate: string, endDate: string | null): string {
  if (!endDate) return formatDate(eventDate);

  const start = parseDate(eventDate);
  const end = parseDate(endDate);
  const sameYear = start.getFullYear() === end.getFullYear();

  const startStr = start.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    ...(sameYear ? {} : { year: 'numeric' }),
  });
  const endStr = end.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return `${startStr} – ${endStr}`;
}
