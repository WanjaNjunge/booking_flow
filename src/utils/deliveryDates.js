/**
 * Returns an array of available delivery dates.
 * Rules: next 14 calendar days, excluding Saturday (6) and Sunday (0).
 * Each entry is an ISO date string (YYYY-MM-DD).
 */
export function getAvailableDates(today = new Date()) {
  const dates = [];
  const start = new Date(today);
  start.setDate(start.getDate() + 1); // tomorrow

  const end = new Date(today);
  end.setDate(end.getDate() + 14); // today + 14 days

  const cursor = new Date(start);
  while (cursor <= end) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      dates.push(toISODate(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Format a date string (YYYY-MM-DD) as "Monday 24 March 2026".
 */
export function formatDeliveryDate(isoDate) {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return `${WEEKDAYS[d.getDay()]} ${day} ${MONTHS[month - 1]} ${year}`;
}

function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
