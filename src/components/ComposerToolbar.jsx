import { RotateCcw, Save } from 'lucide-react'

const emojis = ['✨', '🔥', '🚀', '💡', '👏', '🎉']

export function ComposerToolbar({ onEmoji, onClear, savedAt }) {
  return <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
    <div className="flex items-center gap-1.5">
      <span className="mr-1 text-xs font-medium text-slate-400">Quick add</span>
      {emojis.map((emoji) => <button key={emoji} type="button" onClick={() => onEmoji(emoji)} aria-label={`Add ${emoji}`} className="rounded-md px-1.5 py-1 text-base transition hover:bg-indigo-50 hover:scale-110">{emoji}</button>)}
    </div>
    <div className="flex items-center gap-3">
      {savedAt && <span className="inline-flex items-center gap-1 text-xs text-emerald-600"><Save size={12}/>Draft saved</span>}
      <button type="button" onClick={onClear} className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition hover:text-rose-600"><RotateCcw size={13}/>Clear</button>
    </div>
  </div>
}
