import { useState } from 'react'
import { SUGGESTIONS } from '../lib/cvData.js'

export function Field({ label, error, hint, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="label">{label}</span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
      {error && <span role="alert" className="mt-1 block text-xs font-semibold text-rose-600">{error}</span>}
    </label>
  )
}

export function Suggest({ group, onPick }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-2">
      <button type="button" onClick={() => setOpen(!open)} className="text-xs font-bold text-violet-700 hover:underline" aria-expanded={open}>
        ✨ {open ? 'Masquer' : 'Voir'} les suggestions de formulation
      </button>
      {open && (
        <ul className="mt-2 space-y-1.5">
          {SUGGESTIONS[group].map((s) => (
            <li key={s}>
              <button type="button" onClick={() => onPick(s)} className="w-full rounded-lg border border-violet-100 bg-violet-50 px-3 py-2 text-left text-xs leading-relaxed text-violet-900 transition hover:border-violet-300 hover:bg-violet-100">
                <span className="mr-1 font-bold">＋</span>{s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function Card({ title, onRemove, onUp, onDown, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <b className="text-sm text-slate-800">{title}</b>
        <div className="flex gap-1">
          {onUp && <button type="button" onClick={onUp} className="rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-100" aria-label="Monter">↑</button>}
          {onDown && <button type="button" onClick={onDown} className="rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-100" aria-label="Descendre">↓</button>}
          <button type="button" onClick={onRemove} className="rounded-lg px-2 py-1 text-rose-500 hover:bg-rose-50" aria-label="Supprimer">🗑</button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </div>
  )
}
