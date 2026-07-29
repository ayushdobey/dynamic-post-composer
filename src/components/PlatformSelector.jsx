import { Check } from 'lucide-react'
import { platforms } from '../data/platforms'

export function PlatformSelector({ selected, onToggle }) {
  return <section>
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-slate-800">Publish to</h2>
      <span className="text-xs font-medium text-slate-400">Choose one or more</span>
    </div>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {platforms.map((platform) => {
        const active = selected.includes(platform.id)
        return <button key={platform.id} type="button" onClick={() => onToggle(platform.id)}
          className={`group relative flex items-center gap-2 rounded-xl border p-2.5 text-left transition-all ${active ? 'border-indigo-300 bg-indigo-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}>
          <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white ${platform.color}`}>{platform.short}</span>
          <span className="text-sm font-medium text-slate-700">{platform.name}</span>
          {active && <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-white"><Check size={11} strokeWidth={3}/></span>}
        </button>
      })}
    </div>
  </section>
}
