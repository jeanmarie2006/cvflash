import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import Logo from '../components/Logo.jsx'
import Preview from '../components/Preview.jsx'
import CvSheet from '../components/Templates.jsx'
import { StepExperiences, StepFormations, StepInfos, StepSkills } from '../components/Steps.jsx'
import { useCvs } from '../lib/useCvs.js'
import { analyzeCv, COLORS, EMPTY_CV, encodeShare, fullName, SAMPLES, TEMPLATES } from '../lib/cvData.js'

const STEPS = ['Informations', 'Expériences', 'Formations', 'Compétences', 'Finalisation']

function normalize(d) {
  return { ...EMPTY_CV, ...d, experiences: d.experiences || [], formations: d.formations || [], competences: d.competences || [], langues: d.langues || [] }
}

export default function Editor() {
  const { list, active, save, select, create, rename, remove } = useCvs()
  const methods = useForm({ defaultValues: normalize(active.data), mode: 'onChange' })
  const { control, reset, setValue, register } = methods
  const values = useWatch({ control })
  const cv = useMemo(() => normalize(values), [values])
  const [step, setStep] = useState(0)
  const [tab, setTab] = useState('form') // mobile : formulaire / aperçu
  const [saved, setSaved] = useState(true)
  const [msg, setMsg] = useState('')
  const lastId = useRef(active.id)

  // changement de CV actif -> recharge le formulaire
  useEffect(() => {
    if (lastId.current !== active.id) { lastId.current = active.id; reset(normalize(active.data)) }
  }, [active.id])

  // enregistrement automatique (brouillon)
  useEffect(() => {
    if (lastId.current !== active.id) return
    setSaved(false)
    const t = setTimeout(() => { save(active.id, cv); setSaved(true) }, 500)
    return () => clearTimeout(t)
  }, [cv])

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(''), 2600) }
  const load = (key) => { reset(normalize(SAMPLES[key])); setStep(0) }
  const printPdf = () => { const t = document.title; document.title = `CV ${fullName(cv) || ''}`.trim(); window.print(); document.title = t }

  const downloadPdf = async () => {
    flash('Génération du PDF…')
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import('html2canvas-pro'), import('jspdf')])
    const el = document.getElementById('print-root')
    const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#ffffff', useCORS: true })
    const pdf = new jsPDF({ unit: 'mm', format: 'a4' })
    const pageHpx = Math.floor((canvas.width * 297) / 210)
    const pages = Math.max(1, Math.ceil((canvas.height - 6) / pageHpx))
    for (let p = 0; p < pages; p++) {
      const slice = document.createElement('canvas')
      slice.width = canvas.width; slice.height = Math.min(pageHpx, canvas.height - p * pageHpx)
      slice.getContext('2d').drawImage(canvas, 0, p * pageHpx, canvas.width, slice.height, 0, 0, canvas.width, slice.height)
      if (p > 0) pdf.addPage()
      pdf.addImage(slice.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, 210, (slice.height * 210) / canvas.width)
    }
    pdf.save(`CV_${(fullName(cv) || 'cv').replace(/\s+/g, '_')}.pdf`)
    flash('PDF téléchargé ✓')
  }

  const share = async () => {
    const url = `${location.origin}/partage#${encodeShare(cv)}`
    try { await navigator.clipboard.writeText(url); flash('Lien de partage copié ✓') } catch { prompt('Copiez ce lien :', url) }
  }

  const q = useMemo(() => analyzeCv(cv), [cv])

  return (
    <div className="min-h-screen">
      <div className="no-print">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
            <Logo to="/" />
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <span className={`hidden text-xs font-semibold sm:inline ${saved ? 'text-emerald-600' : 'text-slate-400'}`} aria-live="polite">{saved ? '✓ Brouillon enregistré' : 'Enregistrement…'}</span>
              <CvMenu list={list} active={active} select={select} create={create} rename={rename} remove={remove} />
              <button className="btn-ghost !py-2" onClick={printPdf}>🖨 Imprimer</button>
              <button className="btn-primary !py-2" onClick={downloadPdf}>⬇ PDF</button>
            </div>
          </div>
        </header>

        {msg && <div role="status" className="fixed left-1/2 top-16 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg">{msg}</div>}

        <div className="mx-auto max-w-7xl px-4 pt-4 lg:hidden">
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-200/70 p-1" role="tablist">
            {[['form', 'Formulaire'], ['preview', 'Aperçu']].map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`rounded-lg py-2 text-sm font-bold ${tab === k ? 'bg-white shadow' : 'text-slate-500'}`}>{l}</button>)}
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-6 lg:grid-cols-[minmax(0,540px)_1fr]">
          <div className={tab === 'form' ? '' : 'hidden lg:block'}>
            <nav aria-label="Étapes" className="mb-5 flex gap-1.5 overflow-x-auto pb-1">
              {STEPS.map((s, i) => (
                <button key={s} onClick={() => setStep(i)} aria-current={step === i ? 'step' : undefined}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-bold transition ${step === i ? 'bg-brand-600 text-white shadow' : i < step ? 'bg-brand-100 text-brand-700' : 'bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50'}`}>
                  <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${step === i ? 'bg-white/25' : 'bg-slate-100 text-slate-500'}`}>{i < step ? '✓' : i + 1}</span>{s}
                </button>
              ))}
            </nav>

            <FormProvider {...methods}>
              <form onSubmit={(e) => e.preventDefault()} className="card space-y-5 p-5 sm:p-6" noValidate>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h1 className="text-xl font-extrabold text-slate-900">{STEPS[step]}</h1>
                  {step === 0 && (
                    <select className="input !w-auto !py-1.5 text-xs" value="" onChange={(e) => e.target.value && load(e.target.value)} aria-label="Charger un exemple">
                      <option value="">Charger un exemple…</option>
                      <option value="dev">Développeur web junior</option>
                      <option value="marketing">Marketing digital</option>
                      <option value="compta">Assistant comptable</option>
                    </select>
                  )}
                </div>
                {step === 0 && <StepInfos />}
                {step === 1 && <StepExperiences />}
                {step === 2 && <StepFormations />}
                {step === 3 && <StepSkills />}
                {step === 4 && <Finish register={register} setValue={setValue} cv={cv} q={q} onPrint={printPdf} onPdf={downloadPdf} onShare={share} />}
                <div className="flex justify-between border-t border-slate-100 pt-4">
                  <button type="button" className="btn-ghost" disabled={step === 0} onClick={() => { setStep(step - 1); window.scrollTo(0, 0) }}>← Précédent</button>
                  {step < STEPS.length - 1
                    ? <button type="button" className="btn-primary" onClick={() => { setStep(step + 1); window.scrollTo(0, 0) }}>Suivant →</button>
                    : <button type="button" className="btn-primary" onClick={downloadPdf}>⬇ Télécharger le PDF</button>}
                </div>
              </form>
            </FormProvider>
          </div>

          <aside className={`${tab === 'preview' ? '' : 'hidden lg:block'}`}>
            <div className="lg:sticky lg:top-20">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-slate-700">Aperçu en direct</h2>
                <div className="flex gap-1.5">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => setValue('template', t.id, { shouldDirty: true })} aria-pressed={cv.template === t.id}
                      className={`rounded-full px-3 py-1 text-xs font-bold ${cv.template === t.id ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'}`}>{t.nom}</button>
                  ))}
                </div>
              </div>
              <Preview cv={cv} />
            </div>
          </aside>
        </div>
      </div>

      {/* Version pleine taille utilisée pour l'impression et l'export PDF */}
      <div className="print-only" id="print-root" aria-hidden="true"><CvSheet cv={cv} /></div>
    </div>
  )
}

