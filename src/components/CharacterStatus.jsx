export function CharacterStatus({ count, selectedPlatforms }) {
  const strictest = selectedPlatforms.reduce((lowest, item) => Math.min(lowest, item.limit), Infinity)
  const limit = strictest === Infinity ? 280 : strictest
  const exceeded = selectedPlatforms.filter((item) => count > item.limit)
  const remaining = limit - count
  const danger = remaining < 0
  return <div className="mt-3">
    <div className="flex items-center justify-between text-sm">
      <span className={danger ? 'font-medium text-rose-600' : 'text-slate-500'}>{danger ? `${Math.abs(remaining)} characters over limit` : `${remaining} characters remaining`}</span>
      <span className={`font-semibold ${danger ? 'text-rose-600' : 'text-slate-700'}`}>{count} / {limit}</span>
    </div>
    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full transition-all ${danger ? 'bg-rose-500' : 'bg-indigo-500'}`} style={{ width: `${Math.min(100, (count / limit) * 100)}%` }}/></div>
    {exceeded.length > 0 && <div role="alert" className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs leading-relaxed text-rose-700">Your post exceeds the limit for <strong>{exceeded.map((item) => item.name).join(', ')}</strong>. Shorten it or deselect the platform.</div>}
  </div>
}
