import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Send, Sparkles } from 'lucide-react'
import { platforms } from './data/platforms'
import { PlatformSelector } from './components/PlatformSelector'
import { ImageUploader } from './components/ImageUploader'
import { CharacterStatus } from './components/CharacterStatus'
import { PostPreview } from './components/PostPreview'
import { ComposerToolbar } from './components/ComposerToolbar'
import { ScheduleControls } from './components/ScheduleControls'

const draftKey = 'dynamic-post-composer-draft'

function loadDraft() {
  try { return JSON.parse(localStorage.getItem(draftKey)) || {} } catch { return {} }
}

export default function App() {
  const [draft] = useState(loadDraft)
  const [text, setText] = useState(draft.text || '')
  const [selected, setSelected] = useState(draft.selected?.length ? draft.selected : ['instagram', 'x'])
  const [image, setImage] = useState(null)
  const [scheduled, setScheduled] = useState(draft.scheduled || false)
  const [scheduleDate, setScheduleDate] = useState(draft.scheduleDate || '')
  const [published, setPublished] = useState(false)
  const [savedAt, setSavedAt] = useState(false)
  const selectedPlatforms = useMemo(() => platforms.filter((item) => selected.includes(item.id)), [selected])
  const invalid = selectedPlatforms.some((item) => text.length > item.limit)
  useEffect(() => () => { if (image) URL.revokeObjectURL(image) }, [image])
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(draftKey, JSON.stringify({ text, selected, scheduled, scheduleDate }))
      setSavedAt(true)
    }, 450)
    return () => clearTimeout(timer)
  }, [text, selected, scheduled, scheduleDate])
  useEffect(() => { if (!savedAt) return; const timer = setTimeout(() => setSavedAt(false), 1800); return () => clearTimeout(timer) }, [savedAt])
  const togglePlatform = (id) => { setPublished(false); setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]) }
  const setFile = (event) => { const file = event.target.files?.[0]; if (file) { setPublished(false); setImage(URL.createObjectURL(file)) } }
  const removeImage = () => setImage(null)
  const clear = () => { setText(''); setImage(null); setScheduled(false); setScheduleDate(''); setPublished(false); localStorage.removeItem(draftKey) }
  const addEmoji = (emoji) => { setPublished(false); setText((value) => value + emoji) }
  const publish = () => { if (selected.length && text.trim() && !invalid && (!scheduled || scheduleDate)) { setPublished(true); localStorage.removeItem(draftKey) } }
  return <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#e0e7ff_0,_transparent_28rem),linear-gradient(#f8fafc,#f8fafc)] px-4 py-8 sm:px-6 lg:py-12">
    <div className="mx-auto max-w-6xl">
      <header className="mb-8 text-center"><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm"><Sparkles size={14}/> CREATE ONCE, SHARE EVERYWHERE</div><h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Dynamic Post Composer</h1><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">Create polished social posts and tailor them to every platform's character limit.</p></header>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,.85fr)]">
        <form onSubmit={(event) => { event.preventDefault(); publish() }} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <PlatformSelector selected={selected} onToggle={togglePlatform}/>
          <div className="my-7 h-px bg-slate-100"/>
          <section><div className="mb-3 flex items-center justify-between"><label htmlFor="post-text" className="text-sm font-semibold text-slate-800">Write your post</label><span className="text-xs text-slate-400">Supports line breaks</span></div><textarea id="post-text" value={text} onChange={(event) => { setPublished(false); setText(event.target.value) }} placeholder="What's on your mind?" className="h-40 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"/><ComposerToolbar onEmoji={addEmoji} onClear={clear} savedAt={savedAt}/><CharacterStatus count={text.length} selectedPlatforms={selectedPlatforms}/></section>
          <div className="my-7 h-px bg-slate-100"/>
          <ImageUploader image={image} onChange={setFile} onRemove={removeImage}/>
          <div className="mt-5"><ScheduleControls enabled={scheduled} date={scheduleDate} onEnabledChange={setScheduled} onDateChange={setScheduleDate}/>{scheduled && !scheduleDate && <p className="mt-2 text-xs text-rose-600">Choose a date and time to schedule this post.</p>}</div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-slate-400">{selected.length ? `${selected.length} platform${selected.length > 1 ? 's' : ''} selected` : 'Select at least one platform'}</p><button type="submit" disabled={!selected.length || !text.trim() || invalid || (scheduled && !scheduleDate)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"><Send size={16}/>{published ? 'Post published!' : scheduled ? 'Schedule post' : 'Publish post'}</button></div>
          {published && <div role="status" className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"><CheckCircle2 size={18}/>{scheduled ? `Your post is scheduled for ${new Date(scheduleDate).toLocaleString()}.` : 'Your post has been published successfully!'}</div>}
        </form>
        <PostPreview text={text} image={image} platforms={selectedPlatforms}/>
      </div>
    </div>
  </main>
}