function CvMenu({ list, active, select, create, rename, remove }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const h = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div className="relative" ref={ref}>
      <button className="btn-ghost !py-2" onClick={() => setOpen(!open)} aria-expanded={open}>📁 <span className="hidden max-w-32 truncate sm:inline">{active.name}</span> ▾</button>
      {open && (
        <div className="absolute right-0 z-40 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
          <p className="px-2 pb-1 pt-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">Mes CV</p>
          <ul className="max-h-60 overflow-y-auto">
            {list.map((c) => (
              <li key={c.id} className={`flex items-center gap-1 rounded-xl px-2 py-1.5 ${c.id === active.id ? 'bg-brand-50' : 'hover:bg-slate-50'}`}>
                <button className="flex-1 truncate text-left text-sm font-semibold" onClick={() => { select(c.id); setOpen(false) }}>{c.name}</button>
                <button className="px-1 text-xs text-slate-400 hover:text-brand-600" title="Renommer" onClick={() => { const n = prompt('Nom du CV', c.name); if (n?.trim()) rename(c.id, n.trim()) }}>✎</button>
                <button className="px-1 text-xs text-slate-400 hover:text-rose-600" title="Supprimer" onClick={() => confirm(`Supprimer « ${c.name} » ?`) && remove(c.id)}>🗑</button>
              </li>
            ))}
          </ul>
          <div className="mt-1 grid grid-cols-2 gap-1 border-t border-slate-100 pt-2">
            <button className="btn-ghost !py-1.5 text-xs" onClick={() => { create(EMPTY_CV, 'Nouveau CV'); setOpen(false) }}>＋ CV vierge</button>
            <button className="btn-ghost !py-1.5 text-xs" onClick={() => { create(active.data, `${active.name} (copie)`); setOpen(false) }}>⧉ Dupliquer</button>
          </div>
        </div>
      )}
    </div>
  )
}

