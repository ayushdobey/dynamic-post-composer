export function PostPreview({ text, image, platforms }) {
  const displayPlatform = platforms[0]
  return <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-8">
    <div className="mb-5 flex items-center justify-between"><h2 className="text-sm font-semibold text-slate-800">Live preview</h2><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">{displayPlatform?.name || 'Select a platform'}</span></div>
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center gap-2.5 p-3.5"><div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${displayPlatform?.color || 'bg-slate-300'}`}>{displayPlatform?.short || 'P'}</div><div><p className="text-sm font-semibold text-slate-800">your.brand</p><p className="text-xs text-slate-400">Just now</p></div></div>
      {image && <img src={image} alt="Attached post media" className="aspect-square w-full object-cover"/>}
      <div className="p-3.5"><p className={`whitespace-pre-wrap text-sm leading-6 ${text ? 'text-slate-700' : 'text-slate-400'}`}>{text || 'Your post will appear here…'}</p></div>
    </div>
    {platforms.length > 1 && <p className="mt-3 text-center text-xs text-slate-400">Previewing for {displayPlatform.name}; publishing to {platforms.length} platforms.</p>}
  </aside>
}
