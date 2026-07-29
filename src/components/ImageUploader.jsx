import { ImagePlus, X } from 'lucide-react'

export function ImageUploader({ image, onChange, onRemove }) {
  return <section>
    <h2 className="mb-3 text-sm font-semibold text-slate-800">Add media <span className="font-normal text-slate-400">(optional)</span></h2>
    {image ? <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
      <img src={image} alt="Post preview" className="h-44 w-full object-cover" />
      <button type="button" onClick={onRemove} aria-label="Remove image" className="absolute right-3 top-3 rounded-full bg-slate-900/75 p-2 text-white transition hover:bg-slate-900"><X size={16}/></button>
    </div> : <label className="flex h-28 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50">
      <ImagePlus size={20} className="mb-2 text-indigo-500"/>
      <span className="text-sm font-medium text-slate-700">Click to upload an image</span>
      <span className="mt-1 text-xs text-slate-400">PNG, JPG or WEBP</span>
      <input className="sr-only" type="file" accept="image/png,image/jpeg,image/webp" onChange={onChange}/>
    </label>}
  </section>
}
