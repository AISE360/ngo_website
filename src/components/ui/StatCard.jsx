import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export function StatCard({ title, value, subtitle, icon: Icon, trend, color = 'blue', loading }) {
  const colorMap = {
    blue:   'from-brand-green to-brand-mid',
    navy:   'from-brand-green to-gray-600',
    teal:   'from-brand-mid to-teal-400',
    purple: 'from-brand-gold to-amber-400',
    orange: 'from-status-pending to-orange-400',
    green:  'from-status-approved to-green-400',
    gold:   'from-brand-gold to-brand-gold2',
  }

  if (loading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="skeleton h-4 w-1/2 mb-3" />
        <div className="skeleton h-8 w-3/4 mb-2" />
        <div className="skeleton h-3 w-2/3" />
      </div>
    )
  }

  return (
    <div className="glass-card p-6 hover:shadow-card-hover transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-brand-green mt-1.5 font-display">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {trend != null && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-500' : 'text-gray-400'}`}>
              {trend > 0 ? <TrendingUp className="w-3 h-3" /> : trend < 0 ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
              {Math.abs(trend)}% vs last month
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorMap[color]} shadow-md group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
    </div>
  )
}
