import { format, isValid } from 'date-fns'

/**
 * Safely format a date value without throwing RangeError on invalid dates.
 * @param {string|number|Date} dateVal - The date value to format
 * @param {string} formatStr - The date-fns format string (default 'dd MMM yyyy')
 * @param {string} fallback - String returned if date is missing or invalid (default '—')
 */
export function formatDate(dateVal, formatStr = 'dd MMM yyyy', fallback = '—') {
  if (!dateVal) return fallback
  const d = new Date(dateVal)
  if (!isValid(d)) return fallback
  return format(d, formatStr)
}