function Ring({ score }) {
  const r = 46, c = 2 * Math.PI * r
  const color = score >= 85 ? '#10b981' : score >= 65 ? '#6366f1' : score >= 40 ? '#f59e0b' : '#ef4444'
  return (
    <svg viewBox="0 0 110 110" className="h-28 w-28 shrink-0" role="img" aria-label={`Score ${score} sur 100`}>
      <circle cx="55" cy="55" r={r} fill="none" stroke="#e2e8f0" strokeWidth="10" />
      <circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} transform="rotate(-90 55 55)" style={{ transition: 'stroke-dashoffset .6s' }} />
      <text x="55" y="60" textAnchor="middle" fontSize="26" fontWeight="800" fill="#0f172a">{score}</text>
    </svg>
  )
}

function Finish({ register, setValue, cv, q, onPrint, onPdf, onShare }) {
  return (
    <div className="space-y-7">
      <section>
        <h3 className="mb-2 text-sm font-extrabold text-slate-800">Modèle</h3>
        <div className="grid gap-2 sm:grid-cols-3">
          {TEMPLATES.map((t) => (
            <button type="button" key={t.id} onClick={() => setValue('template', t.id, { shouldDirty: true })} aria-pressed={cv.template === t.id}
              className={`rounded-xl border-2 p-3 text-left transition ${cv.template === t.id ? 'border-brand-600 bg-brand-50' : 'border-slate-200 hover:border-slate-300'}`}>
              <b className="text-sm">{t.nom}</b><p className="mt-0.5 text-xs text-slate-500">{t.desc}</p>
            </button>
          ))}
        </div>
      </section>
      <section>
        <h3 className="mb-2 text-sm font-extrabold text-slate-800">Couleur</h3>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button type="button" key={c} onClick={() => setValue('color', c, { shouldDirty: true })} aria-label={`Couleur ${c}`} aria-pressed={cv.color === c}
              className={`h-9 w-9 rounded-full ring-2 ring-offset-2 transition ${cv.color === c ? 'ring-slate-900' : 'ring-transparent hover:ring-slate-300'}`} style={{ background: c }} />
          ))}
          <input type="color" value={cv.color} onChange={(e) => setValue('color', e.target.value, { shouldDirty: true })} className="h-9 w-9 cursor-pointer rounded-full border-0 bg-transparent p-0" aria-label="Couleur personnalisée" />
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-sm font-extrabold text-slate-800">Qualité de votre CV</h3>
        <div className="flex items-center gap-5 rounded-2xl bg-slate-50 p-4">
          <Ring score={q.score} />
          <div>
            <p className="text-lg font-extrabold text-slate-900">{q.verdict}</p>
            <p className="text-sm text-slate-500">{q.checks.filter((c) => c.ok).length} critères sur {q.checks.length} respectés · environ {q.words} mots</p>
          </div>
        </div>
        <ul className="mt-3 space-y-1.5">
          {q.checks.map((c) => (
            <li key={c.label} className="flex items-start gap-2 text-sm">
              <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold ${c.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{c.ok ? '✓' : '!'}</span>
              <span className={c.ok ? 'text-slate-600' : 'font-semibold text-slate-800'}>{c.ok ? c.label : <>{c.label}<span className="block text-xs font-normal text-slate-500">{c.tip}</span></>}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="mb-2 text-sm font-extrabold text-slate-800">Exporter et partager</h3>
        <div className="grid gap-2 sm:grid-cols-3">
          <button type="button" className="btn-primary" onClick={onPdf}>⬇ Télécharger PDF</button>
          <button type="button" className="btn-ghost" onClick={onPrint}>🖨 Imprimer / PDF texte</button>
          <button type="button" className="btn-ghost" onClick={onShare}>🔗 Copier le lien</button>
        </div>
        <p className="mt-2 text-xs text-slate-400">« Imprimer » produit un PDF avec texte sélectionnable (choisissez « Enregistrer au format PDF »). Le lien de partage contient votre CV sans la photo ; aucune donnée n’est envoyée à un serveur.</p>
      </section>
    </div>
  )
}
