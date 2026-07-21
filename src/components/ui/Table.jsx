export function Table({ columns, data, loading, error, emptyMessage = 'No data found.', onRetry }) {
  if (loading) {
    return (
      <div className="space-y-2 p-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton h-10 w-full" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 px-4 text-red-500 space-y-3">
        <p className="text-sm font-medium">Failed to load data: {error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-medium transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-sm">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key ?? col.label}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, ri) => (
            <tr key={row.id ?? ri}>
              {columns.map((col) => (
                <td key={col.key ?? col.label}>
                  {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
