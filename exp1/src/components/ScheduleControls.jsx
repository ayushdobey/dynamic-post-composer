import { CalendarClock } from 'lucide-react'

export function ScheduleControls({ enabled, date, onEnabledChange, onDateChange }) {
  return <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600"><CalendarClock size={18}/></span><div><h2 className="text-sm font-semibold text-slate-800">Schedule for later</h2><p className="text-xs text-slate-400">Choose when your post goes live</p></div></div>
      <button type="button" role="switch" aria-checked={enabled} onClick={() => onEnabledChange(!enabled)} className={`relative h-6 w-11 rounded-full transition ${enabled ? 'bg-indigo-600' : 'bg-slate-300'}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${enabled ? 'left-6' : 'left-1'}`}/></button>
    </div>
    {enabled && <input aria-label="Schedule date and time" type="datetime-local" value={date} min={new Date().toISOString().slice(0, 16)} onChange={(event) => onDateChange(event.target.value)} className="mt-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"/>}
  </section>
}
