/**
 * Format a number as Indian Rupees
 * @param {number} amount
 * @param {object} [opts]
 * @param {boolean} [opts.compact] — show 1.2L, 4.5K etc.
 */
export function formatINR(amount, { compact = false } = {}) {
  if (amount == null || isNaN(amount)) return '₹0'

  if (compact) {
    if (amount >= 10_00_000) return `₹${(amount / 10_00_000).toFixed(1)}L`
    if (amount >= 1_000)    return `₹${(amount / 1_000).toFixed(1)}K`
  }

  return new Intl.NumberFormat('en-IN', {
    style:    'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}
